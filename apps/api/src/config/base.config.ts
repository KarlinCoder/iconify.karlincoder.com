export const BaseConfig = {
  maxFileWeightBytes: 8 * 1024 * 1024,
  maxConcurrentProcess: 5,
  server: {
    port: 3000,
  },
  availableFormats: ["jpeg", "jpg", "png", "ico", "webp", "bmp", "avif"],
  availableConvertibleFormats: [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/avif",
    "image/x-icon",
    "image/vnd.microsoft.icon",
    "image/svg+xml",
  ],
  availableResolutions: ["32x32", "64x64", "128x128", "256x256"],
  tmpFiles: {
    inputFiles: "tmp/input",
    outputFiles: "tmp/output",
  },
};
