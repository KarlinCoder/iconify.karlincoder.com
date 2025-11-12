import { spawn } from "child_process";
import path from "path";
import { getFfmpegPath } from "../utils/get-ffmpeg-path";
import { checkTmpPaths } from "../utils/check-tmp-paths";
import { BaseConfig } from "../config/base.config";

const ffmpegPath = getFfmpegPath();
console.log(ffmpegPath);

export class FfmpegService {
  static async generateIcon(
    imgUrl: string,
    format: string,
    resolution: string
  ): Promise<string> {
    checkTmpPaths();

    const outputFile = path.resolve(
      path.join(BaseConfig.tmpFiles.outputFiles, `${Date.now()}_icon.${format}`)
    );

    return new Promise((resolve, reject) => {
      const imageProcess = spawn(ffmpegPath, [
        "-i",
        imgUrl,
        "-vf",
        `scale=${parseInt(resolution)}:-1`,
        outputFile,
      ]);

      imageProcess.stderr.on("error", (data) => {
        reject(new Error("Hubo un error"));
      });

      imageProcess.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`Proceso de conversión fallido con código ${code}`));
        } else {
          console.log(`Icono generado en: ${outputFile}`);
          resolve(outputFile);
        }
      });
    });
  }
}
