import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Vérifie que ce package est installé

export default defineConfig({
  plugins: [
    react(), // Plugin React
    tailwindcss(), // Plugin Tailwind CSS
  ],
  base: './', // Chemins relatifs pour Vercel
})
