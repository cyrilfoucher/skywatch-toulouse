# 0001 — TypeScript 7 pour vérifier le code, TypeScript 6 pour les outils

- Date : 2026-11-18
- Statut : Acceptée

## Contexte

Le projet utilise TypeScript 7, la version native de TypeScript, nettement plus
rapide que les versions précédentes. Son API n'est pas encore compatible avec
les outils qui lisent les types du code, en particulier typescript-eslint.
Sans typescript-eslint, ESLint ne peut pas appliquer les règles basées sur les
types, comme la détection d'une promesse oubliée sans `await`. Ce projet fait
beaucoup d'appels asynchrones (API OpenSky, base de données, collecte
planifiée) : ces règles sont importantes.

Trois options ont été étudiées :

1. TypeScript 7 seul, avec ESLint et le parseur Babel : pas de lint typé.
2. Revenir à TypeScript 6 : lint typé, mais sans les gains de TypeScript 7.
3. Installer les deux versions côte à côte, comme le prévoit Microsoft pendant
   la transition.

## Décision

Option 3. Dans chaque `package.json` concerné :

- `@typescript/native` pointe vers `typescript@^7.0.2` et fournit la commande
  `tsc`, utilisée par `pnpm check-types` ;
- `typescript` pointe vers `@typescript/typescript6@^6.0.2`, qui fournit l'API
  de TypeScript 6 aux outils (typescript-eslint, Next.js, VS Code).

ESLint utilise typescript-eslint avec la configuration `recommendedTypeChecked`.

## Conséquences

- La vérification des types (`tsc`) tourne avec TypeScript 7.
- Le lint typé est actif sur tous les fichiers TypeScript.
- Deux versions de TypeScript sont installées. Quand typescript-eslint
  supportera l'API de TypeScript 7 (prévue avec TypeScript 7.1), un nouvel ADR
  remplacera celui-ci et retirera TypeScript 6.
