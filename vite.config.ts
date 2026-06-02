import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// MACP Roadmap Checklist — local-only static SPA.
// `base` is set to the repo name for production so assets resolve under the
// GitHub Pages project URL (https://<user>.github.io/macp-roadmap-checklist/).
// Local dev keeps the root base so http://localhost works unchanged.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/macp-roadmap-checklist/' : '/',
  plugins: [react()],
  server: {
    port: 5180,
    open: false,
  },
}));
