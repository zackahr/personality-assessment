import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    hmr: {
      clientPort: 80 // Important for HMR to work behind proxy
    },
    allowedHosts: [
      'frontend',       // Docker service name
      '146.190.69.47',  // Your server IP
      'traitpilot.live', // Your domain
      'localhost'       // Local development
    ]
  }
})
