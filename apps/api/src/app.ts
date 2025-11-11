import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { converterRouter } from "./routes/converter.route";
import { limiter } from "./middlewares/limiter.middleware";

export const app = express();
app.use(limiter);
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.get("/status", (req: Request, res: Response) => {
  return res.status(200).json({ status_code: 200, message: "Server live" });
});
app.use("/v1/", converterRouter);
