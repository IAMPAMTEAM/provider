import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { transformAssetUrls } from '@quasar/vite-plugin';

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    plugins: [
      vue({
        template: { transformAssetUrls },
      }),
    ],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: {
      host: true,
      port: 8888,
    },
    build: {
      target: 'esnext',
    },
  });
};
