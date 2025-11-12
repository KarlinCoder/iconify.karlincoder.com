import { spawn } from "child_process";
import path from "path";
import { BaseConfig } from "../config/base.config";
import ffmpegPathStatic from "ffmpeg-static";

if (!ffmpegPathStatic) {
  throw new Error("Ffmpeg path static");
}

const ffmpegPath: string = ffmpegPathStatic;

export class FfmpegService {
  static async generateIcon(
    imgUrl: string,
    format: string,
    resolution: string
  ) {
    const outputFile = path.resolve(
      path.join(BaseConfig.tmpFiles.outputFiles, `${Date.now()}_icon.${format}`)
    );

    if (ffmpegPath) {
      return new Promise<string>((resolve, reject) => {
        const imageProcess = spawn(ffmpegPath, [
          "-i",
          imgUrl,
          "-vf",
          `scale=${parseInt(resolution)}:-1`,
          outputFile,
        ]);

        imageProcess.stderr.on("error", () => {
          reject(new Error("Hubo un error"));
        });

        imageProcess.on("close", (code) => {
          if (code !== 0) {
            reject(
              new Error(`Proceso de conversión fallido con código ${code}`)
            );
          } else {
            console.log(`Icono generado en: ${outputFile}`);
            resolve(outputFile);
          }
        });
      });
    }
  }
}
