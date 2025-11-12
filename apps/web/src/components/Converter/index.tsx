import { FcInfo } from "react-icons/fc";
import { DragZone } from "./DragZone";
import { useState } from "react";
import { ConversionSettings } from "./ConversionSettings";
import { ConvertButton } from "./ConvertButton";
import type {
  IConfigurationResponse,
  IConversionResponse,
} from "../../types/api";
import { PreviewImage } from "./PreviewImage";
import { postApiImage } from "../../utils/post-api-image";

interface Props {
  apiConfiguration: IConfigurationResponse;
  onIconConverted: (info: IConversionResponse) => void;
  onShowAuthorModal: () => void;
  onError: (error: Error) => void;
}

export const Converter: React.FC<Props> = ({
  onIconConverted,
  apiConfiguration,
  onShowAuthorModal,
  onError,
}) => {
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
  };

  const handleConvertClick = async () => {
    if (!selectedImage) return;
    setIsConverting(true);

    try {
      const data = await postApiImage(
        selectedImage,
        selectedResolution,
        selectedFormat
      );
      onIconConverted(data);
    } catch (error) {
      if (error instanceof Error) {
        onError(error);
      }
    }

    setIsConverting(false);
  };

  return (
    <div className="col-span-3 flex flex-col h-full w-full bg-radial to-[#131313] from-[#0a0a0a] shadow-2xl shadow-black/80 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center bg-[#171717] shadow-xl shadow-black/3 px-3 py-2">
        <h2 className="font-semibold text-mg font-poppins text-neutral-100">
          🧩ICONIFY
        </h2>
        <button
          onClick={onShowAuthorModal}
          className="hover:scale-120 active:scale-100 transition-transform cursor-pointer"
        >
          <FcInfo size={20} />
        </button>
      </div>
      <main className="grow flex flex-col gap-3 items-center justify-center px-8 py-5">
        <div className="grid max-[520px]:grid-cols-1 grid-cols-2 w-full gap-2">
          <PreviewImage file={selectedImage!} />

          <DragZone
            acceptableFormats={apiConfiguration.available_formats}
            onImageSelected={handleSelectedImage}
          />
        </div>

        <ConversionSettings
          availableFormats={apiConfiguration.available_formats}
          availableResolutions={apiConfiguration.available_resolutions}
          handleSelectFormat={handleSelectFormat}
          handleSelectResolution={handleSelectResolution}
          selectedFormat={selectedFormat}
          selectedResolution={selectedResolution}
        />

        <div className="flex max-[520px]:flex-col flow-row justify-start items-center gap-2">
          <ConvertButton
            isLoading={isConverting}
            onClick={handleConvertClick}
          />
          <p className="text-xs italic text-white/50 font-inter-tight">
            La duración del proceso puede variar dependiendo de la cantidad de
            imagenes en cola en este momento.
          </p>
        </div>
      </main>
    </div>
  );
};
