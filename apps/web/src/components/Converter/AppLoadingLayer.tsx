import type { IConfigurationResponse } from "../../types/api";
import { useEffect, type FC } from "react";
import { motion } from "motion/react";
import { getApiConfiguration } from "../../services/get-api-configuration";
import logo_image from "../../assets/images/logo_transparent.png";
import { LayerLoadingBar } from "./LayerLoadingBar";

interface Props {
  onConfigLoaded: (config: IConfigurationResponse) => void;
}

export const AppLoadingLayer: FC<Props> = ({ onConfigLoaded }) => {
  useEffect(() => {
    getApiConfiguration().then((config) => onConfigLoaded(config));
  }, [onConfigLoaded]);

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className="fixed inset-0 z-50 flex flex-col gap-2 items-center justify-center bg-linear-to-br from-[#1d1d1d] via-neutral-950 to-[#1d1d1d] p-4"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-[480px] w-full">
        <img src={logo_image} alt="iconify logo" className="size-12" />

        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-poppins font-semibold text-white">
            ICONIFY
            <span className="ml-1 text-xs text-neutral-500 font-normal">
              v1.0
            </span>
          </h1>
          <p className="text-sm text-neutral-400 font-poppins">
            Convert & compress icons in seconds
          </p>
        </div>
      </div>

      <LayerLoadingBar />
      <p className="aboslute bottom-0 text-xs font-poppins text-neutral-700 right-0">
        a KarlinCoder product
      </p>
    </motion.div>
  );
};
