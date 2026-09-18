import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "../lib/db.js";
import { qdrant } from "../lib/qdrant.js";
import { ENV } from "../lib/env.js";
import Document from "../models/document.model.js";
import { z } from "zod";
import { requireAuth } from "../lib/auth.js";

const router = express.Router();
const genAI = new GoogleGenerativeAI(ENV.gemini_api_key);

const TOP_K = 8;
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
        error: `Document not ready (status: ${doc.status})`,
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
      return res.json({ flow: {}, message: "No relevant content found in document." });
    }


    const context = searchResults
      .map((r, i) => `[Excerpt ${i + 1}]\n${r.payload.text}`)
      .join("\n\n---\n\n");


    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const prompt = `You are an expert task planner. Based on the document excerpts and the user's goal, generate a clear, actionable step-by-step flow to achieve the goal.
    Document: "${doc.name}"
    User Goal: "${query}"

    --- DOCUMENT EXCERPTS ---
    ${context}
    --- END EXCERPTS ---

    Return ONLY a valid JSON object in this exact format (no markdown, no explanation, just raw JSON):
    {
      "title": "Short title for this plan",
      "description": "One sentence describing what this plan achieves",
      "flow": {
        "step1": {
          "name": "Step name",
          "do": "Detailed action to take",
          "time": "Estimated time (e.g. 30 minutes, 2 hours)"
        },
        "step2": {
          "name": "Step name",
          "do": "Detailed action to take",
          "time": "Estimated time"
        }
      }
    }

    Generate between 3 and 8 steps based on complexity. Use only information from the document excerpts.`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();


    const FlowStepSchema = z.object({
      name: z.string(),
      do: z.string(),
      time: z.string()
    });

    const FlowSchema = z.object({
      title: z.string(),
      description: z.string(),
      flow: z.record(FlowStepSchema)
    });





    const cleaned = raw.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();

    let parsed;
    try {
      const result1= JSON.parse(cleaned);
      parsed= FlowSchema.parse(result1);
    } catch {
      return res.status(500).json({
        error: "Gemini returned invalid JSON",
        raw,
      });
    }

    res.json(parsed);
  } catch (err) {
    console.error("[Flow Error]", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
