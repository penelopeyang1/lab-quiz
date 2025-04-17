import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/https://github.com/penelopeyang1/lab-quiz.git/', 
  plugins: [react()],
})
