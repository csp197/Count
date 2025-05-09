import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Get repository name for GitHub Pages
const repoName = 'Count'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3000
  },
  // Set base path for GitHub Pages
  base: mode === 'production' ? `/${repoName}/` : '/',
  build: {
    // Output directory for production build
    outDir: 'dist',
    // Generate sourcemaps for better debugging
    sourcemap: true
  }
}))
