import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

import { externalAnchorPlugin } from "./remarkplugins/external-anchor-plugin.mjs";
import { dataGen } from "./flxplugins/dataGen.mjs";

dataGen();

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321",
  build: {
    format: "directory",
  },
  integrations: [mdx(), sitemap(), tailwind()],
  output: "hybrid",
  adapter: cloudflare(),
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
    "/": "/fr/1",
  },
});
