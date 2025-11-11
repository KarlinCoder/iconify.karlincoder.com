import { FcInfo } from "react-icons/fc";
import { DragZone } from "./DragZone";
import { useState, type FormEvent } from "react";
import { ConversionSettings } from "./ConversionSettings";
import { ConvertButton } from "./ConvertButton";
import axios from "axios";
import { API_URL } from "../../config/enviroment";
import type { IConversionResponse } from "../../types/api";
import { PreviewImage } from "./PreviewImage";
import { postApiImage } from "../../utils/post-api-image";

interface Props {
  onIconConverted: (info: IConversionResponse) => void;
}

export const Converter: React.FC<Props> = ({ onIconConverted }) => {
  const [selectedImage, setSelectedImage] = useState<File>();
  const [isConverting, setIsConverting] = useState(false);

  const [selectedFormat, setSelectedFormat] = useState("ico");
  const [selectedResolution, setSelectedResolution] = useState("64x64");

  const handleSelectFormat = (format: string) => {
    setSelectedFormat(format);
  };

  const handleSelectResolution = (resolution: string) => {
    setSelectedResolution(resolution);
  };

  const handleSelectedImage = (file: File) => {
    setSelectedImage(file);
    console.log(file);
  };

  const handleConvertClick = async () => {
    if (!selectedImage) return;

    setIsConverting(true);
    const data = await postApiImage(
      selectedImage,
      selectedResolution,
      selectedFormat
    );
    setIsConverting(false);
    onIconConverted(data);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("resolution", selectedResolution);
      formData.append("format", selectedFormat);
      setIsConverting(true);
      const { data } = await axios.post(`${API_URL}/v1/convert`, formData);
      setIsConverting(false);
      onIconConverted(data);
    }
  };

  return (
    <div className="flex flex-col max-w-[600px] min-h-[600px] h-full w-full bg-white/50 shadow-xl shadow-black/5 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center bg-[#f9fafc] shadow-xl shadow-black/3 px-3 py-2">
        <h2 className="font-semibold text-mg font-poppins">🧩ICONIFY</h2>
        <button className="hover:scale-120 active:scale-100 transition-transform cursor-pointer">
          <FcInfo size={20} />
        </button>
      </div>
      <main className="grow flex flex-col gap-3 items-center justify-center px-8">
        <div className="grid grid-cols-2 w-full gap-2">
          <PreviewImage file={selectedImage!} />

          <DragZone
            handleSubmit={handleFormSubmit}
            onImageSelected={handleSelectedImage}
          />
        </div>

        <ConversionSettings
          handleSelectFormat={handleSelectFormat}
          handleSelectResolution={handleSelectResolution}
          selectedFormat={selectedFormat}
          selectedResolution={selectedResolution}
        />

        <div className="flex justify-start items-center gap-2">
          <ConvertButton
            isLoading={isConverting}
            onClick={handleConvertClick}
          />
          <p className="text-xs italic text-black/70 font-inter-tight">
            La duración del proceso puede variar dependiendo de la cantidad de
            imagenes en cola en este momento.
          </p>
        </div>
      </main>
    </div>
  );
};
