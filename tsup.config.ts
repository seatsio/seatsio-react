import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/main"],
  outDir: "build",
  format: ["cjs", "esm"],
  target: "es2019",
  sourcemap: true,
  dts: true,
  minify: true,
  bundle: false,
});
