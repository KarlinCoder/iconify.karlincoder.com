import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import { converterRouter } from "./routes/converter.route";
import { corsMiddlewware } from "./middlewares/cors.middleware";

export const app = express();
app.use(express.json());
app.use(corsMiddlewware());
app.use(morgan("dev"));
app.use("/v1/", converterRouter);
