import { defineConfig } from "vitest/config";

export default defineConfig({
  cacheDir: ".vitest",
  test: {
    environment: "node",
  },
});
