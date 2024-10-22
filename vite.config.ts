import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    hmr: {
      protocol: 'wss',
      host: 'app.allign.dev',
      clientPort: 443
    }
  }
})
