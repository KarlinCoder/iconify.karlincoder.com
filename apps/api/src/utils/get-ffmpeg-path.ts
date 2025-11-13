import ffmpegPath from "ffmpeg-static";

export const getFfmpegPath = () => {
  if (ffmpegPath && process.env.NODE_ENV === "development") {
    console.log(process.env.NODE_ENV);
    console.log(ffmpegPath);
    return ffmpegPath;
  }
  return "ffmpeg";
};
