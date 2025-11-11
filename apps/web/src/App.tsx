import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import type { IConversionResponse } from "./types/api";
import { Converter } from "./components/Converter";

function App() {
  const [convertedIcons, setConvertedIcons] = useState<IConversionResponse[]>(
    []
  );

  const handleAddConvertedIcon = (item: IConversionResponse) => {
    const newArray = [...convertedIcons, item];
    setConvertedIcons(newArray);
  };

  return (
    <main className="relative flex justify-center items-center gap-3 p-3 bg-linear-180 from-[#e2f0fd] to-[#c3dcfa] min-h-dvh w-dvw">
      <Converter onIconConverted={handleAddConvertedIcon} />

      <Sidebar convertedIcons={convertedIcons} />
      <span className="absolute bottom-3 right-6 text-xs opacity-50">
        made with 💙 by KarlinCoder
      </span>
    </main>
  );
}

export default App;
