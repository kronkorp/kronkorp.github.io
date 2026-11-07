export type Lang = 'fr' | 'en';

export const languages: Record<Lang, { short: string; name: string; path: string }> = {
  fr: { short: 'FR', name: 'Français', path: '/' },
  en: { short: 'EN', name: 'English', path: '/en/' },
};

interface UI {
  meta: { title: string; description: string };
  skip: string;
  langLabel: string;
  hero: { lead: string; cta: string };
  kuge: { label: string; lead: string; modules: string[]; cta: string };
  cpp: { label: string };
  clibs: { label: string };
  site: string;
  about: { label: string; paragraphs: string[]; members: string };
  project: { back: string; about: string; examples: string; github: string; site: string };
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
    hero: {
      lead: 'Un moteur de jeu, des bibliothèques C et leurs outils.',
      cta: 'Voir l’orga sur GitHub',
    },
    kuge: {
      label: 'Moteur',
      lead: 'KUGE est un moteur de jeu C++20 fait de briques indépendantes. Un jeu ne lie que celles dont il a besoin.',
      modules: ['kuge-core', 'kuge-client', 'kuge-physics'],
      cta: 'Voir KUGE sur GitHub',
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
    hero: {
      lead: 'A game engine, C libraries and their tools.',
      cta: 'See the organization on GitHub',
    },
    kuge: {
      label: 'Engine',
      lead: 'KUGE is a C++20 game engine made of independent blocks. A game links only the ones it needs.',
      modules: ['kuge-core', 'kuge-client', 'kuge-physics'],
      cta: 'See KUGE on GitHub',
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
      github: 'See the repository on GitHub',
      site: 'Project page',
    },
    projectMeta: (name) => `${name}: a Kronk Corp project. Overview and usage examples.`,
    site: 'Project page',
    footer: { org: 'Kronk Corp on GitHub' },
  },
};
