import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/koshelekru-test/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.match(/vue-router/))
            return 'vue-router'

          if (id.match(/vuetify/))
            return 'vuetify'

          if (id.match(/node_modules/))
            return 'vendor'
        },
      },
    },
  },
})
