import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import { externalAnchorPlugin } from "./remarkplugins/external-anchor-plugin.mjs";
import { dataGen } from "./flxplugins/dataGen.mjs";

// Thumbnais
import { generateThumbnails } from "./src/data/generateThumbnails";

import alpinejs from "@astrojs/alpinejs";
import { generatePDF } from "./src/data/generatePDF";

dataGen();
generateThumbnails();
//generatePDF();

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  build: {
    format: "directory",
  },
  integrations: [mdx(), sitemap(), tailwind(), alpinejs()],
  output: "static",
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [externalAnchorPlugin],
  },
  redirects: {
    '/': '/fr/0'
  },
});
