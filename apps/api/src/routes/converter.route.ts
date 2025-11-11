import { Router } from "express";
import { ConverterController } from "../controller/converter.controller";

export const converterRouter = Router();

converterRouter.get("/status", ConverterController.status);
converterRouter.get("/docs", ConverterController.docs);
converterRouter.get("/configuration", ConverterController.configuration);
converterRouter.get("/queue-events", ConverterController.pendingImages);
converterRouter.get("/download/:filename", ConverterController.download);
converterRouter.post("/convert", ConverterController.converter);
