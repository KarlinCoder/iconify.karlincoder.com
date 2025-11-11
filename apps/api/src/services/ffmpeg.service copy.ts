import { spawn } from "child_process";
import path from "path";
import fs from "fs/promises";

const ffmpegPath = path.resolve(__dirname, "../bin/ffmpeg.exe");
const outputImages = path.resolve(__dirname, "../../tmp/converted-images");

export class FfmpegService {
  static async generateIcon(
    imgUrl: string,
    format: string,
    resolution: string
  ): Promise<string> {
    await fs.mkdir(outputImages, { recursive: true });

    const outputFile = path.join(outputImages, `${Date.now()}_icon.${format}`);
    console.log(path.normalize(outputFile));
    console.log(outputFile);
    console.log(process.env.NODE_ENV);
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
