// Mentor map: Build-tool config for Vite.
// Why it exists: Registers React plugin and controls bundler behavior.
// Used by: npm run dev/build/preview commands.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
