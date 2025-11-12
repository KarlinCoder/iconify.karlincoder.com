import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {import.meta.env.DEV === true ? (
      <StrictMode>
        <App />
      </StrictMode>
    ) : (
      <App />
    )}
  </StrictMode>
);
