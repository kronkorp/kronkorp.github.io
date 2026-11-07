export type Lang = 'fr' | 'en';

export const languages: Record<Lang, { short: string; name: string; path: string }> = {
  fr: { short: 'FR', name: 'Français', path: '/' },
  en: { short: 'EN', name: 'English', path: '/en/' },
};

interface UI {
  meta: { title: string; description: string };
  skip: string;
  langLabel: string;
  nav: { label: string; kuge: string; cpp: string; clibs: string };
  hero: { eyebrow: string; lead: string; ctaKuge: string; ctaOrg: string };
  kuge: {
    eyebrow: string;
    title: string;
    lead: string;
    badges: [string, string, string];
    bullets: string[];
    modules: string;
    cta: string;
  };
  cpp: { eyebrow: string; title: string; lead: string };
  clibs: { eyebrow: string; title: string; lead: string };
  card: { repo: string; site: string };
  footer: { org: string };
}

export const ui: Record<Lang, UI> = {
  fr: {
    meta: {
      title: 'Kronk corp',
      description:
        'Kronk corp : un moteur de jeu C++20, des bibliothèques C et leurs outils. Le code est sur GitHub.',
    },
    skip: 'Aller au contenu',
    langLabel: 'Langue',
    nav: { label: 'Sections', kuge: 'Moteur', cpp: 'C++', clibs: 'Bibliothèques C' },
    hero: {
      eyebrow: 'Orga GitHub · C et C++',
      lead: 'Un moteur de jeu, des bibliothèques C et leurs outils. Le code est sur GitHub.',
      ctaKuge: 'Découvrir KUGE',
      ctaOrg: 'Voir l’orga sur GitHub',
    },
    kuge: {
      eyebrow: '01 · Moteur',
      title: 'Un moteur en briques indépendantes',
      lead: 'KUGE est un moteur de jeu C++20. Un jeu ne lie que les briques dont il a besoin.',
      badges: ['C++20', '2D et 3D', 'Linux et Windows'],
      bullets: [
        'Un jeu solo, un serveur dédié et un jeu hébergé par un joueur partent des mêmes briques.',
        'Le serveur ne lie ni SDL, ni fenêtre, ni code de dessin.',
        'Une documentation module par module, jusqu’à un R-Type complet.',
      ],
      modules: 'Modules',
      cta: 'Voir KUGE sur GitHub',
    },
    cpp: {
      eyebrow: '02 · C++',
      title: 'Autour du moteur',
      lead: 'Deux bibliothèques C++ : l’ECS sur lequel repose KUGE et un rasterizer 3D.',
    },
    clibs: {
      eyebrow: '03 · Bibliothèques C',
      title: 'Les bibliothèques C de l’orga',
      lead: 'Réseau, tâches, threads, tests, arguments : de quoi démarrer un projet en C.',
    },
    card: { repo: 'Dépôt', site: 'Page du projet' },
    footer: { org: 'Kronk corp sur GitHub' },
  },
  en: {
    meta: {
      title: 'Kronk corp',
      description:
        'Kronk corp: a C++20 game engine, C libraries and their tools. The code is on GitHub.',
    },
    skip: 'Skip to content',
    langLabel: 'Language',
    nav: { label: 'Sections', kuge: 'Engine', cpp: 'C++', clibs: 'C libraries' },
    hero: {
      eyebrow: 'GitHub organization · C and C++',
      lead: 'A game engine, C libraries and their tools. The code is on GitHub.',
      ctaKuge: 'Discover KUGE',
      ctaOrg: 'See the organization on GitHub',
    },
    kuge: {
      eyebrow: '01 · Engine',
      title: 'An engine of independent blocks',
      lead: 'KUGE is a C++20 game engine. A game links only the blocks it needs.',
      badges: ['C++20', '2D and 3D', 'Linux and Windows'],
      bullets: [
        'A solo game, a dedicated server and a game hosted by a player are built from the same blocks.',
        'The server links no SDL, no window and no drawing code.',
        'Documentation module by module, up to a complete R-Type.',
      ],
      modules: 'Modules',
      cta: 'See KUGE on GitHub',
    },
    cpp: {
      eyebrow: '02 · C++',
      title: 'Around the engine',
      lead: 'Two C++ libraries: the ECS KUGE is built on, and a 3D rasterizer.',
    },
    clibs: {
      eyebrow: '03 · C libraries',
      title: 'The organization’s C libraries',
      lead: 'Network, tasks, threads, tests, arguments: what it takes to start a C project.',
    },
    card: { repo: 'Repository', site: 'Project page' },
    footer: { org: 'Kronk corp on GitHub' },
  },
};
