import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";


// NOTE: building for prod will not work with a linked package
// You should install directly from the repo in order to make the build work
// if you need to get the package to use a modified version, one solution
// is to manually copy the build result into the node_modules here

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '../../',
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),

    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    hmr: {
      clientPort: 443,
    },
  },
});
