// src/index.ts
import app from "./app/app";
import connectDB from "./app/config/database";

if (process.env.MONGO_URI) {
  // serverless environment এ init phase এ DB connect করা হবে (cache ব্যবহার করলে ভালো)
  connectDB(process.env.MONGO_URI).catch((err) =>
    console.error("Mongo connect failed:", err)
  );
}

export default app; // Vercel expects a default export for Node functions / adapters
