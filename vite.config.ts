import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    allowedHosts: ['vmkqgg-3000.csb.app', /\.csb\.app$/, /\.codesandbox\.io$/, 'localhost', '127.0.0.1'],
    hmr: { clientPort: 443 }
  }
})
