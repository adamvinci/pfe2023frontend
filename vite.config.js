import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.VUE_APP_BASEURL': JSON.stringify(env.VUE_APP_BASEURL)
    },
    plugins: [
      vue(),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'https://pfe-2023-backend-dev.azurewebsites.net',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }

})
