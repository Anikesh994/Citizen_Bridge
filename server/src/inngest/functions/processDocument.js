import { inngest } from "../client.js";
import Document from "../../models/document.model.js";
import { connectDB } from "../../lib/db.js";
import { ENV } from "../../lib/env.js";
import { ensureCollection, upsertVectors } from "../../lib/qdrant.js";




const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 80;





function chunkText(markdown) {
  const lines = markdown.split("\n");

  const chunks = [];
  let current = "";
  let currentHeading = "";

  for (const line of lines) {


    if (/^#{1,6}\s+/.test(line)) {
      currentHeading = line.trim();
      continue;
    }

    const paragraph = line.trim();

    if (!paragraph) continue;


    const content = currentHeading
      ? `${currentHeading}\n\n${paragraph}`
      : paragraph;


    if (
      current.length > 0 &&
      current.length + content.length + 2 > CHUNK_SIZE
    ) {
      chunks.push(current.trim());


      const overlap = current.slice(-CHUNK_OVERLAP);

      current = currentHeading
        ? `${currentHeading}\n\n${overlap}\n\n${paragraph}`
        : `${overlap}\n\n${paragraph}`;

    } else {
      current = current
        ? current + "\n\n" + content
        : content;
    }
  }


  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
}






























const JINA_BATCH_SIZE = 50;
const JINA_MODEL = "jina-embeddings-v3";
const JINA_DIM = 1024;





async function embedChunks(texts) {
  const allEmbeddings = [];

  for (let i = 0; i < texts.length; i += JINA_BATCH_SIZE) {
    const batch = texts.slice(i, i + JINA_BATCH_SIZE);


    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    let response;
    try {
      response = await fetch("https://api.jina.ai/v1/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ENV.jina_api_key}`,
        },
        body: JSON.stringify({
          model: JINA_MODEL,
          task: "retrieval.passage",
          dimensions: JINA_DIM,
          input: batch,
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Jina API error (batch ${i}): ${response.status} — ${err}`);
    }

    const json = await response.json();
    allEmbeddings.push(...json.data.map((d) => d.embedding));
  }

  return allEmbeddings;
}





export const processDocument = inngest.createFunction(
  {
    id: "process-document",
    triggers: [{ event: "document/process.started" }],
    retries: 2,
    onFailure: async ({ error, event }) => {
      const { documentId } = event.data ?? {};
      if (!documentId) return;
      try {
        await connectDB();
        await Document.findByIdAndUpdate(documentId, {
          status: "failed",
          errorMessage: error?.message ?? "Unknown error",
        });
      } catch (_) {  }
    },
  },
  async ({ event, step }) => {
    const { documentId, cloudinaryUrl } = event.data;


    await step.run("mark-extracting", async () => {
      await connectDB();
      await Document.findByIdAndUpdate(documentId, { status: "extracting" });
    });


    const extractionResult = await step.run("extract-with-docling", async () => {
      await connectDB();
      const pythonUrl = ENV.python_service_url || "http://localhost:8000";


      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 90_000);

      let response;
      try {
        response = await fetch(`${pythonUrl}/extract`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cloudinary_url: cloudinaryUrl, document_id: documentId }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Python service error: ${response.status} — ${errorText}`);
      }

      const { extracted_text } = await response.json();

      await Document.findByIdAndUpdate(documentId, {
        extractedText: extracted_text,
        status: "embedding",
      });

      return { extracted_text };
    });


    const embeddingResult = await step.run("chunk-and-embed", async () => {
      const chunks = chunkText(extractionResult.extracted_text);
      if (chunks.length === 0) throw new Error("No text chunks produced from extracted content");
      const embeddings = await embedChunks(chunks);
      return { chunks, embeddings };
    });


    await step.run("index-in-qdrant", async () => {
      await connectDB();
      const collectionName = `doc_${documentId}`;
      await ensureCollection(collectionName, JINA_DIM);

      const points = embeddingResult.chunks.map((text, idx) => ({
        id: idx,
        vector: embeddingResult.embeddings[idx],
        payload: { text, chunkIndex: idx, documentId },
      }));

      await upsertVectors(collectionName, points);

      await Document.findByIdAndUpdate(documentId, {
        status: "done",
        qdrantCollection: collectionName,
        chunkCount: points.length,
      });

      return { collectionName, chunkCount: points.length };
    });

    return {
      documentId,
      cloudinaryUrl,
      extractedLength: extractionResult.extracted_text?.length ?? 0,
      chunkCount: embeddingResult.chunks.length,
    };
  }
);
