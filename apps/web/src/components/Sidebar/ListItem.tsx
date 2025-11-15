import { motion } from "motion/react";
import type { IConversionResponse } from "../../types/api";
import { getApiImageDownload } from "../../services/get-api-mage-download";
import { TbCloudDownload } from "react-icons/tb";
import { useState } from "react";
import { RiLoader4Line } from "react-icons/ri";
import { ImagePlaceHolder } from "./ImagePlaceholder";
import { FaFile, FaRegImage } from "react-icons/fa6";
import { formatFileSize } from "../../utils/format-file-size";

interface Props {
  convertedIcon: IConversionResponse;
}

export const ListItem: React.FC<Props> = ({ convertedIcon }) => {
  const [isLoading, setisLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const handleDownload = async () => {
    setisLoading(true);
    const data = getApiImageDownload(convertedIcon.filename);

    setisLoading(false);
    return data;
  };

  return (
    <motion.li
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 100 }}
      key={convertedIcon.filename}
      className="flex items-center gap-2 bg-[#171717] grow p-2 rounded-md shadow-lg shadow-black/4 transition-transform duration-100 hover:scale-102"
    >
      <div className="aspect-square rounded-md size-[60px] overflow-hidden">
        <img
          src={convertedIcon.file_url}
          alt="converted icon"
          onLoad={handleImageLoaded}
          className={`${
            imageLoaded ? "block" : "hidden"
          } w-full h-full object-cover`}
          onError={() => {
            alert("Converted image preview can'b be loaded.");
          }}
        />

        {!imageLoaded && <ImagePlaceHolder />}
      </div>

      <div className="grow h-full flex flex-col justify-center">
        <h2 className="font-inter-tight text-sm text-neutral-50">
          {convertedIcon.filename}
        </h2>
        <div className="flex items-center gap-3 font-inter-tight text-[0.7rem] text-neutral-400">
          <div className="flex items-center gap-1">
            <FaRegImage />
            <p>{convertedIcon.resolution}</p>
          </div>
          <div className="flex items-center gap-1">
            <FaFile />
            <p>{formatFileSize(convertedIcon.file_size)}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="p-2 rounded-full bg-blue-500 hover:bg-blue-400 active:bg-blue-500 text-white mr-2 cursor-pointer transition-colors"
      >
        {isLoading ? (
          <RiLoader4Line className="scale-120 animate-spin" />
        ) : (
          <TbCloudDownload className="scale-110" />
        )}
      </button>
    </motion.li>
  );
};
