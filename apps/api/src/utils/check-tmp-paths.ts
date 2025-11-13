import fs from "node:fs";
import { BaseConfig } from "../config/base.config";

export const checkTmpPaths = () => {
  const inputPath = BaseConfig.tmpFiles.inputFiles;
  const outputPath = BaseConfig.tmpFiles.outputFiles;

  const inputExists = fs.existsSync(inputPath);
  const outputExists = fs.existsSync(outputPath);
  console.log({ inputExists, outputExists });

  if (!inputExists) fs.mkdirSync(inputPath, { recursive: true });
  if (!outputExists) fs.mkdirSync(outputPath, { recursive: true });
};
