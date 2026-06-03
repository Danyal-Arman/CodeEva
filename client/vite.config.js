import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (
            id.includes('react-markdown') ||
            id.includes('remark-gfm') ||
            id.includes('rehype-highlight') ||
            id.includes('highlight.js')
          ) {
            return 'markdown-vendor';
          }

          if (
            id.includes('@uiw/react-codemirror') ||
            id.includes('@uiw/codemirror') ||
            id.includes('@codemirror')
          ) {
            return 'codemirror-vendor';
          }

          if (id.includes('@monaco-editor/react')) {
            return 'monaco-vendor';
          }

          if (id.includes('socket.io-client')) {
            return 'socket-vendor';
          }

          if (
            id.includes('react') ||
            id.includes('react-dom') ||
            id.includes('react-router-dom') ||
            id.includes('react-redux') ||
            id.includes('@reduxjs/toolkit')
          ) {
            return 'react-vendor';
          }

          if (id.includes('lucide-react') || id.includes('@heroicons')) {
            return 'icon-vendor';
          }
        },
      },
    },
  },
})
