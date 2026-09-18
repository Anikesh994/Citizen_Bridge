import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "../lib/db.js";
import { qdrant } from "../lib/qdrant.js";
import { ENV } from "../lib/env.js";
import Document from "../models/document.model.js";
import { requireAuth } from "../lib/auth.js";

const router = express.Router();
const genAI = new GoogleGenerativeAI(ENV.gemini_api_key);

const TOP_K = 6;
const JINA_MODEL = "jina-embeddings-v3";
const JINA_DIM = 1024;



async function embedQuery(query) {
  const response = await fetch("https://api.jina.ai/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ENV.jina_api_key}`,
    },
    body: JSON.stringify({
      model: JINA_MODEL,
      task: "retrieval.query",
      dimensions: JINA_DIM,
      input: [query],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Jina embed error: ${response.status} — ${err}`);
  }

  const json = await response.json();
  return json.data[0].embedding;
}



router.post("/:documentId", requireAuth, async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== "string" || query.trim().length === 0) {
    return res.status(400).json({ error: "query is required" });
  }

  try {
    await connectDB();


    const doc = await Document.findById(req.params.documentId).select(
      "name status qdrantCollection userId"
    );

    if (!doc) return res.status(404).json({ error: "Document not found" });
    if (doc.userId !== req.userId) return res.status(403).json({ error: "Forbidden" });

    if (doc.status !== "done") {
      return res.status(409).json({
        error: `Document is not ready yet (status: ${doc.status}). Please wait.`,
      });
    }

    if (!doc.qdrantCollection) {
      return res.status(409).json({ error: "Document has no Qdrant collection" });
    }


    const queryVector = await embedQuery(query.trim());


    const searchResults = await qdrant.search(doc.qdrantCollection, {
      vector: queryVector,
      limit: TOP_K,
      with_payload: true,
    });

    if (searchResults.length === 0) {
      return res.json({
        answer: "I couldn't find any relevant content in this document for your question.",
        sources: [],
      });
    }


    const context = searchResults
      .map((r, i) => `[Chunk ${i + 1}]\n${r.payload.text}`)
      .join("\n\n---\n\n");


    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const prompt = `You are a helpful assistant that answers questions based strictly on the provided document excerpts.
If the answer cannot be found in the excerpts, say "I don't have enough information in this document to answer that."

Document: "${doc.name}"

--- DOCUMENT EXCERPTS ---
${context}
--- END EXCERPTS ---

User question: ${query}

Answer:`

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    res.json({
      answer,
      sources: searchResults.map((r) => ({
        chunkIndex: r.payload.chunkIndex,
        score: Math.round(r.score * 1000) / 1000,
        text: r.payload.text.slice(0, 200) + (r.payload.text.length > 200 ? "…" : ""),
      })),
    });
  } catch (err) {
    console.error("[Chat Error]", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
