import { defineConfig } from 'vite';

// Static site — `npm run build` outputs dist/.
// Local dev/preview keeps a relative base ('./'). The GitHub Pages build sets
// GITHUB_PAGES=true (see .github/workflows/deploy.yml) so built asset URLs are
// rooted at the repository path '/ghat-tak-3d/'.
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/ghat-tak-3d/' : './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  }
});
