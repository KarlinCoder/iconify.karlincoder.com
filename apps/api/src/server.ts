import { app } from "./app";
import { BaseConfig } from "./config/base.config";

const PORT = process.env.PORT ?? BaseConfig.server.port;

app.listen(PORT, () => {
  console.log(`✅ server live http://localhost:${PORT}  `);
});
