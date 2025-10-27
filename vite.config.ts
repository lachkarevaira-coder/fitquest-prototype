// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    // Разрешаем конкретный домен превью + все поддомены CSB
    allowedHosts: [
      'vmkqgg-3000.csb.app',      // ← вставь ИМЕННО ТО, что видишь в превью
      /\.csb\.app$/,
      /\.codesandbox\.io$/
    ],
    hmr: {
      clientPort: 443,            // HMR через https-порт
      host: 'vmkqgg-3000.csb.app' // ← тот же хост, что выше
    },
    cors: true
  }
})
