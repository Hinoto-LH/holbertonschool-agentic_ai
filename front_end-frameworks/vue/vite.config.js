import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Chemins relatifs : le site est publie dans un sous-dossier /vue
  // de la branche gh-pages, pas a la racine du domaine.
  base: "./",
  plugins: [vue(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
