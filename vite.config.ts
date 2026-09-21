/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const REQUIRED_ENV = ['VITE_GITHUB_API_URL']

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_')
  const missing = REQUIRED_ENV.filter((key) => !env[key])

  if (missing.length > 0) {
    throw new Error(
      `Variáveis de ambiente ausentes: ${missing.join(', ')}. Copie o .env.example para .env.`
    )
  }

  return {
    plugins: [react()],
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts']
    }
  }
})
