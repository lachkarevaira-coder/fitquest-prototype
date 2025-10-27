// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    // Разрешаем CodeSandbox-домены (маски через RegExp)
    allowedHosts: [/\.csb\.app$/, /\.codesandbox\.io$/],
    // HMR через 443 для превью во фрейме
    hmr: { clientPort: 443 },
  },
})
