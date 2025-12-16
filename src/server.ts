import dotenv from "dotenv";
dotenv.config();

import app from "./app/app";
import connectDB from "./app/config/database";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB(process.env.MONGO_URI || "");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
