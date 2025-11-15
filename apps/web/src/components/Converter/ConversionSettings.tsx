import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { FaFileImage, FaRegWindowMaximize } from "react-icons/fa6";

export type TModalOpened = "format" | "resolution" | null;

interface Props {
  selectedFormat: string;
  selectedResolution: string;
  handleSelectFormat: (format: string) => void;
  handleSelectResolution: (resolution: string) => void;
  availableResolutions: string[];
  availableFormats: string[];
}

export const ConversionSettings: React.FC<Props> = ({
  selectedFormat,
  selectedResolution,
  handleSelectFormat,
  handleSelectResolution,
  availableResolutions,
  availableFormats,
}) => {
  const [modalOpened, setModalOpened] = useState<TModalOpened>(null);

  const handleModalOpened = (modal: TModalOpened) => {
    setModalOpened(modal);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full font-poppins text-[0.8rem] shadow-2xl shadow-black/4 bg-[#171717] py-2 px-3 rounded-md">
      <div className="flex max-[500px]:flex-col flex-row justify-between items-center w-full text-[#d4d7da]">
        <p className="font-poppins">ICON RESOLUTION: </p>

        <Dropdown
          ItemIcon={FaRegWindowMaximize}
          modalName="resolution"
          selectedModalName={modalOpened}
          onModalOpen={handleModalOpened}
          selected={selectedResolution}
          onSelect={handleSelectResolution}
          options={availableResolutions}
        />
      </div>

      <div className="flex max-[500px]:flex-col flex-row justify-between items-center w-full text-[#d4d7da]">
        <p className="font-poppins">IMAGE FORMAT: </p>

        <Dropdown
          ItemIcon={FaFileImage}
          modalName="format"
          onModalOpen={handleModalOpened}
          selectedModalName={modalOpened}
          selected={selectedFormat}
          onSelect={handleSelectFormat}
          options={availableFormats}
        />
      </div>
    </div>
  );
};
