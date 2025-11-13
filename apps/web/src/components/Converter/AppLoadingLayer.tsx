import { useEffect, type FC } from "react";
import { motion } from "motion/react";
import { LuLoaderCircle } from "react-icons/lu";
import type { IConfigurationResponse } from "../../types/api";
import { getApiConfiguration } from "../../utils/get-api-configuration";

interface Props {
  onConfigLoaded: (config: IConfigurationResponse) => void;
}

export const AppLoadingLayer: FC<Props> = ({ onConfigLoaded }) => {
  useEffect(() => {
    getApiConfiguration().then((config) => onConfigLoaded(config));
  }, [onConfigLoaded]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex justify-center items-center bg-linear-60 from-black to-neutral-[#222]"
    >
      <motion.div className="flex items-center justify-center gap-2">
        <LuLoaderCircle size={50} className="animate-spin text-blue-600" />
        <span className="inline-block text-white font-poppins italic text-2xl">
          Loading app, please wait...
        </span>
      </motion.div>
    </motion.div>
  );
};
