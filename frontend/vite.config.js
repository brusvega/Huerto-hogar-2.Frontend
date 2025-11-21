import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración limpia y compatible con React 18
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    alias: {
      'react/jsx-runtime': 'react/jsx-runtime',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
    },
  },
})
