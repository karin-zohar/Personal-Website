import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr(),

    viteStaticCopy({
      targets: [
        {
          src: "apps/server/src/data/rag/**/*",
          dest: "data/rag",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@/libs/": `${path.resolve(__dirname, "libs")}/`,
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  build: {
    outDir: "dist",
    ssr: true,
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
