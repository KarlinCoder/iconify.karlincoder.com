import axios from "axios";
import { API_URL } from "../config/enviroment";
import type { IConfigurationResponse } from "../types/api";

export const getApiConfiguration =
  async (): Promise<IConfigurationResponse> => {
    const { data } = await axios.get(`${API_URL}/v1/configuration`);
    if (import.meta.env.DEV) {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(0);
        }, 3000)
      );
    }
    return data;
  };
