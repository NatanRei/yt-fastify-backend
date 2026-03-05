import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environment: "node",
    globals: true,
    exclude: ["node_modules/**", "dist/**"],
    coverage: {
      provider: "v8",
      include: ["src/services/**/*.ts"],
    },
  },
});
