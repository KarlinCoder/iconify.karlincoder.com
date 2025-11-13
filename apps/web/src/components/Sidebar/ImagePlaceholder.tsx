import { motion } from "motion/react";

export const ImagePlaceHolder = () => {
  return (
    <motion.div
      initial={{ backgroundColor: "#00000003" }}
      animate={{ backgroundColor: "#00000010" }}
      transition={{ repeat: Infinity, repeatType: "loop" }}
      className="w-full h-full"
    ></motion.div>
  );
};
