import path from "node:path";
import fsP from "node:fs/promises";
import { spawn } from "child_process";
import { BaseConfig } from "../config/base.config";
import { getFfmpegPath } from "../utils/get-ffmpeg-path";
import { checkTmpPaths } from "../utils/check-tmp-paths";

const ffmpegPath = getFfmpegPath();
console.log(ffmpegPath);

export class FfmpegService {
  static async generateIcon(
    imgUrl: string,
    format: string,
    resolution: string
  ) {
    checkTmpPaths();

    const outputFile = path.resolve(
      path.join(
        BaseConfig.tmpFiles.outputFiles,
        `${Date.now()}_iconify.${format}`
      )
    );

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

      imageProcess.on("close", async (code) => {
        if (code !== 0) {
          reject(new Error(`No se pudo cerrar el archivo ${code}`));
        } else {
          await fsP.rm(imgUrl);
          resolve(outputFile);
        }
      });
    });
  }
}
