import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
});
