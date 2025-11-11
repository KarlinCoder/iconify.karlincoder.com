import { FcTodoList } from "react-icons/fc";
import type { IConversionResponse } from "../../types/api";
import { useEffect, useRef } from "react";
import { ListItem } from "./ListItem";

interface Props {
  convertedIcons: IConversionResponse[];
}

export const Sidebar: React.FC<Props> = ({ convertedIcons }) => {
  const listRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scroll({ top: 3000000000000000, behavior: "smooth" });
    }
  }, [convertedIcons]);

  return (
    <aside className="flex flex-col max-w-[400px] h-[600px] w-full bg-white/50 shadow-xl shadow-black/5 rounded-xl overflow-hidden">
      <div className="flex gap-3 items-center bg-[#f9fafc] shadow-xl shadow-black/3 px-3 py-2">
        <FcTodoList size={20} />
        <h2 className="font-semibold text-md font-poppins">Converted icons</h2>
      </div>

      <main
        ref={listRef}
        className="relative grow flex flex-col gap-7 items-center justify-start px-2 overflow-y-scroll"
      >
        {convertedIcons.length ? (
          <ul className="w-full p-2 py-4 flex flex-col gap-2">
            {convertedIcons.map((item) => (
              <ListItem convertedIcon={item} />
            ))}
          </ul>
        ) : (
          <p className="absolute top-[50%] text-xs text-neutral-400 font-poppins italic">
            (Start converting icons)
          </p>
        )}
      </main>
    </aside>
  );
};
