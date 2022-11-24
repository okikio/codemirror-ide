import { defineConfig } from 'astro/config';

// https://astro.build/config
import solidjs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";

import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    solidjs(), 
    tailwind({ 
      config: { applyBaseStyles: false }, 
    })
  ],
  vite: {
    optimizeDeps: {
      // Add both @codemirror/state and @codemirror/view to included deps for optimization
      include: ["@codemirror/state", "@codemirror/view"],
    },
    plugins: [
      AutoImport({
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
            extension: 'jsx',
            enabledCollections: ['mdi', 'material-symbols', 'ic', 'fluent-emoji', 'fluent']
          }),
        ],
      }),
      Icons({
        // experimental
        autoInstall: true,
        compiler: 'astro',
      }),
    ]
  }
});