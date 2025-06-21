import mongoose from "mongoose";

const MongoDb_URI = process.env.MONGO_URL!;

if (!MongoDb_URI) {
  throw new Error("Please define mongo_uri in env var");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {};
    mongoose.connect(MongoDb_URI, opts).then(() => mongoose.connection);
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
