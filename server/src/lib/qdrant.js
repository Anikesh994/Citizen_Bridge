import { QdrantClient } from "@qdrant/js-client-rest";
import { ENV } from "./env.js";

export const qdrant = new QdrantClient({
  url: ENV.qdrant_url,
  apiKey: ENV.qdrant_api_key,
});






export async function ensureCollection(collectionName, vectorSize = 1024) {
  const existing = await qdrant.getCollections();
  const exists = existing.collections.some((c) => c.name === collectionName);
  if (!exists) {
    await qdrant.createCollection(collectionName, {
      vectors: {
        size: vectorSize,
        distance: "Cosine",
      },
    });
  }
}






export async function upsertVectors(collectionName, points) {
  await qdrant.upsert(collectionName, {
    wait: true,
    points,
  });
}
