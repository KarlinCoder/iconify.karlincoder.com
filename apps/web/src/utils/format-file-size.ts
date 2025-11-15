import prettyBytes from "pretty-bytes";

export const formatFileSize = (fileSize: number) => {
  return prettyBytes(fileSize);
};
