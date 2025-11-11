import { useEffect, useRef } from "react";

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
    <div className="flex justify-center items-center overflow-hidden bg-white self-center rounded-md ">
      {file ? (
        <img
          ref={imgRef}
          alt="selected image"
          className="w-full object-center rounded-md aspect-square"
        />
      ) : (
        <p className="aspect-square w-full italic flex justify-center items-center text-xs text-neutral-500">
          (Selected preview)
        </p>
      )}
    </div>
  );
};
