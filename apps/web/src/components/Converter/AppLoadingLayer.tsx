import { useEffect, type FC } from "react";
import { motion } from "motion/react";
import { LuLoaderCircle } from "react-icons/lu";
import type { IConfigurationResponse } from "../../types/api";
import { getApiConfiguration } from "../../services/get-api-configuration";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-neutral-900 via-neutral-950 to-neutral-950 p-4"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-[480px] w-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="text-blue-500"
        >
          <LuLoaderCircle size={48} />
        </motion.div>

        {/* Contenido: rompecabezas + nombre + subtítulo (derecha en desktop) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <div>
            <h1 className="text-2xl font-poppins font-semibold text-white">
              ICONIFY
              <span className="ml-1 text-xs text-neutral-500 font-normal">
                v1.0
              </span>
            </h1>
            <p className="text-sm text-neutral-400 font-poppins mt-0.5">
              Convert & compress icons in seconds
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
