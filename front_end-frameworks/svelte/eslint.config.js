import js from "@eslint/js";
import globals from "globals";
import svelte from "eslint-plugin-svelte";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,svelte}"],
    // eslint-plugin-svelte fournit svelte-eslint-parser, sans lequel ESLint
    // ne sait pas lire le balisage d'un fichier .svelte et echoue sur {#if}
    extends: [js.configs.recommended, svelte.configs.recommended],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^[A-Z_]",
        },
      ],
    },
  },
]);
