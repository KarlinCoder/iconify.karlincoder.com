import { useEffect, type FC } from "react";
import { motion } from "motion/react";
import { CgClose } from "react-icons/cg";
import { FaCopyright } from "react-icons/fa6";
import { SOCIAL_MEDIAS } from "../../config/constants";
import logoImage from "../../assets/images/logo_transparent.png";

interface Props {
  onClose: () => void;
}

export const AuthorModal: FC<Props> = ({ onClose }) => {
  useEffect(() => {
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") return onClose();
    });

    return () => {};
  }, [onClose]);

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
        <button
          onClick={onClose}
          className="absolute top-1 right-1 p-1.5 rounded-full text-red-500 cursor-pointer hover:bg-red-500/20 active:bg-transparent transition-colors"
        >
          <CgClose className="scale-140" />
        </button>

        <div className="flex items-center gap-2 px-3">
          <img src={logoImage} alt="iconify logo" className="size-10" />
          <div>
            <h2 className="text-2xl text-neutral-200 font-poppins font-semibold">
              ICONIFY
              <span className="inline-block text-xs text-neutral-600">
                v1.0
              </span>
            </h2>
            <p className="text-sm leading-3 text-neutral-500 font-poppins">
              Convert & compress icons in seconds
            </p>
          </div>
        </div>

        <div className="bg-neutral-700 h-px w-full"></div>

        <p className="text-neutral-400 font-poppins text-sm px-3 text-pretty">
          Iconify is a fast, no-frills converter for icons. It supports common
          formats like <strong>.ico</strong>, <strong>.png</strong>,{" "}
          <strong>.svg</strong> and more, and focuses on clean output with
          minimal file size—no quality loss, no unnecessary steps.
        </p>

        <p className="text-neutral-400 font-poppins text-sm px-3 text-pretty">
          It was built to be simple, reliable, and private: your files never
          leave your browser. Created by KarlinCoder—you can find my links just
          below.
        </p>

        <div className="bg-neutral-700 h-px w-full"></div>

        <div className="flex justify-between items-center w-full px-3">
          <p className="text-xs text-neutral-600 flex items-center gap-1">
            <FaCopyright /> Copyright {new Date().getFullYear()} – by
            KarlinCoder
          </p>
          <div className="flex justify-end items-center">
            {SOCIAL_MEDIAS.map((item, index) => {
              return (
                <motion.a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
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
