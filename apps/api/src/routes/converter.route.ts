import { Router } from "express";
import { ConverterController } from "../controller/converter.controller";
import { limiter } from "../middlewares/limiter.middleware";

export const converterRouter = Router();

converterRouter.get("/status", ConverterController.status);
converterRouter.get("/configuration", ConverterController.configuration);
converterRouter.get("/queue-events", ConverterController.pendingImages);
converterRouter.get("/history", ConverterController.history);
converterRouter.get("/download/:filename", ConverterController.download);
converterRouter.post("/convert", limiter, ConverterController.converter);
