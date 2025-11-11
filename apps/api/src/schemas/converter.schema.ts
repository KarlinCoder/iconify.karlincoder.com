import z from "zod";
import { BaseConfig } from "../config/base.config";

export type TConverterReqBody = {
  format: string;
  resolution: string;
};

const converterSchema = z.object({
  format: z.enum(BaseConfig.availableFormats),
  resolution: z.enum(BaseConfig.availableResolutions),
});

export const validateConverterSchema = (input: TConverterReqBody) => {
  return converterSchema.safeParse(input);
};
