import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// MACP Roadmap Checklist — local-only static SPA.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    open: false,
  },
});
