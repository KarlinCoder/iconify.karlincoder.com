import { motion } from "motion/react";

export const LayerLoadingBar = () => {
  return (
    <div className="text-white h-2 w-full max-w-[370px] rounded-full bg-neutral-800 overflow-hidden">
      <motion.div
        initial={{ x: "-280px" }}
        animate={{ x: "370px" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          type: "keyframes",
          duration: 0.8,
        }}
        className="h-full w-[280px] bg-linear-90 from-transparent via-blue-500 to-transparent rounded-full"
      ></motion.div>
    </div>
  );
};
