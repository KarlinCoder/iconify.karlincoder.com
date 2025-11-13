import ffmpegPath from "ffmpeg-static";

export const getFfmpegPath = () => {
  if (ffmpegPath && process.env.NODE_ENV === "development") return ffmpegPath;
  return "ffmpeg";
};
