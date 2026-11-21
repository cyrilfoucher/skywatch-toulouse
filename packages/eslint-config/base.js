import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

/**
 * Configuration ESLint partagée par tout le monorepo.
 *
 * Le lint typé (règles qui lisent les types, comme no-floating-promises)
 * s'appuie sur l'API de TypeScript 6 : voir docs/decisions/0001.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    // Les fichiers JavaScript de configuration ne font pas partie d'un tsconfig :
    // on désactive pour eux les règles qui ont besoin des types.
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  eslintConfigPrettier,
  {
    ignores: ["dist/**"],
  },
];
