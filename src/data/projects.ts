import type { Lang } from '../i18n/ui';

export interface Project {
  /** Nom exact du dépôt dans l'orga. */
  repo: string;
  description: Record<Lang, string>;
  /** Page du projet, si elle existe en dehors du dépôt. */
  homepage?: string;
}

export const ORG_URL = 'https://github.com/kronkorp';
export const projectPath = (repo: string, lang: Lang) =>
  lang === 'fr' ? `/projets/${repo}/` : `/en/projects/${repo}/`;

/** Écosystème moteur : KUGE a sa propre section sur l'accueil. */
export const kuge: Project = {
  repo: 'KUGE',
  description: { fr: 'Un moteur de jeu C++20 fait de briques indépendantes.', en: 'A C++20 game engine made of independent blocks.' },
};

export const members = [
  { name: 'Gauthier Malfilatre', login: 'GauthierMalfilatre' },
  { name: 'Ethan Bertin--Prévot', login: 'YknotTYD' },
  { name: 'Clement Devaux', login: 'clementd-tek' },
  { name: 'Julian Hemmer', login: 'julian-hemmer' },
  { name: 'Romain Marcot', login: 'NetCatRunner' },
];

export const repoUrl = (repo: string) => `${ORG_URL}/${repo}`;

/** Écosystème C++ (hors KUGE, qui a sa propre section). */
export const cpp: Project[] = [
  {
    repo: 'kronkworld',
    description: {
      fr: 'Un ECS léger en C++.',
      en: 'A light ECS, in C++.',
    },
  },
  {
    repo: 'kronk3d',
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
    description: {
      fr: 'Une bibliothèque réseau bas niveau en C.',
      en: 'A low level network library in C.',
    },
    homepage: 'https://kronkorp.github.io/kronknet/',
  },
  {
    repo: 'kronkflow',
    description: {
      fr: 'Un petit ordonnanceur de tâches en C, fait pour le projet zappy.',
      en: 'A tiny task scheduler in C, built for the zappy project.',
    },
  },
  {
    repo: 'kronkpool',
    description: {
      fr: 'Un pool de threads simple en C, avec pthread.',
      en: 'A simple thread pool in C using pthread.',
    },
  },
  {
    repo: 'kronklab',
    description: {
      fr: 'Un framework de tests simple en C.',
      en: 'A simple test framework in C.',
    },
  },
  {
    repo: 'kronkargs',
    description: {
      fr: 'Un analyseur d’arguments pour les programmes en C.',
      en: 'A simple argument parser library, for C programs.',
    },
  },
];
