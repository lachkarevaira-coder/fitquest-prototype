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
  host: true,          // = 0.0.0.0 (обязательно для CSB)
  port: 5173,          // дефолт Vite, часто у CSB с ним меньше проблем
  strictPort: true,
  allowedHosts: [/\.csb\.app$/, /\.codesandbox\.io$/],
  hmr: { clientPort: 443 } // чтобы HMR ходил по https
}
