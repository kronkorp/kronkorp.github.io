# kronkorp.github.io

Site de la Kronk corp, en Astro et TypeScript. Statique, bilingue (français à la racine, anglais sous `/en/`).

## Développer

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # génère dist/
npm run preview   # sert dist/
```

## Où modifier quoi

| Fichier | Contenu |
| --- | --- |
| `src/i18n/ui.ts` | Tous les textes de la page, en `fr` et en `en` |
| `src/data/projects.ts` | Les projets affichés (dépôt, titre et description par langue) |
| `src/components/Home.astro` | La page, partagée par les deux langues |
| `src/styles/tokens.css` | Couleurs, espaces, polices : repris du design system Kronk corp |
| `src/styles/components.css` | Composants `kc-*` du design system |
| `src/styles/global.css` | Mise en page du site |
| `public/fonts`, `public/img` | Polices et logos du design system |

Ajouter un projet : une entrée dans `src/data/projects.ts`, avec son texte en `fr` et en `en`. `kronkmail` est privé et n'y figure pas.

## Déploiement

Chaque push sur `main` déploie sur GitHub Pages (`.github/workflows/deploy.yml`).
Réglage à faire une fois : Settings, Pages, Source : GitHub Actions.

## Design system

Les tokens et les composants viennent du design system « Kronk corp ». Pour les mettre à jour, reprends les valeurs de `tokens.json` et `components/bundle.css` dans les fichiers de `src/styles/`.
