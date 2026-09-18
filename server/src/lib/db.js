import mongoose from "mongoose"
import { ENV } from "./env.js";


let cached = global._mongoConn || { conn: null, promise: null };
global._mongoConn = cached;

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(ENV.db_url, {
      serverSelectionTimeoutMS: 10000,
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("DB connection failed", error);
    process.exit(1);
  }
}