import { FiDownload } from "react-icons/fi";

interface Props {
  onImageSelected: (file: File) => void;
  acceptableFormats: string[];
}

export const DragZone: React.FC<Props> = ({
  onImageSelected,
  acceptableFormats,
}) => {
  const mappedFormats = acceptableFormats.map((item) => `.${item}`);

  const formatsToString = mappedFormats.toString();

  return (
    <div className="relative bg-[#171717] h-full w-full rounded-xl overflow-hidden shadow-2xl shadow-black/2 p-2">
      <div className="relative flex flex-col justify-center items-center w-full h-full border-dashed border- border-2 border-white/40 rounded-xl py-7">
        <div className="flex flex-col justify-center items-center gap-1 text-center">
          <FiDownload size={90} className="text-white opacity-20" />
          <div>
            <p className="font-poppins text-md font-semibold text-[#6d6c6f]">
              DRAG & DROP AN IMAGE
            </p>
            <p className="text-xs text-white/20">(or click to browse files)</p>
          </div>
        </div>
      </div>
      <input
        accept={formatsToString}
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length >= 1) {
            onImageSelected(e.target.files[0]);
          }
        }}
        className="absolute inset-0 text-transparent w-full h-full cursor-pointer hover:bg-white/1 active:bg-transparent transition-colors"
      />
    </div>
  );
};
