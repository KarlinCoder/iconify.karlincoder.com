import { existsSync, mkdirSync } from "fs";
import multer from "multer";
import { BaseConfig } from "../config/base.config";

const uploadedDir = BaseConfig.tmpFiles.inputFiles;
const convertedDir = BaseConfig.tmpFiles.outputFiles;
console.log(uploadedDir, convertedDir);

if (!existsSync(uploadedDir)) mkdirSync(uploadedDir, { recursive: true });
if (!existsSync(convertedDir)) mkdirSync(convertedDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadedDir,
  filename: (req, file, cb) => cb(null, `${file.originalname}`),
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 8 * 1024 * 1024,
    parts: 5,
  },

  fileFilter: (req, file, cb) => {
    if (BaseConfig.availableConvertibleFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      return cb(new Error("Invalid mime type."));
    }
  },
});
