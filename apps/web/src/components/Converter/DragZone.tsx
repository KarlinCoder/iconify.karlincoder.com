import { useEffect, useState, type FormEvent } from "react";
import { FiDownload } from "react-icons/fi";
import { getApiConfiguration } from "../../utils/get-api-configuration";
import { LuLoaderCircle } from "react-icons/lu";

interface Props {
  onImageSelected: (file: File) => void;
  handleSubmit: (e: FormEvent) => void;
}

export const DragZone: React.FC<Props> = ({ onImageSelected }) => {
  const [acceptString, setAcceptString] = useState("");

  useEffect(() => {
    const fetchFormats = async () => {
      const { available_formats } = await getApiConfiguration();
      const extensionsString = available_formats.map((format) => {
        return `.${format}, `;
      });

      const parsedString = extensionsString.toString();
      setAcceptString(parsedString);
    };

    fetchFormats();
  }, []);

  return (
    <div className="relative bg-neutral-700 h-full w-full rounded-xl overflow-hidden shadow-2xl shadow-black/2 p-2">
      <div className="relative flex flex-col justify-center items-center w-full h-full border-dashed border- border-2 border-white/40 rounded-xl py-7">
        <div className="flex flex-col justify-center items-center gap-1">
          <FiDownload size={90} className="text-white opacity-20" />
          <div>
            <p className="font-poppins text-md font-semibold text-[#6d6c6f]">
              DRAG & DROP AN IMAGE
            </p>
            <p className="text-center text-xs text-white/20">
              (or click to browse files)
            </p>
          </div>
        </div>
      </div>
      {acceptString ? (
        <input
          accept={acceptString}
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length >= 1) {
              onImageSelected(e.target.files[0]);
            }
          }}
          className="absolute inset-0 text-transparent w-full h-full cursor-pointer hover:bg-neutral-100/10 active:bg-transparent transition-colors"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-700 text-sm text-neutral-400 py-3 flex justify-center items-center gap-2">
          <div>
            <LuLoaderCircle className="text-neutral-400 scale-120 animate-spin" />
          </div>
          <p>Fetching formats...</p>
        </div>
      )}
    </div>
  );
};
