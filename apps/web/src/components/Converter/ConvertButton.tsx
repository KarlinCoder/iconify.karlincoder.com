import { BiLoaderCircle } from "react-icons/bi";

interface Props {
  isLoading: boolean;
  onClick: () => void;
}

export const ConvertButton: React.FC<Props> = ({ isLoading, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="flex max-w-[200px] w-full justify-center items-center gap-2 rounded-full text-sm px-12 py-2.5 font-inter-tight text-white/90 bg-linear-0 bg-blue-600 mx-auto font-semibold hover:opacity-90 active:opacity-100 transition-colors cursor-pointer disabled:bg-neutral-500"
    >
      {isLoading && (
        <div>
          <BiLoaderCircle className="scale-150 block animate-spin" />
        </div>
      )}
      {isLoading ? "CONVERTING..." : "CONVERT"}
    </button>
  );
};
