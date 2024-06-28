import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/main/index.ts"],
  outDir: "build",
  format: ["cjs", "esm"],
  target: "es2019",
  sourcemap: true,
  dts: true,
  clean: true,
});
