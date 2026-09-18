import express from "express";
import multer from "multer";
import { inngest } from "../inngest/client.js";
import Document from "../models/document.model.js";
import { cloudinary } from "../lib/cloudinary.js";
import { connectDB } from "../lib/db.js";
import { requireAuth } from "../lib/auth.js";
import { getAuth } from "@clerk/express";

const router = express.Router();


const ALLOWED_MIMETYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/html",
  "text/markdown",
  "text/plain",
  "image/png",
  "image/jpeg",
  "image/tiff",
  "image/bmp",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIMETYPES.has(file.mimetype)) return cb(null, true);
    cb(new Error(`Unsupported file type: ${file.mimetype}`));
  },
});


router.post("/", requireAuth, upload.single("file"), async (req, res) => {
  try {
    await connectDB();

    const { name, description } = req.body;
    const userId = req.userId;

    if (!name || !req.file) {
      return res.status(400).json({ error: "name and file are required" });
    }


    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: "documents", public_id: `${Date.now()}_${req.file.originalname}` },
        (err, result) => err ? reject(err) : resolve(result)
      );
      stream.end(req.file.buffer);
    });


    const doc = await Document.create({
      userId,
      name,
      description: description || "",
      status: "uploading",
      cloudinaryUrl: uploadResult.secure_url,
      cloudinaryPublicId: uploadResult.public_id,
    });


    try {
      await inngest.send({
        name: "document/process.started",
        data: {
          documentId: doc._id.toString(),
          cloudinaryUrl: uploadResult.secure_url,
          fileName: req.file.originalname,
          mimeType: req.file.mimetype,
        },
      });
    } catch (inngestErr) {

      console.error("[Inngest Send Error]", inngestErr.message);
      await Document.findByIdAndUpdate(doc._id, {
        status: "failed",
        errorMessage: `Failed to start processing: ${inngestErr.message}`,
      }).catch(() => {});
      return res.status(500).json({ error: "Failed to start document processing. Please try again." });
    }

    res.status(201).json({
      message: "Document upload started",
      documentId: doc._id,
    });
  } catch (err) {
    console.error("[Document Upload Error]", err.message);
    res.status(500).json({ error: err.message });
  }
});


router.get("/user/:userId", requireAuth, async (req, res) => {
  try {
    await connectDB();

    const docs = await Document.find({ userId: req.userId })
      .select("name description status cloudinaryUrl qdrantCollection chunkCount errorMessage createdAt")
      .sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





router.get("/:id/status-stream", async (req, res) => {
  try {
    await connectDB();


    let userId = null;
    const { userId: headerUserId } = getAuth(req);
    if (headerUserId) {
      userId = headerUserId;
    } else if (req.query.token) {

      try {
        const { createClerkClient } = await import("@clerk/express");
        const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
        const claims = await clerk.verifyToken(req.query.token);
        userId = claims.sub;
      } catch {  }
    }

    if (!userId) return res.status(401).json({ error: "Unauthorized" });


    const doc = await Document.findById(req.params.id).select("userId status");
    if (!doc) return res.status(404).json({ error: "Document not found" });
    if (doc.userId !== userId) return res.status(403).json({ error: "Forbidden" });


    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const TERMINAL = ["done", "failed"];


    if (TERMINAL.includes(doc.status)) {
      const full = await Document.findById(req.params.id).select(
        "name description status cloudinaryUrl qdrantCollection chunkCount errorMessage createdAt userId"
      );
      res.write(`data: ${JSON.stringify(full)}\n\n`);
      res.end();
      return;
    }


    const INTERVAL_MS = 1500;

    const HEARTBEAT_MS = 25000;

    const interval = setInterval(async () => {
      try {
        const updated = await Document.findById(req.params.id).select(
          "name description status cloudinaryUrl qdrantCollection chunkCount errorMessage createdAt userId"
        );
        if (!updated) { clearInterval(interval); clearInterval(heartbeat); res.end(); return; }

        res.write(`data: ${JSON.stringify(updated)}\n\n`);

        if (TERMINAL.includes(updated.status)) {
          clearInterval(interval);
          clearInterval(heartbeat);
          res.end();
        }
      } catch {
        clearInterval(interval);
        clearInterval(heartbeat);
        res.end();
      }
    }, INTERVAL_MS);


    const heartbeat = setInterval(() => {
      if (!res.writableEnded) res.write(": ping\n\n");
    }, HEARTBEAT_MS);


    req.on("close", () => { clearInterval(interval); clearInterval(heartbeat); });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", requireAuth, async (req, res) => {
  try {
    await connectDB();
    const doc = await Document.findById(req.params.id).select(
      "name description status cloudinaryUrl extractedText qdrantCollection chunkCount errorMessage createdAt userId"
    );
    if (!doc) return res.status(404).json({ error: "Document not found" });

    if (doc.userId !== req.userId) return res.status(403).json({ error: "Forbidden" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
