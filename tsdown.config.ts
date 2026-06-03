import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/main/index.ts"],
  outDir: "build",
  format: ["esm"],
  target: "es2019",
  sourcemap: true,
  dts: true,
  clean: true,
});
