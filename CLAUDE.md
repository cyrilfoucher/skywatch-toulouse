# SkyWatch Toulouse

Radar des avions autour de Toulouse (Blagnac, Francazal) avec les données réelles d'OpenSky.

## Qui travaille sur ce projet, et comment

Ce projet est le portfolio de Cyril, développeur en reconversion. **Le but est qu'il
comprenne entièrement le code.** La répartition est stricte :

- **Cyril écrit la logique métier** : client OpenSky, calculs, détection des vols,
  statistiques, accès aux données. Elle vit dans `packages/core`.
- **Les agents font le reste** : composants et pages, design, configuration, tests,
  relecture.
- **Cyril relit tout** avant chaque commit.

Règles qui en découlent :

- N'écris **jamais** de logique métier dans `packages/core`. Si une tâche en demande,
  arrête-toi et explique à Cyril ce qu'il doit écrire, étape par étape, sans lui donner
  le code complet.
- Quand tu écris du code, explique-le en français simple : à quoi il sert et comment
  il marche.
- **Ne commite pas et ne pousse pas.** C'est Cyril qui le fait, après vérification.
- **N'ajoute pas de dépendance** sans l'avoir proposée et obtenu son accord.
- Fais une seule chose à la fois et termine-la avant de passer à autre chose.

## Périmètre

- **V1** : collecte planifiée OpenSky, carte temps réel, historique, statistiques,
  angle aéro toulousain (vols d'essai Airbus, Beluga, ATR).
- **V2** : application mobile Expo, notifications push.
- **V3** : serveur MCP qui expose les données du radar aux agents IA.

On ne code que la version en cours. Pas de fonctionnalité « au cas où ».

## Stack

| Domaine         | Choix                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| Monorepo        | pnpm workspaces + Turborepo                                                                           |
| Web             | Next.js 16 (App Router), React 19                                                                     |
| Langage         | TypeScript strict. TypeScript 7 pour `tsc`, TypeScript 6 pour les outils (voir `docs/decisions/0001`) |
| Base de données | PostgreSQL (Neon) + Prisma — à mettre en place                                                        |
| Tests           | Vitest — à mettre en place                                                                            |
| Déploiement     | Vercel ; collecte déclenchée par cron-job.org sur une route API protégée                              |
| Mobile (V2)     | Expo                                                                                                  |

Les décisions importantes sont dans `docs/decisions/` (ADR). Une nouvelle décision
d'architecture = un nouvel ADR numéroté. On ne modifie jamais un ADR accepté.

## Organisation

```
apps/web/                 Appli Next.js : pages, API, collecte, (V3) serveur MCP
apps/mobile/              (V2) Appli Expo
packages/core/            Logique métier de Cyril — à créer
packages/db/              Schéma Prisma et accès à la base — à créer
packages/eslint-config/   Règles ESLint partagées
packages/typescript-config/ Configuration TypeScript partagée
docs/decisions/           ADR
```

Le code est **organisé par fonctionnalité**, pas par type de fichier : tout ce qui
concerne une fonctionnalité (fonctions, types, tests) est rangé ensemble, par exemple
`packages/core/src/opensky/`.

## Commandes

```bash
pnpm install        # installer les dépendances
pnpm dev            # lancer l'appli en local
pnpm format         # formater tout le projet
pnpm format:check   # vérifier le formatage (CI)
pnpm lint           # ESLint avec lint typé
pnpm check-types    # vérifier les types (tsc, TypeScript 7)
pnpm build          # compiler
```

Avant de dire qu'une tâche est finie : `pnpm format`, `pnpm lint`, `pnpm check-types`
et `pnpm build` doivent passer.

## Conventions

- **Langue** : noms dans le code en anglais ; commentaires, commits, tickets, pull
  requests et documentation en français.
- **Commits** : Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`, `chore:`,
  `ci:`), vérifiés par commitlint.
- **Branches** : `feat/…`, `fix/…`, `chore/…`. Jamais de travail direct sur `main`.
- **Processus** : ticket → branche → commits → pull request → CI verte → relecture →
  fusion en squash.
- **TypeScript** : pas de `any`, pas de `as` pour forcer un type sans raison. Toute
  promesse est attendue ou gérée.
- **Commentaires** : ils expliquent le _pourquoi_, pas le _quoi_.

## Données

- Uniquement des **données réelles** d'OpenSky. Pas de données inventées.
- Pour les tests et le développement hors ligne : des fixtures, c'est-à-dire de vraies
  réponses d'OpenSky enregistrées dans des fichiers.
- Quota OpenSky : 4 000 crédits par jour. Ne lance jamais d'appels en boucle.

## Sécurité

- Ne lis jamais et n'écris jamais dans les fichiers `.env`. Les variables attendues
  sont décrites dans `.env.example`.
- Aucun secret dans le code ni dans les commits.

## Agents du projet

Les agents spécialisés sont dans `.claude/agents/` : `code-reviewer`, `test-writer`,
`ui-builder`, `devops`. Chacun a un rôle et des droits limités : respecte-les.
