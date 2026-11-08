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

/** Ce qui a été fait avec KUGE, pour l'accueil. La première image est mise en avant. Fichiers dans public/img/kuge/. */
export const showcase: { src: string; width: number; height: number; caption: Record<Lang, string> }[] = [
  {
    src: '/img/kuge/kart-neon-city.webp', width: 1280, height: 720,
    caption: { fr: 'CP Explorer : course de karts en 3D, circuit Neon City', en: 'CP Explorer: a 3D kart race, Neon City track' },
  },
  {
    src: '/img/kuge/kart-menu.webp', width: 1280, height: 720,
    caption: { fr: 'CP Explorer : le menu, course solo, contre-la-montre, en ligne', en: 'CP Explorer: the menu, solo race, time trial, online' },
  },
  {
    src: '/img/kuge/kart-karts.webp', width: 1280, height: 720,
    caption: { fr: 'CP Explorer : le choix du kart', en: 'CP Explorer: choosing a kart' },
  },
  {
    src: '/img/kuge/kart-volcano-rush.webp', width: 1280, height: 720,
    caption: { fr: 'CP Explorer : circuit Volcano Rush', en: 'CP Explorer: Volcano Rush track' },
  },
  {
    src: '/img/kuge/kart-results.webp', width: 1280, height: 720,
    caption: { fr: 'CP Explorer : les résultats de la course', en: 'CP Explorer: race results' },
  },
  {
    src: '/img/kuge/my-torch-live.webp', width: 844, height: 478,
    caption: {
      fr: 'my_torch_live : un réseau de neurones qui apprend à lire une position d’échecs, vu en 3D pendant l’entraînement',
      en: 'my_torch_live: a neural network learning to read a chess position, seen in 3D while it trains',
    },
  },
];

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
