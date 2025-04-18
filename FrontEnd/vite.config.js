import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: import.meta.env.MODE === 'production' ? '/MovieSearch/' : '/',
  plugins: [react()],
})