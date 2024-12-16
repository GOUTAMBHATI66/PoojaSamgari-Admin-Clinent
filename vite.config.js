import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from 'vite-plugin-svgr';
import reactRefresh from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({

  build: {
    outDir: 'build',
},
  plugins: [
    react(),
    reactRefresh(),
    svgrPlugin({
        svgrOptions: {
            icon: true,
        },
    }),
],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});




