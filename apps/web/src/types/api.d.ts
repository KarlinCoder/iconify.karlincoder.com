export interface IConversionResponse {
  status_code: number;
  file_url: string;
  filename: string;
  resolution: string;
  format: string;
}

export interface IConfigurationResponse {
  available_resolutions: string[];
  available_formats: string[];
}
