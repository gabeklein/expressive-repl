import jsx from '@expressive/vite-plugin-jsx';
import react from '@vitejs/plugin-react';
import { UserConfig } from 'vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import tsconfigPaths from 'vite-tsconfig-paths';

export default <UserConfig> {
  plugins: [
    jsx(),
    react(),
    tsconfigPaths(),
    viteExternalsPlugin({
      "@babel/standalone": "Babel"
    })
  ]
}