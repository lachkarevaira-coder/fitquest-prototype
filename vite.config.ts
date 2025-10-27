import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
server: {
  port: 3000,
  host: true,
  strictPort: true,
  // Разрешаем все поддомены CodeSandbox через RegExp
  allowedHosts: [/\.csb\.app$/, /\.codesandbox\.io$/],
  // HMR через 443, чтобы не ругался в превью
  hmr: { clientPort: 443 }
}
