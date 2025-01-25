import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    resolve: {
      alias: {
        src: '/src',
      },
    },
    server: {
      port: env.PORT,
    },
    plugins: [react(), tailwindcss()],
    test: {
      environment: 'jsdom',
      global: true,
      setupFiles: './src/__tests__/setup.ts',
    },
  };
});
