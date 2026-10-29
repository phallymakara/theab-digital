import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/@tanstack/react-router/')) {
            return 'vendor-router';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules/canvas-confetti/')) {
            return 'vendor-confetti';
          }
          if (id.includes('/components/templates/traditional/')) {
            return 'templates-traditional';
          }
          if (id.includes('/components/templates/floral/')) {
            return 'templates-floral';
          }
          if (id.includes('/components/templates/emerald/')) {
            return 'templates-emerald';
          }
          if (id.includes('/components/templates/modern/')) {
            return 'templates-modern';
          }
        },
      },
    },
  },
});
