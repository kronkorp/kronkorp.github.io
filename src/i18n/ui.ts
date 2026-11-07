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
    site: 'Project page',
    footer: { org: 'Kronk Corp on GitHub' },
  },
};
