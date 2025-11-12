import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import type { TModalOpened } from "./ConversionSettings";
import { AnimatePresence, motion } from "motion/react";

interface DropdownProps {
  selected: string;
  onSelect: (option: string) => void;
  options: string[];
  onModalOpen: (name: TModalOpened) => void;
  modalName: TModalOpened;
  selectedModalName: string | null;
}

export const Dropdown: React.FC<DropdownProps> = ({
  selected,
  onSelect,
  options,
  modalName,
  selectedModalName,
  onModalOpen,
}) => {
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (selectedModalName !== modalName) {
      setShowList(false);
    }
  }, [modalName, selectedModalName]);

  const handleShowList = () => {
    setShowList(!showList);
  };

  const handleOpenedDropdown = () => {
    onModalOpen(modalName);
    handleShowList();
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    handleShowList();
  };

  return (
    <div className="relative max-w-[200px] w-full font-poppins font-semibold">
      <div
        onClick={handleOpenedDropdown}
        className="relative bg-[#111111] hover:bg-[#131313] active:bg-[#111111] text-back rounded-md py-2 px-4 w-full cursor-pointer text-white/50"
      >
        <p>{selected}</p>
        <FaAngleUp
          className={`absolute top-[14px] right-2 transition-transform ${
            showList ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <AnimatePresence>
        {showList && modalName === selectedModalName && (
          <motion.ul
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            exit={{ y: 5, opacity: 0 }}
            className="absolute bottom-10 w-full bg-[#111111] backdrop-blur-2xl p-2 rounded-lg shadow-lg shadow-black/7"
          >
            {options.map((item) => {
              return (
                <li
                  onClick={() => handleOptionClick(item)}
                  className={`relative py-3 hover:bg-white/1 px-4 rounded-lg active:bg-transparent cursor-pointer ${
                    item === selected && "bg-white/1"
                  }`}
                >
                  {item}

                  {item === selected && (
                    <div className="absolute w-[4px] h-4 left-0 top-3.5 bg-blue-400 rounded-full"></div>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
