import { FcTodoList } from "react-icons/fc";
import { useEffect, useRef } from "react";
import { ListItem } from "./ListItem";
import { MdDelete } from "react-icons/md";
import type { IConversionResponse } from "../../types/api";

interface Props {
  convertedIcons: IConversionResponse[];
  onCleanConvertedIcons: () => void;
}

export const Sidebar: React.FC<Props> = ({
  convertedIcons,
  onCleanConvertedIcons,
}) => {
  const listRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scroll({ top: 3000000000000000, behavior: "smooth" });
    }
  }, [convertedIcons]);

  return (
    <div className="col-span-2 flex flex-col h-full w-full bg-radial to-[#131313] from-[#0a0a0a] shadow-2xl shadow-black/80 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center bg-[#171717] shadow-xl shadow-black/3 px-3 py-2">
        <div className="flex gap-3 items-center">
          <FcTodoList size={20} />
          <h2 className="font-semibold text-md font-poppins text-neutral-100">
            Converted icons
          </h2>
        </div>

        <button
          onClick={onCleanConvertedIcons}
          className="text-red-400 p-1 hover:bg-red-500/20 hover:scale-110 active:scale-100 rounded-full transition-colors cursor-pointer"
        >
          <MdDelete className="scale-140" />
        </button>
      </div>

      <main
        ref={listRef}
        className="relative grow flex flex-col gap-7 items-center justify-start px-2 overflow-y-scroll h-full"
      >
        <ul className="w-full p-2 py-4 flex flex-col gap-2">
          {convertedIcons.map((item) => (
            <ListItem convertedIcon={item} />
          ))}
        </ul>

        {convertedIcons.length === 0 && (
          <p className="absolute top-[50%] text-xs text-neutral-400 font-poppins italic">
            (Start converting icons)
          </p>
        )}
      </main>
    </div>
  );
};
