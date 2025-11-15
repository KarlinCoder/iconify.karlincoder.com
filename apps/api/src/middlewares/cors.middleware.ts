import cors from "cors";

const origin =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://iconify.karlincoder.com";

export const corsMiddlewware = () => cors({ origin });
