import path from "path";

export const getFfmpegPath = () => {
  const ffmpegPath =
    process.platform === "linux"
      ? path.resolve(__dirname, "../bin/linux/ffmpeg")
      : path.resolve(__dirname, "../bin/windows/ffmpeg.exe");

  return ffmpegPath;
};
