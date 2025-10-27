// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/postcss' // ← подключаем плагин напрямую

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  css: {
    // Встроенная настройка PostCSS — Vite больше
    // не будет искать postcss.config.* в проекте
    postcss: {
      plugins: [tailwindcss],
    },
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    allowedHosts: [
      /\.csb\.app$/,
      /\.codesandbox\.io$/,
      'vmkqgg-3000.csb.app' // ← твой текущий домен превью
    ],
    hmr: { clientPort: 443, host: 'vmkqgg-3000.csb.app' }
  },
})
