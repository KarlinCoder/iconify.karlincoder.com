import { app } from "./app";
import { BaseConfig } from "./config/base.config";

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ API running on port ${PORT}`);
});
