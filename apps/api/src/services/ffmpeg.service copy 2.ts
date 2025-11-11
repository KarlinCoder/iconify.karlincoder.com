import { spawn, SpawnOptions } from "child_process";
import path from "path";
import fs from "fs/promises";

// Detectamos si estamos en producción (Render/Docker)
const isProduction = process.env.NODE_ENV === "production";

// Ruta a ffmpeg: en producción usamos el binario del sistema, en desarrollo el .exe local
const ffmpegPath = isProduction
  ? "ffmpeg" // nombre del comando en el PATH (Linux/Docker)
  : path.resolve(__dirname, "../bin/ffmpeg.exe"); // tu binario en Windows

// Carpeta de salida (misma estructura en ambos entornos)
const outputImages = path.resolve(__dirname, "../../tmp/converted-images");

export class FfmpegService {
  static async generateIcon(
    imgUrl: string,
    format: string,
    resolution: string
  ): Promise<string> {
    // Creamos la carpeta de salida si no existe
    await fs.mkdir(outputImages, { recursive: true });

    const outputFile = path.join(outputImages, `${Date.now()}_icon.${format}`);

    return new Promise((resolve, reject) => {
      const args = [
        "-i",
        imgUrl,
        "-vf",
        `scale=${parseInt(resolution)}:-1`,
        outputFile,
      ];

      const options: SpawnOptions = {
        // En desarrollo Windows, esto ayuda con rutas con espacios o caracteres especiales
        shell: !isProduction,
      };

      const imageProcess = spawn(ffmpegPath, args, options);

      // ✅ Manejo crítico: captura errores al intentar lanzar el proceso (ej. ENOENT)
      imageProcess.on("error", (err) => {
        reject(new Error(`No se pudo iniciar ffmpeg: ${err.message}`));
      });

      // Cuando el proceso termina
      imageProcess.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`FFmpeg falló con código de salida: ${code}`));
        } else {
          console.log(`✅ Icono generado en: ${outputFile}`);
          resolve(outputFile);
        }
      });
    });
  }
}
