import axios from "axios";
import type { IConversionResponse } from "../types/api";
import { API_URL } from "../config/enviroment";

export const postApiImage = async (
  file: File,
  resolution: string,
  format: string
): Promise<IConversionResponse> => {
  const formData = new FormData();

  formData.append("image", file);
  formData.append("resolution", resolution);
  formData.append("format", format);

  const { data } = await axios.post(`${API_URL}/v1/convert`, formData);

  return data;
};
