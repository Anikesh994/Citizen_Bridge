import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    cloudinaryUrl: { type: String, default: null },
    cloudinaryPublicId: { type: String, default: null },
    status: {
      type: String,
      enum: ["pending", "uploading", "extracting", "embedding", "indexing", "done", "failed"],
      default: "pending",
    },
    extractedText: { type: String, default: null },
    errorMessage: { type: String, default: null },

    qdrantCollection: { type: String, default: null },
    chunkCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);
