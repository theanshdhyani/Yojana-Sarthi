import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.')
    }
  },
  build: {
    // Never ship source maps to production; they expose the full source tree.
    sourcemap: false,
    // The app is deliberately one bundle (~170 kB gzipped): every screen must work offline after
    // the first visit, and split screens would only be cached once someone opened them.
    chunkSizeWarningLimit: 700
  }
});
