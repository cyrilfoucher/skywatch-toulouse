import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    languageOptions: {
      parserOptions: {
        // Dossier à partir duquel typescript-eslint cherche le tsconfig de l'appli.
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
