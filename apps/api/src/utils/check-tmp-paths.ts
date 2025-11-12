import fs from "node:fs";

export const checkTmpPaths = () => {
  const inputPath = "../../tmp/input";
  const outputPath = "../../tmp/output";

  const inputExists = fs.existsSync(inputPath);
  const outputExists = fs.existsSync(outputPath);

  if (!inputExists) fs.mkdirSync(inputPath, { recursive: true });
  if (!outputExists) fs.mkdirSync(outputPath, { recursive: true });
};
