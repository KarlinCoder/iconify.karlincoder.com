import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { FaImage } from "react-icons/fa6";

interface Props {
  file: File | undefined;
}

export const PreviewImage: React.FC<Props> = ({ file }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleImageTemporaryUrl = () => {
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener("load", () => {
        if (imgRef.current) {
          imgRef.current.src = reader.result as string;
        }
      });
    };

    handleImageTemporaryUrl();
  }, [file]);

  return (
    <div className="flex justify-center items-center overflow-hidden bg-[#171717] self-center rounded-md ">
      <AnimatePresence>
        {file ? (
          <motion.img
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            exit={{ y: 10, opacity: 0 }}
            ref={imgRef}
            alt="selected image"
            className="w-full object-center object-cover rounded-md aspect-square"
          />
        ) : (
          <div className="aspect-square w-full italic flex justify-center items-center text-xs text-neutral-600">
            <FaImage className="scale-800" />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
