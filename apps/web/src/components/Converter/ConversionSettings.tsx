import { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
import { FcSettings } from "react-icons/fc";
import { getApiConfiguration } from "../../utils/get-api-configuration";
import { LuLoaderCircle } from "react-icons/lu";

export type TModalOpened = "format" | "resolution" | null;

interface Props {
  selectedFormat: string;
  selectedResolution: string;
  handleSelectFormat: (format: string) => void;
  handleSelectResolution: (resolution: string) => void;
}

export const ConversionSettings: React.FC<Props> = ({
  selectedFormat,
  selectedResolution,
  handleSelectFormat,
  handleSelectResolution,
}) => {
  const [modalOpened, setModalOpened] = useState<TModalOpened>(null);

  const [availableFormats, setAvailableFormats] = useState<string[]>();
  const [availableResolutions, setAvailableResolutions] = useState<string[]>();

  useEffect(() => {
    const fetchConfiguration = async () => {
      const config = await getApiConfiguration();
      setAvailableResolutions(config.available_resolutions);
      setAvailableFormats(config.available_formats);
    };

    fetchConfiguration();
  }, []);

  const handleModalOpened = (modal: TModalOpened) => {
    setModalOpened(modal);
  };

  return (
    <div className="flex flex-col gap-1 w-full font-poppins text-[0.8rem]">
      <div className="flex justify-center items-center gap-1 shadow-2xl shadow-black/4 bg-neutral-700 p-4 mb-1.5 space-y-1 rounded-xl">
        <FcSettings size={20} />
        <p className="font-poppins text-center text-[0.9rem] font-semibold text-[#d4d7da]">
          CONVERSION OPTIONS
        </p>
      </div>

      <div className="shadow-2xl shadow-black/4 bg-neutral-700 p-4 space-y-1 rounded-xl">
        <div className="flex justify-between items-center max-w-[500px] w-full  text-[#d4d7da]">
          <p className="font-poppins">CONVERSION RESOLUTION: </p>
          {availableResolutions ? (
            <Dropdown
              modalName="resolution"
              selectedModalName={modalOpened}
              onModalOpen={handleModalOpened}
              selected={selectedResolution}
              onSelect={handleSelectResolution}
              options={availableResolutions}
            />
          ) : (
            <div className="text-neutral-400 py-2 flex justify-center items-center gap-2">
              <div>
                <LuLoaderCircle className="text-neutral-400 scale-120 animate-spin" />
              </div>
              <p>Fetching resolutions...</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center max-w-[500px] w-full  text-[#d4d7da]">
          <p className="font-poppins">CONVERSION FORMAT: </p>
          {availableFormats ? (
            <Dropdown
              modalName="format"
              onModalOpen={handleModalOpened}
              selectedModalName={modalOpened}
              selected={selectedFormat}
              onSelect={handleSelectFormat}
              options={availableFormats}
            />
          ) : (
            <div className="text-neutral-400 py-2 flex justify-center items-center gap-2">
              <div>
                <LuLoaderCircle className="text-neutral-400 scale-120 animate-spin" />
              </div>
              <p>Fetching formats...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
