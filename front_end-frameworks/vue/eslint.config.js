import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,vue}"],
    // pluginVue fournit vue-eslint-parser, sans lequel ESLint
    // ne sait pas lire le bloc <template> d'un fichier .vue
    extends: [js.configs.recommended, pluginVue.configs["flat/recommended"]],
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
