import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@dao-action-builder/core', '@dao-action-builder/tokamak'],
  },
});
