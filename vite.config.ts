import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { qrcode } from 'vite-plugin-qrcode';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist'
  },
  base: '/tgdirectory/',
  server: {
    proxy: {
      '/api': {
        target: 'https://telegramdirectory.org',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
