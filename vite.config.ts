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
    // ВАЖНО: точное имя текущего превью + запасные варианты
    allowedHosts: [
      'vmkqgg-3000.csb.app',   // ← как в белой странице
      'localhost',
      '127.0.0.1',
      /\.csb\.app$/,
      /\.codesandbox\.io$/
    ],
    hmr: {
      host: 'vmkqgg-3000.csb.app',
      clientPort: 443
    }
  }
})
