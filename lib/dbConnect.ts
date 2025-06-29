import mongoose from "mongoose";

// Correctly extend global with a single mongoose instance tracker
declare global {
  // Avoid redeclaration errors in hot-reloading dev environments
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Reuse connection across hot reloads in development
const globalWithMongoose = global as typeof globalThis & {
  mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Initialize global.mongooseConnection only once
globalWithMongoose.mongooseConnection = globalWithMongoose.mongooseConnection || {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (globalWithMongoose.mongooseConnection.conn) {
    return globalWithMongoose.mongooseConnection.conn;
  }

  if (!globalWithMongoose.mongooseConnection.promise) {
    globalWithMongoose.mongooseConnection.promise = mongoose.connect(MONGODB_URI, {
      dbName: "portfolio",
    });
  }

  globalWithMongoose.mongooseConnection.conn = await globalWithMongoose.mongooseConnection.promise;
  return globalWithMongoose.mongooseConnection.conn;
}


