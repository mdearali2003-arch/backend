import dotenv from "dotenv";
dotenv.config();

import app from "./app/app";
import connectDB from "./app/config/database";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB("mongodb+srv://earali:161375@3Mn@cluster0.ernpzdf.mongodb.net/earali?appName=Cluster0" );
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
