export interface IConversionResponse {
  status_code: number;
  file_url: string;
  filename: string;
  file_size: number;
  resolution: string;
  format: string;
}

export interface IConfigurationResponse {
  available_resolutions: string[];
  available_formats: string[];
  available_convertible_formats: string[];
}
