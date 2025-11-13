import { motion } from "motion/react";
import { FaImage } from "react-icons/fa6";

export const ImagePlaceHolder = () => {
  return (
    <motion.div
      initial={{ backgroundColor: "#0002" }}
      animate={{ backgroundColor: "#0005" }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
      className="w-full h-full grid place-content-center"
    >
      <FaImage className="text-neutral-500 scale-200" />
    </motion.div>
  );
};
