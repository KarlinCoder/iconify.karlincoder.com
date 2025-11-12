import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import type { IConfigurationResponse, IConversionResponse } from "./types/api";
import { Converter } from "./components/Converter";
import { AppLoadingLayer } from "./components/Converter/AppLoadingLayer";
import { AnimatePresence } from "motion/react";
import { AuthorModal } from "./components/Converter/AuthorModal";
import { ErrorModal } from "./components/Converter/ErrorModal";

function App() {
  const [convertedIcons, setConvertedIcons] = useState<IConversionResponse[]>(
    []
  );
  const [apiConfig, setApiConfig] = useState<IConfigurationResponse>();
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [appError, setAppError] = useState<Error | null>(null);

  const handleAppError = (error: Error) => {
    setAppError(error);
  };

  const cleanAppError = () => {
    setAppError(null);
  };

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
    <main className="relative px-3 flex flex-row justify-center items-center gap-3 bg-linear-180 from-neutral-900 to-neutral-950 h-dvh">
      {apiConfig && (
        <div className="flex justify-center items-center max-w-[900px] w-full gap-3">
          <Converter
            onError={handleAppError}
            onShowAuthorModal={handleShowAuthorModal}
            apiConfiguration={apiConfig}
            onIconConverted={handleAddConvertedIcon}
          />

          <Sidebar convertedIcons={convertedIcons} />
        </div>
      )}

      <AnimatePresence>
        {!apiConfig && <AppLoadingLayer onConfigLoaded={handleApiConfig} />}
      </AnimatePresence>

      <AnimatePresence>
        {showAuthorModal && <AuthorModal onClose={handleShowAuthorModal} />}
      </AnimatePresence>

      <AnimatePresence>
        {appError && (
          <ErrorModal
            title={appError.name}
            message={appError.message}
            onClose={cleanAppError}
          />
        )}
      </AnimatePresence>

      <span className="absolute bottom-3 right-6 text-[9px] opacity-50 text-white">
        made with 💙 by KarlinCoder
      </span>
    </main>
  );
}

export default App;
