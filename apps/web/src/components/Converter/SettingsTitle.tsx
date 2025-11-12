import { FcSettings } from "react-icons/fc";

export const SettingsTitle = () => {
  return (
    <div className="flex justify-center items-center gap-1 shadow-2xl shadow-black/4 bg-neutral-800 p-4 mb-1.5 space-y-1 rounded-md">
      <FcSettings size={20} />
      <p className="font-poppins text-center text-[0.9rem] font-semibold text-[#d4d7da]">
        CONVERSION OPTIONS
      </p>
    </div>
  );
};
