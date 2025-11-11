import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";
import type { TModalOpened } from "./ConversionSettings";

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
      <motion.div
        initial={{ x: 15, opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
        onClick={handleOpenedDropdown}
        className="relative bg-neutral-800 hover:bg-neutral-800/90 active:bg-neutral-800 text-back rounded-md py-2 px-4 w-full cursor-pointer text-white/50"
      >
        <p>{selected}</p>
        <FaAngleUp
          className={`absolute top-[14px] right-2 transition-transform ${
            showList ? "rotate-180" : "rotate-0"
          }`}
        />
      </motion.div>

      <AnimatePresence>
        {showList && modalName === selectedModalName && (
          <motion.ul
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 100 }}
            exit={{ y: 3, opacity: 0 }}
            className="absolute bottom-12 w-full bg-neutral-800 backdrop-blur-2xl p-2 rounded-lg shadow-lg shadow-black/7"
          >
            {options.map((item) => {
              return (
                <li
                  onClick={() => handleOptionClick(item)}
                  className={`relative py-3 hover:bg-neutral-700/30 px-4 rounded-lg active:bg-transparent cursor-pointer ${
                    item === selected && "bg-neutral-700/30"
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
