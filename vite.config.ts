import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: "./dist",
  },
  define: {
    'process.env': {}
  },
  server: {
    port: 3000
  },
  envPrefix: 'VITE_'
});
