import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.VUE_APP_BASEURL': JSON.stringify(env.VUE_APP_BASEURL)
    },
    plugins: [
      vue(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        workbox: {
          cleanupOutdatedCaches: true,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}']
        },
        manifest: {
          "name": "Snappies",
          "short_name": "Snappies",
          "description": "Louer des langes",
          "start_url": "/",
          "display": "standalone",
          "background_color": "#ffffff",
          "theme_color": "#000000",
          "icons": [
            {
              "src": "/img/icons/Snappies-removebg-preview.png",
              "sizes": "192x192",
              "type": "image/png"
            },
            {
              "src": "/img/icons/Snappies-removebg-preview.png",
              "sizes": "512x512",
              "type": "image/png"
            }
          ]
        }
      }),


    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }

})
