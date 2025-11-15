import path from "node:path";
import fs from "node:fs";
import { Request, Response } from "express";
import { Queue } from "../utils/Queue";
import { FfmpegService } from "../services/ffmpeg.service";
import { existsSync } from "fs";
import { upload } from "../middlewares/upload.middleware";
import { BaseConfig } from "../config/base.config";
import { validateConverterSchema } from "../schemas/converter.schema";

const uploadSingleImage = upload.single("image");

const taskManager = new Queue();

export class ConverterController {
  static status(req: Request, res: Response) {
    res.status(200).json({ status_code: 200, status: "ok" });
  }

  static async converter(req: Request, res: Response) {
    uploadSingleImage(req, res, async (error) => {
      const result = validateConverterSchema(req.body);

      if (result.error) {
        return res.json({
          status_code: 400,
          error_code: "BODY_VALIDATION_ERROR",
          error: JSON.parse(result.error.message),
        });
      }

      const { format, resolution } = result.data;

      const imageFile = req.file;

      if (error) {
        return res.status(400).json({ status_code: 400, error: error.message });
      }

      if (!imageFile) {
        return res.json({
          status_code: 400,
          error: "File not sended",
        });
      }

      try {
        const result = await taskManager.add<string>(() =>
          FfmpegService.generateIcon(imageFile.path, format, resolution)
        );

        const filename = path.basename(result);

        const fileUrl = `${req.protocol}://${req.get(
          "host"
        )}/v1/download/${filename}`;
        console.log(result);

        const { size: fileSize } = fs.statSync(result);

        res.status(200).json({
          status_code: 200,
          file_url: fileUrl,
          file_size: fileSize,
          filename,
          format,
          resolution,
        });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    });
  }

  static async configuration(req: Request, res: Response) {
    const documentedHelp = {
      available_formats: BaseConfig.availableFormats,
      available_resolutions: BaseConfig.availableResolutions,
      available_convertible_formats: BaseConfig.availableConvertibleFormats,
    };

    res.json(documentedHelp);
  }

  static async download(req: Request, res: Response) {
    const { filename } = req.params;

    const outputPath = path.resolve(BaseConfig.tmpFiles.outputFiles);
    console.log(outputPath);
    const filePath = path.join(outputPath, filename);

    if (!existsSync(filePath)) {
      return res.json({ status_code: 404, error: "File not found" });
    }

    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", "image/x-icon");

    res.sendFile(filePath);
  }

  static async history(req: Request, res: Response) {}

  static async pendingImages(req: Request, res: Response) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const pendingInterval = setInterval(() => {
      res.write(`data: ${taskManager.pending}\n\n`);
    }, 500);

    req.on("close", () => {
      clearInterval(pendingInterval);
    });
  }
}
