import { API_URL } from "../config/enviroment";

export const getApiImageDownload = async (filename: string) => {
  window.open(`${API_URL}/v1/download/${filename}`, "_blank");
};
