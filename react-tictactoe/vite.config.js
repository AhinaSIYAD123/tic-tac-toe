import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚡ Dynamic base config
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production'
    ? '/tic-tac-toe/' // ✅ for GitHub Pages
    : '/',            // ✅ for Netlify / local dev
})
