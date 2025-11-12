import { Request, Response } from "express";
import { Queue } from "../utils/Queue";
import { FfmpegService } from "../services/ffmpeg.service";
import { existsSync } from "fs";
import path from "path";
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
        console.log(result.error.message);
        return res.json({
          status_code: 400,
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

      if (!format) {
        return res.json({
          status_code: 400,
          error: "Format not recibed",
        });
      }

      if (!resolution) {
        return res.json({
          status_code: 400,
          error: "Resolution not recibed",
        });
      }

      try {
        const result = await taskManager.add(() =>
          FfmpegService.generateIcon(imageFile.path, format, resolution)
        );

        const filename = path.basename(result);

        res.status(200).json({
          status_code: 200,
          file_url: result,
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

  static docs(req: Request, res: Response) {
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>API Documentation</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1, h2 { color: #333; }
          code { background: #eee; padding: 2px 4px; border-radius: 4px; }
          pre { background: #f5f5f5; padding: 10px; overflow-x: auto; }
        </style>
      </head>
      <body>
        <h1>Documentación de la API</h1>

        <h2>Endpoints</h2>

        <h3>Subir y convertir imagen a .ico</h3>
        <ul>
          <li><strong>Ruta:</strong> <code>/convert</code></li>
          <li><strong>Método:</strong> <code>POST</code></li>
          <li><strong>Body:</strong> Formulario con campo <code>image</code> (archivo).</li>
          <li><strong>Respuesta:</strong> <code>{ message, outputFile }</code></li>
        </ul>

        <h3>Descargar archivo generado</h3>
        <ul>
          <li><strong>Ruta:</strong> <code>/download/:filename</code></li>
          <li><strong>Método:</strong> <code>GET</code></li>
          <li><strong>Parámetro:</strong> <code>filename</code> (nombre del archivo generado).</li>
          <li><strong>Respuesta:</strong> Descarga del archivo .ico</li>
        </ul>

        <h3>Ver estado de la cola</h3>
        <ul>
          <li><strong>Ruta:</strong> <code>/status</code></li>
          <li><strong>Método:</strong> <code>GET</code></li>
          <li><strong>Respuesta:</strong> <code>{ status: "live" }</code></li>
        </ul>

        <h3>Ver documentación (esta página)</h3>
        <ul>
          <li><strong>Ruta:</strong> <code>/docs</code></li>
          <li><strong>Método:</strong> <code>GET</code></li>
        </ul>

        <h2>Ejemplo de uso</h2>
        <pre>
curl -X POST -F "image=@imagen.jpg" http://localhost:3000/convert
        </pre>
      </body>
      </html>
    `;

    res.send(html);
  }
}
