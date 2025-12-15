import { app } from "./app";
import { BaseConfig } from "./config/base.config";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API running on port ${PORT}`);
});
