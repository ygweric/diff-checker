import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'diff',
  server: {
    port: 3331
  },
  plugins: [react()],
})
