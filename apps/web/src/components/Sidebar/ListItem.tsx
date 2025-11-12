import { motion } from "motion/react";
import type { IConversionResponse } from "../../types/api";
import { getApiImageDownload } from "../../utils/get-api-mage-download";
import { TbCloudDownload } from "react-icons/tb";
import { useState } from "react";
import { RiLoader4Line } from "react-icons/ri";

interface Props {
  convertedIcon: IConversionResponse;
}

export const ListItem: React.FC<Props> = ({ convertedIcon }) => {
  const [isLoading, setisLoading] = useState(false);

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
      <img
        src={convertedIcon.file_url}
        alt="converted icon"
        className="aspect-square rounded-md max-w-[60px] bg-black"
      />

      <div className="grow h-full flex flex-col justify-center">
        <h2 className="font-inter-tight text-sm font-semibold text-neutral-50">
          {convertedIcon.filename}
        </h2>
        <div className="flex items-center gap-3 font-inter-tight text-[0.8rem] text-neutral-300">
          <p>{convertedIcon.resolution}</p>
          <p>.{convertedIcon.format}</p>
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
