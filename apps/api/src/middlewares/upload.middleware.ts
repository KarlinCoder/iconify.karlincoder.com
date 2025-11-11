import { existsSync, mkdirSync } from "fs";
import multer from "multer";
import { resolve } from "path";

const uploadedDir = resolve("tmp/uploaded-images");
const convertedDir = resolve("tmp/converted-images");

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
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/ico"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Invalid mime type."));
    }
  },
});
