import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

import errorMiddleware from "./middlewares/error.middleware";
import router from "./routes";

const app = express();

app.use(helmet());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// api routes
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

// global error handler
app.use(errorMiddleware);

export default app;
