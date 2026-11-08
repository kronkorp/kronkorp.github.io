export type Lang = 'fr' | 'en';

export const languages: Record<Lang, { short: string; name: string; path: string }> = {
  fr: { short: 'FR', name: 'Français', path: '/' },
  en: { short: 'EN', name: 'English', path: '/en/' },
};

interface UI {
  meta: { title: string; description: string };
  skip: string;
  langLabel: string;
  nav: { label: string; engine: string; libs: string; about: string; news: string };
  news: { title: string; lead: string };
  notFound: { lead: string; home: string };
  hero: { kicker: string; lead: string; cta: string; github: string };
  stats: { projects: string; stars: string; members: string; langs: string };
  kuge: { label: string; lead: string; modules: { name: string; text: string }[]; cta: string; github: string };
  libs: { label: string; title: string; lead: string };
  cpp: { label: string };
  clibs: { label: string };
  site: string;
  about: { label: string; paragraphs: string[]; members: string };
  project: { back: string; about: string; examples: string; changelog: string; unreleased: string; github: string; site: string };
  projectMeta: (name: string) => string;
  footer: { org: string };
}

export const ui: Record<Lang, UI> = {
  fr: {
    meta: {
      title: 'Kronk Corp',
      description:
        'Kronk Corp : un moteur de jeu C++20, des bibliothèques C et leurs outils. Le code est sur GitHub.',
    },
    skip: 'Aller au contenu',
    langLabel: 'Langue',
    nav: { label: 'Sections', engine: 'Moteur', libs: 'Bibliothèques', about: 'À propos', news: 'Nouveautés' },
    news: { title: 'Nouveautés', lead: 'Les nouvelles versions de tous les projets de Kronk Corp, de la plus récente à la plus ancienne.' },
    notFound: { lead: 'Cette page n’existe pas, ou plus.', home: 'Retour à l’accueil' },
    hero: {
      kicker: 'Game engine goes brrr',
      lead: 'Un moteur de jeu, des bibliothèques C et leurs outils. Tout est écrit de zéro, et tout est ouvert.',
      cta: 'Découvrir KUGE',
      github: 'L’orga sur GitHub',
    },
    stats: { projects: 'Projets', stars: 'Étoiles GitHub', members: 'Membres', langs: 'Langages' },
    kuge: {
      label: 'Moteur',
      lead: 'KUGE est un moteur de jeu C++20 fait de briques indépendantes. Un jeu ne lie que celles dont il a besoin.',
      modules: [
        { name: 'kuge-core', text: 'La boucle à pas fixe, les scènes et les systèmes.' },
        { name: 'kuge-logger', text: 'Les logs : niveaux, catégories, fichiers tournants.' },
        { name: 'kuge-client', text: 'La fenêtre, les entrées, le dessin 2D, les sons, le texte et l’interface.' },
        { name: 'kuge-render3d', text: 'La 3D avec kronk3d : modèles, lumières, caméra, particules.' },
        { name: 'kuge-animation', text: 'Poses, mélanges et machines à états, sans fenêtre.' },
        { name: 'kuge-physics', text: 'Les collisions 2D.' },
        { name: 'kuge-physics3d', text: 'La physique 3D, avec Jolt.' },
        { name: 'kuge-net', text: 'Le réseau.' },
        { name: 'kuge-server', text: 'Les salons, côté serveur.' },
        { name: 'kuge-replication', text: 'La prédiction côté client.' },
        { name: 'kuge-script', text: 'Les mods en Lua, dans un bac à sable.' },
      ],
      cta: 'Page du projet',
      github: 'KUGE sur GitHub',
    },
    libs: {
      label: 'Bibliothèques',
      title: 'Chaque brique, écrite à la main.',
      lead: 'Le moteur s’appuie sur ces bibliothèques. Chacune a son dépôt et sa documentation.',
    },
    cpp: { label: 'C++' },
    clibs: { label: 'Bibliothèques C' },
    about: {
      label: 'À propos',
      paragraphs: [
        'Kronk Corp est une organisation d’étudiants d’Epitech. Son but : construire un moteur de jeu complet, de zéro.',
        'Elle réunit le moteur, KUGE, et les bibliothèques dont il a besoin : un ECS, un rendu 3D, le réseau, un ordonnanceur de tâches, un pool de threads et un framework de tests. Chaque brique a son dépôt et sa documentation.',
        'Le principe : écrire chaque brique soi-même plutôt que d’en importer une. Tout le code est ouvert, sur GitHub.',
      ],
      members: 'Membres',
    },
    project: {
      back: 'Retour à l’accueil',
      about: 'Présentation',
      examples: 'Exemples',
      changelog: 'Nouveautés',
      unreleased: 'Prochaine version (branche dev)',
      github: 'Voir le dépôt sur GitHub',
      site: 'Page du projet',
    },
    projectMeta: (name) => `${name} : un projet de Kronk Corp. Présentation et exemples d’utilisation.`,
    site: 'Page du projet',
    footer: { org: 'Kronk Corp sur GitHub' },
  },
  en: {
    meta: {
      title: 'Kronk Corp',
      description:
        'Kronk Corp: a C++20 game engine, C libraries and their tools. The code is on GitHub.',
    },
    skip: 'Skip to content',
    langLabel: 'Language',
    nav: { label: 'Sections', engine: 'Engine', libs: 'Libraries', about: 'About', news: 'Changelog' },
    news: { title: 'Changelog', lead: 'New versions of every Kronk Corp project, newest first.' },
    notFound: { lead: 'This page does not exist, or no longer does.', home: 'Back to home' },
    hero: {
      kicker: 'Game engine goes brrr',
      lead: 'A game engine, C libraries and their tools. Everything is written from scratch, and everything is open.',
      cta: 'Discover KUGE',
      github: 'The organization on GitHub',
    },
    stats: { projects: 'Projects', stars: 'GitHub stars', members: 'Members', langs: 'Languages' },
    kuge: {
      label: 'Engine',
      lead: 'KUGE is a C++20 game engine made of independent blocks. A game links only the ones it needs.',
      modules: [
        { name: 'kuge-core', text: 'The fixed-step loop, the scenes and the systems.' },
        { name: 'kuge-logger', text: 'Logs: levels, categories, rotating files.' },
        { name: 'kuge-client', text: 'The window, inputs, 2D drawing, sounds, text and UI.' },
        { name: 'kuge-render3d', text: '3D with kronk3d: models, lights, camera, particles.' },
        { name: 'kuge-animation', text: 'Poses, blends and state machines, with no window.' },
        { name: 'kuge-physics', text: '2D collisions.' },
        { name: 'kuge-physics3d', text: '3D physics, with Jolt.' },
        { name: 'kuge-net', text: 'The network.' },
        { name: 'kuge-server', text: 'Lobbies, on the server side.' },
        { name: 'kuge-replication', text: 'Client-side prediction.' },
        { name: 'kuge-script', text: 'Lua mods, in a sandbox.' },
      ],
      cta: 'Project page',
      github: 'KUGE on GitHub',
    },
    libs: {
      label: 'Libraries',
      title: 'Every block, written by hand.',
      lead: 'The engine relies on these libraries. Each one has its own repository and documentation.',
    },
    cpp: { label: 'C++' },
    clibs: { label: 'C libraries' },
    about: {
      label: 'About',
      paragraphs: [
        'Kronk Corp is an organization of Epitech students. Its goal: build a complete game engine from scratch.',
        'It brings together the engine, KUGE, and the libraries it needs: an ECS, 3D rendering, networking, a task scheduler, a thread pool and a test framework. Each block has its own repository and documentation.',
        'The principle: write every block yourself instead of importing one. All the code is open, on GitHub.',
      ],
      members: 'Members',
    },
    project: {
      back: 'Back to home',
      about: 'Overview',
      examples: 'Examples',
      changelog: 'Changelog',
      unreleased: 'Next version (dev branch)',
      github: 'See the repository on GitHub',
      site: 'Project page',
    },
    projectMeta: (name) => `${name}: a Kronk Corp project. Overview and usage examples.`,
    site: 'Project page',
    footer: { org: 'Kronk Corp on GitHub' },
  },
};
