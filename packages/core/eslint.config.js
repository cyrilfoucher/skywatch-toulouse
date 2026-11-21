import { config } from "@repo/eslint-config/base";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        // Sans ce réglage, typescript-eslint chercherait le tsconfig depuis le dossier
        // où la commande est lancée : on lui indique celui du paquet core.
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
