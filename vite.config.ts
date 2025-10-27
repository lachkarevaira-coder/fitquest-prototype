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
  host: true,
  port: 5173,
  strictPort: true,
  allowedHosts: [/\.csb\.app$/, /\.codesandbox\.io$/],
  hmr: { clientPort: 443 } // без host, чтобы не залипало на старом домене
}

