import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import type { IConfigurationResponse, IConversionResponse } from "./types/api";
import { Converter } from "./components/Converter";
import { AppLoadingLayer } from "./components/Converter/AppLoadingLayer";
import { AnimatePresence } from "motion/react";
import { AuthorModal } from "./components/Converter/AuthorModal";

function App() {
  const [convertedIcons, setConvertedIcons] = useState<IConversionResponse[]>(
    []
  );
  const [apiConfig, setApiConfig] = useState<IConfigurationResponse>();
  const [showAuthorModal, setShowAuthorModal] = useState(false);

  const handleApiConfig = (config: IConfigurationResponse) => {
    setApiConfig(config);
  };

  const handleShowAuthorModal = () => {
    setShowAuthorModal(!showAuthorModal);
  };

  const handleAddConvertedIcon = (item: IConversionResponse) => {
    const newArray = [...convertedIcons, item];
    setConvertedIcons(newArray);
  };

  return (
    <main className="relative px-3 max-[990px]:py-7 flex max-[990px]:flex-col flex-row justify-center items-center gap-3 bg-linear-180 from-neutral-900 to-neutral-950 min-h-dvh w-full">
      {apiConfig && (
        <>
          <Converter
            onShowAuthorModal={handleShowAuthorModal}
            apiConfiguration={apiConfig}
            onIconConverted={handleAddConvertedIcon}
          />

          <Sidebar convertedIcons={convertedIcons} />
        </>
      )}

      <AnimatePresence>
        {!apiConfig && <AppLoadingLayer onConfigLoaded={handleApiConfig} />}
      </AnimatePresence>

      <AnimatePresence>
        {showAuthorModal && <AuthorModal onClose={handleShowAuthorModal} />}
      </AnimatePresence>

      <span className="absolute bottom-3 right-6 text-[9px] opacity-50 text-white">
        made with 💙 by KarlinCoder
      </span>
    </main>
  );
}

export default App;
