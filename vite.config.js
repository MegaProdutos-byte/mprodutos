import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Caminhos relativos: o site funciona tanto na raiz de um domínio quanto
  // em uma subpasta, como no GitHub Pages (usuario.github.io/mprodutos/).
  base: './',
})
