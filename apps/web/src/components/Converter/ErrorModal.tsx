import { motion } from "motion/react";
import type { FC } from "react";

interface Props {
  title: string;
  message: string;
  onClose: () => void;
}

export const ErrorModal: FC<Props> = ({ message, title, onClose }) => {
  return (
    <motion.div>
      <motion.div>
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Aceptar</button>
      </motion.div>
    </motion.div>
  );
};
