import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let cached = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "matcha",
    }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

declare global {
  var mongoose: any;
}

export default dbConnect;
