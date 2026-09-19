import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // the linked file:.. package resolves react from the repo root's
    // node_modules; without dedupe the app ends up with two React copies
    // and crashes with "Invalid hook call" in production builds
    dedupe: ['react', 'react-dom', '@mui/material', 'date-fns'],
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: 'mui-x', test: /[\\/]node_modules[\\/]@mui[\\/]x-date-pickers|[\\/]node_modules[\\/]@date-io[\\/]/ },
            { name: 'mui', test: /[\\/]node_modules[\\/]@mui[\\/]|[\\/]node_modules[\\/]@emotion[\\/]/ },
            { name: 'date-fns', test: /[\\/]node_modules[\\/]date-fns[\\/]/ },
            { name: 'react', test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
          ],
        },
      },
    },
  },
})
