import type { Lang } from '../i18n/ui';

type L10n = Record<Lang, string>;

export interface Project {
  /** Nom exact du dépôt dans l'orga. */
  repo: string;
  title: L10n;
  description: L10n;
  /** Page du projet, si elle existe en dehors du dépôt. */
  homepage?: string;
}

export const ORG_URL = 'https://github.com/kronkorp';
export const repoUrl = (repo: string) => `${ORG_URL}/${repo}`;

/** Écosystème C++ (hors KUGE, qui a sa propre section). */
export const cpp: Project[] = [
  {
    repo: 'kronkworld',
    title: { fr: 'ECS', en: 'ECS' },
    description: {
      fr: 'Un ECS léger en C++, en en-têtes seuls.',
      en: 'A light header-only ECS, in C++.',
    },
  },
  {
    repo: 'kronk3d',
    title: { fr: 'Rasterizer 3D', en: '3D rasterizer' },
    description: {
      fr: 'Un rasterizer 3D matériel, rapide et moderne.',
      en: 'A super fast and modern 3D hardware rasterizer.',
    },
  },
];

/** Bibliothèques C publiques. kronkmail est privé : il n'apparaît pas. */
export const clibs: Project[] = [
  {
    repo: 'kronknet',
    title: { fr: 'Réseau', en: 'Network' },
    description: {
      fr: 'Une bibliothèque réseau bas niveau en C.',
      en: 'A low level network library in C.',
    },
    homepage: 'https://kronkorp.github.io/kronknet/',
  },
  {
    repo: 'kronkflow',
    title: { fr: 'Ordonnanceur', en: 'Scheduler' },
    description: {
      fr: 'Un petit ordonnanceur de tâches en C, fait pour le projet zappy.',
      en: 'A tiny task scheduler in C, built for the zappy project.',
    },
  },
  {
    repo: 'kronkpool',
    title: { fr: 'Pool de threads', en: 'Thread pool' },
    description: {
      fr: 'Un pool de threads simple en C, avec pthread.',
      en: 'A simple thread pool in C using pthread.',
    },
  },
  {
    repo: 'kronklab',
    title: { fr: 'Tests', en: 'Testing' },
    description: {
      fr: 'Un framework de tests simple en C.',
      en: 'A simple test framework in C.',
    },
  },
  {
    repo: 'kronkargs',
    title: { fr: 'Arguments', en: 'Arguments' },
    description: {
      fr: 'Un analyseur d’arguments pour les programmes en C.',
      en: 'A simple argument parser library, for C programs.',
    },
  },
  {
    repo: 'kronkutils-C',
    title: { fr: 'Utilitaires', en: 'Utilities' },
    description: {
      fr: 'Les outils de base en C pour les autres projets : kronkmail, kronkflow…',
      en: 'Basic tools in C for other project development: kronkmail, kronkflow…',
    },
  },
];
