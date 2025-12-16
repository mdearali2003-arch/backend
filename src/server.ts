import dotenv from "dotenv";
dotenv.config();

import app from "./app/app";
import connectDB from "./app/config/database";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB("mongodb+srv://yar_ali:yar_aliportfolio@cluster0.myz2n.mongodb.net/ear_ali?retryWrites=true&w=majority&appName=Cluster0" );
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
