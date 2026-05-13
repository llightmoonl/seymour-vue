import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

import { fileURLToPath, URL } from 'node:url';

import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import IconsResolver from 'unplugin-icons/resolver';

import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  assetsInclude: ['**/*.md'],
  plugins: [
    vue(),
    vueDevTools(),
    Icons({
      compiler: 'vue3',
      customCollections: {
        custom: FileSystemIconLoader('./src/01_app/assets/icons'),
      },
      iconCustomizer(collection, icon, props) {
        if (!props.height) {
          props.height = '1em';
        }

        if (!props.width) {
          props.width = '1em';
        }
      },
    }),
    Components({
      resolvers: [
        IconsResolver({
          customCollections: ['custom'],
        }),
      ],
      globs: ['src/01_app/assets/icons/*.svg'],
    }),
    visualizer({
      open: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/01_app', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/01_app/styles', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/01_app/assets', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/02_pages', import.meta.url)),
      '@modules': fileURLToPath(new URL('./src/03_modules', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/04_common', import.meta.url)),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@common/styles/helpers' as *;`,
      },
    },
  },
});
