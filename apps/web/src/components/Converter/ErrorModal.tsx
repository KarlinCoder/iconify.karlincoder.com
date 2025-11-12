import type { FC } from "react";
import { motion } from "motion/react";
import { FaCopyright } from "react-icons/fa6";
import { SOCIAL_MEDIAS } from "../../config/constants";

interface Props {
  title: string;
  message: string;
  onClose: () => void;
}

export const ErrorModal: FC<Props> = ({ title, message, onClose }) => {
  return (
    <motion.div
      onClick={onClose}
      initial={{ backgroundColor: "#0000", backdropFilter: "blur(0px)" }}
      animate={{ backgroundColor: "#0007", backdropFilter: "blur(7px)" }}
      exit={{ backgroundColor: "#0000", backdropFilter: "blur(0px)" }}
      className="absolute inset-0 flex justify-center items-center"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 100, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        className="relative flex flex-col justify-center items-start gap-5 bg-neutral-900 p-7 rounded-lg max-w-[500px] w-full"
      >
        <div className="flex items-center px-3">
          <div className="text-4xl">🧩</div>
          <div>
            <h2 className="text-2xl text-neutral-200 font-poppins font-semibold">
              {title}
              <span className="inline-block text-xs text-neutral-600">
                v1.0
              </span>
            </h2>
            <p className="text-sm leading-3 text-neutral-500 font-poppins">
              Convert your icons
            </p>
          </div>
        </div>

        <div className="bg-neutral-700 h-[1px] w-full"></div>

        <p className="text-neutral-400 font-poppins text-sm px-3 text-pretty">
          {message}
        </p>

        <div className="bg-neutral-700 h-[1px] w-full"></div>

        <div className="flex justify-between items-center w-full px-3">
          <p className="text-xs text-neutral-600 flex items-center gap-1">
            <FaCopyright /> Copyright {new Date().getFullYear()} - by
            KarlinCoder
          </p>
          <div className="flex justify-end items-center">
            {SOCIAL_MEDIAS.map((item, index) => {
              return (
                <motion.a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 100,
                    transition: { delay: (index + 1) * 0.1 },
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 1 }}
                  className="inline-block p-1 text-neutral-300 hover:text-neutral-100 active:text-neutral-300"
                >
                  <item.icon size={20} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
