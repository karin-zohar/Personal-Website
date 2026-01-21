import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "apps/server/src/data/rag/**/*",
          dest: "data/rag",
        },
      ],
    }),
  ],

  build: {
    outDir: "dist",
    ssr: true,
  },
});
