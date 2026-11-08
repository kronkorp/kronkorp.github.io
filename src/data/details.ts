import type { Lang } from '../i18n/ui';

export interface Example {
  title: Record<Lang, string>;
  lang: 'c' | 'cpp' | 'cmake' | 'lua';
  /** Extrait repris du README du dépôt. */
  code: string;
}

/**
 * Une version du changelog, découpée par thème. version 'dev' = pas encore publiée.
 * Chaque version apparaît sur la page du projet et sur la page Nouveautés (triée par date).
 */
export interface Release {
  version: string;
  /** AAAA-MM-JJ, absente pour 'dev'. */
  date?: string;
  groups: { title: Record<Lang, string>; items: Record<Lang, string[]> }[];
}

export interface Details {
  about: Record<Lang, string[]>;
  examples: Example[];
  changelog?: Release[];
}

/** Contenu des pages projet, par nom de dépôt. Les exemples viennent des README. */
export const details: Record<string, Details> = {
  KUGE: {
    about: {
      fr: [
        'KUGE est un moteur de jeu C++20 fait de briques indépendantes. Un jeu ne lie que celles dont il a besoin : un jeu solo, un serveur dédié et un jeu où un joueur héberge la partie se construisent avec les mêmes briques.',
        'kuge-core porte la boucle à pas fixe, les scènes et les systèmes, et kuge-logger les logs. kuge-client ajoute la fenêtre, les entrées, le dessin 2D, les sons, le texte et l’interface. kuge-render3d dessine la 3D avec kronk3d, et kuge-animation gère poses, mélanges et machines à états. kuge-physics gère les collisions 2D, kuge-physics3d la physique 3D avec Jolt. kuge-net, kuge-server et kuge-replication couvrent le réseau, les salons et la prédiction côté client. Un serveur n’embarque ni fenêtre ni code de dessin : le système de build empêche d’inclure ce qui n’est pas lié.',
        'kuge-script ouvre le jeu aux mods. Un mod est un dossier : il remplace des données (JSON, sprites, sons) sans code, et peut ajouter un comportement en Lua. Le jeu décrit lui-même les composants qu’un script a le droit de lire et d’écrire ; le script tourne dans un bac à sable sans fichiers, sans horloge, avec un budget d’instructions et de mémoire, et se recharge à chaud pendant que le jeu tourne. En multijoueur, le serveur choisit les mods et refuse un client dont les fichiers diffèrent.',
        'Le dépôt contient aussi un petit R-Type, en serveur, en client et en hôte, Arena, un jeu de tir 3D, et Catch, un jeu de 250 lignes avec un mod à côté.',
      ],
      en: [
        'KUGE is a C++20 game engine made of independent building blocks. A game links only the ones it needs: a solo game, a dedicated server and a game where one player hosts the match are all built from the same blocks.',
        'kuge-core holds the fixed-step loop, the scenes and the systems, and kuge-logger the logs. kuge-client adds the window, inputs, 2D drawing, sounds, text and UI. kuge-render3d draws 3D with kronk3d, and kuge-animation handles poses, blends and state machines. kuge-physics handles 2D collisions, kuge-physics3d 3D physics with Jolt. kuge-net, kuge-server and kuge-replication cover the network, lobbies and client-side prediction. A server carries no window and no drawing code: the build system makes it impossible to include what was not linked.',
        'kuge-script opens the game to mods. A mod is a folder: it replaces data (JSON, sprites, sounds) with no code, and can add behaviour in Lua. The game itself describes which components a script may read and write; the script runs in a sandbox with no files, no clock, and a budget of instructions and memory, and reloads while the game runs. In multiplayer, the server picks the mods and turns away a client whose files differ.',
        'The repository also holds a small R-Type, as a server, a client and a host, Arena, a 3D shooter, and Catch, a 250-line game with a mod next to it.',
      ],
    },
    examples: [
      {
        title: { fr: 'Lier les modules dont on a besoin', en: 'Link the modules you need' },
        lang: 'cmake',
        code: `add_executable(my_game main.cpp)
target_link_libraries(my_game PRIVATE kuge-client kuge-physics)   # brings kuge-core too`,
      },
      {
        title: { fr: 'Une scène et un système', en: 'A scene and a system' },
        lang: 'cpp',
        code: `class MoveRight : public kw::ISystem
{
    public:
        bool handle(kw::World& world) override
        {
            const float dt = static_cast<float>(world.getResource<kuge::Time>().dt);
            auto view = world.view<kuge::Transform2D>();

            for (kw::Entity entity : view) {
                world.get<kuge::Transform2D>(entity).position.x += 100.0f * dt;
            }
            return true;          // false: not called again
        }
};

class Hello : public kuge::Scene
{
    public:
        void onEnter() override
        {
            addSystem(kw::Schedule::Fixed, kuge::stage::Simulation, std::make_unique<MoveRight>());
        }
};

int main()
{
    kuge::Engine engine({.mode = kuge::Engine::Mode::Headless, .tickRate = 60});

    engine.scenes().change<Hello>();
    return engine.run();          // until stop(), Ctrl+C, or no scene is left
}`,
      },
      {
        title: { fr: 'Des collisions avec kuge-physics', en: 'Collisions with kuge-physics' },
        lang: 'cpp',
        code: `world.add<kuge::Collider>(floor, kuge::Collider::box(400.0f, 20.0f));
world.add<kuge::Collider>(hero,  kuge::Collider::box(12.0f, 24.0f));
world.add<kuge::Body>(hero, kuge::Body{kuge::Body::Type::Dynamic});   // velocity, gravityScale...
world.add<kuge::Collider>(coin,  kuge::Collider::circle(8.0f).asTrigger());`,
      },
      {
        title: { fr: 'Rendre son jeu moddable', en: 'Make your game moddable' },
        lang: 'cpp',
        code: `const kuge::Mods mods = kuge::Mods::scan("mods");
mods.apply(roots);                         // a mod's files come before the game's

auto registry = std::make_shared<kuge::ComponentRegistry>();
kuge::describeCore(*registry);             // Transform2D...
registry->describe<Faller>("Faller", {     // ...and what this game lets a script touch
    kuge::field<Faller>("speed", &Faller::speed, {.min = 0.0, .max = 1000.0, .help = "Pixels per second"}),
    kuge::field<Faller>("value", &Faller::value, {.min = 1.0, .max = 100.0, .help = "Points when caught"}),
});

auto scripts = std::make_shared<kuge::ScriptEngine>(*registry);
for (const auto& script : mods.scripts())
    scripts->load(script.file, script.mod);  // each mod keeps its own globals`,
      },
      {
        title: { fr: 'Un mod en Lua', en: 'A mod in Lua' },
        lang: 'lua',
        code: `-- mods/golden/scripts/golden.lua: every 5 seconds, a gold coin falls twice as fast and is worth 5 points.
local EVERY = 5.0
local timer = 0.0

function update(dt)
    timer = timer + dt
    if timer >= EVERY then
        timer = timer - EVERY
        world:spawn{
            Transform2D = {position = {math.random(-280, 280), -250}},
            Faller = {speed = 240, value = 5},
        }
    end
end`,
      },
    ],
    changelog: [
      {
        version: '1.0.0',
        date: '2026-11-08',
        groups: [
          {
            title: { fr: 'Modding en Lua', en: 'Lua modding' },
            items: {
              fr: [
                'Nouveau module kuge-script : des scripts Lua dans un bac à sable, qui lisent et écrivent le monde par nom à travers une seule table, world.',
                'Le jeu choisit ce qui est moddable : un script ne voit que les composants décrits au ComponentRegistry.',
                'ScriptSystem appelle update(dt) de chaque mod à chaque tick ; un mod qui plante est arrêté seul.',
                'Rechargement à chaud des scripts pendant que le jeu tourne (option --dev).',
                'Chaque mod a ses propres globales, sa copie des tables standard et de world, et sa limite de mémoire (16 Mio par mod, 64 Mio en tout).',
                'Bac à sable : ni io, os, require ni load, pas de bytecode, pas d’horloge ; 1 000 000 d’instructions par appel.',
                'Multijoueur : une empreinte de tous les fichiers des mods ; un client qui n’a pas les mêmes est refusé.',
                'Exemples : Catch, un jeu de 250 lignes avec le mod « golden », et le mod « waves ». Un chapitre complet du guide sur les scripts.',
              ],
              en: [
                'New kuge-script module: Lua scripts in a sandbox, reading and writing the world by name through a single table, world.',
                'The game chooses what is moddable: a script only sees the components described to the ComponentRegistry.',
                'ScriptSystem calls every mod’s update(dt) each tick; a mod that fails is stopped alone.',
                'Hot reload of scripts while the game runs (--dev switch).',
                'Each mod has its own globals, its own copy of the standard tables and of world, and its own memory limit (16 MiB per mod, 64 MiB in all).',
                'Sandbox: no io, os, require or load, no bytecode, no clock; 1,000,000 instructions per call.',
                'Multiplayer: a fingerprint of every mod file; a client without the same ones is turned away.',
                'Examples: Catch, a 250-line game with the “golden” mod, and the “waves” mod. A full guide chapter on scripts.',
              ],
            },
          },
          {
            title: { fr: 'Interface', en: 'UI' },
            items: {
              fr: [
                'Coins arrondis pour les panneaux, boutons et champs texte ; les clics suivent la forme.',
                'Images avec rotation, pivot et arrondi.',
                'Texte trop long : coupé, terminé par « … », défilant ou passé à la ligne.',
                'Les enfants sont coupés au rectangle du parent ; un élément posé sur un bouton prend ses clics.',
              ],
              en: [
                'Rounded corners for panels, buttons and text fields; clicks follow the shape.',
                'Images with rotation, pivot and rounded corners.',
                'Text too long for its label: clipped, ended with “…”, scrolling or wrapped.',
                'Children are clipped to their parent’s rectangle; a node over a button takes its clicks.',
              ],
            },
          },
          {
            title: { fr: 'Rendu', en: 'Rendering' },
            items: {
              fr: [
                'Résolution de base : le jeu dessine dans une taille fixe, agrandie en plein écran.',
                'Une image dessinée plus petite qu’elle n’est n’a plus d’effet d’escalier.',
                'Caméra : secousses de la vue sans changer la visée, et inclinaison (roll).',
              ],
              en: [
                'Base resolution: the game draws at a fixed size, scaled up in fullscreen.',
                'A picture drawn smaller than it is no longer aliases.',
                'Camera: view kicks apart from the aim, and roll.',
              ],
            },
          },
          {
            title: { fr: 'Moteur et réseau', en: 'Engine and network' },
            items: {
              fr: [
                'Traduction : textes par langue, langue de secours, variables {n} et pluriels.',
                'Un client qui redémarre retrouve sa place dans la partie.',
              ],
              en: [
                'Localization: texts per language, fallback language, {n} variables and plural forms.',
                'A client that restarts gets its place back in the match.',
              ],
            },
          },
          {
            title: { fr: '3D et niveaux', en: '3D and levels' },
            items: {
              fr: [
                'Un niveau se lit depuis une scène 3D : les objets col_ sont des murs, zone_ des déclencheurs, spawn_ et lamp des repères.',
                'Collisions sur maillage pour les objets fixes : toit, pente, mur courbe.',
                'Personnages modulaires : un seul modèle partagé dont on cache des parties.',
                'Niveau destructible, synchronisé entre les joueurs et pris en compte par la prédiction.',
              ],
              en: [
                'A level is read from a 3D scene: col_ objects are walls, zone_ triggers, spawn_ and lamp markers.',
                'Mesh colliders for static objects: a roof, a slope, a curved wall.',
                'Modular characters: one shared model with parts hidden.',
                'Destructible level, synced between players and handled by prediction.',
              ],
            },
          },
          {
            title: { fr: 'Windows', en: 'Windows' },
            items: {
              fr: [
                'Les tests unitaires compilent et tournent sous Windows.',
                'Correctifs : limite d’images par seconde, signaux d’arrêt, kuge.dll, audio SDL, connexions TCP.',
              ],
              en: [
                'The unit tests build and run on Windows.',
                'Fixes: frame limit, stop signals, kuge.dll, SDL audio, TCP connections.',
              ],
            },
          },
        ],
      },
      {
        version: '0.3.0',
        date: '2026-10-22',
        groups: [
          {
            title: { fr: 'Réseau et salons', en: 'Network and rooms' },
            items: {
              fr: [
                'Le jeu choisit qui joue avec qui (ServerConfig::roomPicker).',
                'Authentification des joueurs, avec un jeton dans les demandes de salon.',
                'L’adresse de chaque joueur est connue du salon.',
              ],
              en: [
                'The game chooses who plays with whom (ServerConfig::roomPicker).',
                'Player authentication, with a token in room requests.',
                'Each player’s address is known to the room.',
              ],
            },
          },
          {
            title: { fr: 'Client', en: 'Client' },
            items: {
              fr: [
                'Musique : pause, position, déplacement et fin de lecture.',
                'L’interface garde l’ordre de création des éléments, et removeUiTree retire un arbre entier.',
              ],
              en: [
                'Music: pause, position, seek and end of playback.',
                'The UI keeps the order nodes were made in, and removeUiTree removes a whole tree.',
              ],
            },
          },
        ],
      },
      {
        version: '0.2.0',
        date: '2026-10-20',
        groups: [
          {
            title: { fr: '3D', en: '3D' },
            items: {
              fr: [
                'Rendu 3D avec kronk3d (CPU ou OpenGL), modèles, animation, caméra orbitale qui s’arrête aux murs, instanciation.',
                'Physique 3D, hitboxes et contrôleur de personnage ; réplication 3D.',
                'Arena, un jeu de tir 3D en réseau, avec sons placés et particules.',
              ],
              en: [
                '3D rendering with kronk3d (CPU or OpenGL), models, animation, an orbit camera that stops at walls, instancing.',
                '3D physics, hitboxes and character controller; 3D replication.',
                'Arena, a networked 3D shooter, with placed sounds and particles.',
              ],
            },
          },
          {
            title: { fr: 'Réseau', en: 'Network' },
            items: {
              fr: [
                'Historique du monde, filtre de visibilité, apparitions prédites, replays et reconnexion.',
                'Un réseau simulé (latence, pertes) pour tester.',
              ],
              en: [
                'World history, visibility filter, predicted spawns, replays and rejoin.',
                'A simulated network (latency, loss) for testing.',
              ],
            },
          },
          {
            title: { fr: 'Moteur et outils', en: 'Engine and tools' },
            items: {
              fr: [
                'Mods (données), composants accessibles par nom et cinématiques.',
                'Profileur, options de débogage, console avec variables, chat texte, catégories de logs.',
                'Animation (kuge-animation) et rebond dans la physique.',
              ],
              en: [
                'Mods (data), components by name and cutscenes.',
                'Profiler, debug options, console with cvars, text chat, log categories.',
                'Animation (kuge-animation) and restitution in physics.',
              ],
            },
          },
          {
            title: { fr: 'Client', en: 'Client' },
            items: {
              fr: [
                'Interface : presse-papiers, barre de progression, case à cocher, curseur, défilement, images, mise à l’échelle.',
                'Audio : bus de dialogue, atténuation de la musique, priorités, sons 3D étouffés, streaming.',
                'Scènes superposées, taille logique de la fenêtre, axes de la souris.',
              ],
              en: [
                'UI: clipboard, progress bar, check box, slider, scrolling, images, scaling.',
                'Audio: dialogue bus, ducking, priorities, muffled 3D sounds, streaming.',
                'Overlay scenes, logical window size, mouse axes.',
              ],
            },
          },
        ],
      },
      {
        version: '0.1.0',
        date: '2026-10-08',
        groups: [
          {
            title: { fr: 'Première version', en: 'First release' },
            items: {
              fr: [
                'Le cœur du moteur : boucle à pas fixe, scènes, systèmes, fenêtre, dessin 2D, sprites animés, sons, texte et interface avec champ texte.',
                'Réseau : salons nommés, liste des salons publics, salons privés, prédiction côté client.',
                'Compile et tourne sous Linux et Windows (MSVC), bibliothèques du client via vcpkg, CI sur chaque PR.',
              ],
              en: [
                'The engine core: fixed-step loop, scenes, systems, window, 2D drawing, animated sprites, sounds, text and UI with a text field.',
                'Network: named rooms, a list of public rooms, private rooms, client-side prediction.',
                'Builds and runs on Linux and Windows (MSVC), client libraries from vcpkg, CI on every PR.',
              ],
            },
          },
        ],
      },
    ],
  },

  kronkworld: {
    about: {
      fr: [
        'KronkWorld est un petit ECS (Entity Component System) pour C++20. Les entités sont de simples identifiants. Les composants sont n’importe quel type C++, rangés dans un tableau compact par type. Les systèmes sont des classes avec une méthode handle(World&), lancées par étapes. Les ressources sont des singletons globaux du monde : fenêtre, temps écoulé, score.',
        'Toute l’API tient dans kw::World. KronkWorld s’appuie sur kronkflow pour ordonnancer les systèmes. C’est le cœur des scènes de KUGE.',
      ],
      en: [
        'KronkWorld is a small ECS (Entity Component System) for C++20. Entities are plain ids. Components are any C++ type, stored in one packed array per type. Systems are classes with a handle(World&) method, run by stage. Resources are global singletons owned by the world: window, delta time, score.',
        'The whole API fits in kw::World. KronkWorld relies on kronkflow to schedule systems. It is the core of KUGE’s scenes.',
      ],
    },
    examples: [
      {
        title: { fr: 'Entités et composants', en: 'Entities and components' },
        lang: 'cpp',
        code: `struct Position { float x, y; };
struct Velocity { float dx, dy; };
struct Player {};

// Create an entity with its components in one go
kw::Entity player = world.spawn(Player{}, Position{0.f, 0.f}, Velocity{60.f, 0.f});
// ...or step by step
kw::Entity rock = world.create();
world.add<Position>(rock, 10.f, 10.f);      // constructor args are forwarded
world.get<Position>(rock).x += 1.f;         // read / write
bool moves = world.has<Velocity>(rock);     // false
world.remove<Position>(rock);               // remove one component
world.remove(player);                       // destroy the entity (ids are recycled)`,
      },
      {
        title: { fr: 'Parcourir avec une vue', en: 'Iterate with a view' },
        lang: 'cpp',
        code: `// Callback style
world.view<Position, Velocity>().foreach(
    [](kw::Entity e, Position& pos, Velocity& vel) {
        pos.x += vel.dx;
        pos.y += vel.dy;
    });

// Range-for style
for (kw::Entity e : world.view<Player, Position>())
    world.get<Position>(e).x = 0.f;`,
      },
      {
        title: { fr: 'Un système', en: 'A system' },
        lang: 'cpp',
        code: `class MovementSystem : public kw::ISystem {
public:
    bool handle(kw::World& world) override
    {
        const float dt = world.getResource<Dt>().seconds;
        world.view<Position, Velocity>().foreach(
            [dt](kw::Entity, Position& pos, Velocity& vel) {
                pos.x += vel.dx * dt;
                pos.y += vel.dy * dt;
            });
        return true;
    }
};

enum Stage : size_t { Startup, Update, Render };
world.addSystem(Update, std::make_unique<MovementSystem>());`,
      },
    ],
    changelog: [
      {
        version: '1.0.0',
        date: '2026-11-07',
        groups: [
          {
            title: { fr: 'Première version stable', en: 'First stable release' },
            items: {
              fr: [
                'world.spawn crée une entité avec tous ses composants en un seul appel.',
                'Correctif : parcourir une vue vide ne pose plus de problème.',
                'Compile sous Windows (MSVC) ; kronklab et kronkflow sont épinglés à une version précise.',
                'Nouveau test de non-régression pour World::remove sur un composant.',
              ],
              en: [
                'world.spawn creates an entity with all its components in one call.',
                'Fix: iterating an empty view no longer goes wrong.',
                'Builds on Windows (MSVC); kronklab and kronkflow are pinned to a set version.',
                'New regression test for World::remove on a component.',
              ],
            },
          },
        ],
      },
    ],
  },

  kronk3d: {
    about: {
      fr: [
        'kronk3d est une petite bibliothèque de rastérisation 3D en C++20, avec deux moteurs de rendu derrière une même interface. Le moteur logiciel est un rasterizer CPU par tuiles, multithread, qui dessine en mémoire sans GPU ni fenêtre. Le moteur OpenGL 3.3 dessine dans le contexte que votre application possède déjà.',
        'Les deux produisent la même image : le code d’éclairage est miroir, et les tests comparent les sorties pixel par pixel. On y trouve l’éclairage Blinn-Phong, les ombres en cascade, le brouillard, les skybox, la transparence, l’anti-aliasing (FXAA, SSAA), le chargement OBJ et glTF, et l’animation par squelette.',
      ],
      en: [
        'kronk3d is a small C++20 3D rasterization library with two interchangeable backends behind a single interface. The software backend is a multithreaded, tile-based CPU rasterizer that renders into memory and needs no GPU or window. The OpenGL 3.3 backend renders into the context your application already has.',
        'Both produce the same image: the shading code is mirrored, and tests compare their outputs pixel by pixel. It covers Blinn-Phong lighting, cascaded shadows, fog, skyboxes, transparency, anti-aliasing (FXAA, SSAA), OBJ and glTF loading, and skeletal animation.',
      ],
    },
    examples: [
      {
        title: { fr: 'Démarrage rapide', en: 'Quick start' },
        lang: 'cpp',
        code: `#include <kronk3d/Kronk3d.hpp>

// Assets
auto model = k3::ObjLoader::load("assets/spot/spot.obj");     // k3::Result<k3::Model>
if (!model)
    return std::cerr << model.error() << '\\n', 1;

// Backend. Software needs nothing. OpenGL needs a 3.3 core context to be current.
auto rasterizer = k3::createRasterizer(k3::Backend::OpenGL, {
    .width = 800, .height = 600,
    .glLoader = [](const char* name) { return sf::Context::getFunction(name); },
});
if (!rasterizer)
    return std::cerr << rasterizer.error() << '\\n', 1;

// Scene
k3::Camera camera;
camera.position = {0.f, 1.f, 4.f};
camera.lookAt({0.f, 0.f, 0.f});

k3::Environment environment;
environment.lights.push_back(k3::Light::directional({-0.5f, -1.f, -0.6f}));
environment.lights.back().castShadows = true;

// Frame
(*rasterizer)->beginFrame(camera, environment);
(*rasterizer)->draw(*model, k3::Math::Matrix4::rotateZX(angle));
(*rasterizer)->endFrame();

k3::Image frame = (*rasterizer)->readPixels();   // sRGB RGBA8, top row first
frame.savePNG("frame.png");`,
      },
      {
        title: { fr: 'Un personnage animé (glTF)', en: 'An animated character (glTF)' },
        lang: 'cpp',
        code: `auto loaded = k3::GltfLoader::load("assets/hero.glb");          // k3::Result<k3::AnimatedModel>
if (!loaded)
    return std::cerr << loaded.error() << '\\n', 1;

k3::Animator hero(std::make_shared<const k3::AnimatedModel>(std::move(*loaded)));
hero.play("Walk");                                               // Loops by default

// Each frame
if (jumpPressed)
    hero.play("Jump", {.loop = false, .fade = 0.1f});            // Crossfades from the current clip
else if (hero.clip() == "Jump" && hero.finished())
    hero.play("Walk");
hero.update(deltaSeconds);

rasterizer->beginFrame(camera, environment);
hero.draw(*rasterizer, k3::Math::Matrix4::translate(position));  // Place the character in the world
rasterizer->endFrame();`,
      },
    ],
  },

  kronknet: {
    about: {
      fr: [
        'KronkNet est une bibliothèque réseau TCP asynchrone, rapide, en C. Elle repose sur l’appel système poll() et une architecture pilotée par les événements : un seul thread gère de nombreuses connexions. Un tampon circulaire interne évite de bloquer l’OS pendant les gros transferts.',
        'Le serveur ne bloque jamais la boucle de jeu. TCP et UDP sont gérés, en IPv4 comme en IPv6 sur une seule socket. Elle compile sous Linux et sous Windows (MSVC ou MinGW).',
      ],
      en: [
        'KronkNet is a high-performance asynchronous TCP network library in C. It is built around the poll() system call and an event-driven architecture: a single thread manages many connections. An internal ring buffer keeps the OS from blocking during large transfers.',
        'The server never freezes the game loop. Both TCP and UDP are supported, with IPv4 and IPv6 on a single socket. It builds on Linux and Windows (MSVC or MinGW).',
      ],
    },
    examples: [
      {
        title: { fr: 'Un serveur d’écho', en: 'An echo server' },
        lang: 'c',
        code: `#include <kronknet/server/server.h>
#include <kronknet/connection/connection.h>
#include <kronknet/macros/errdef.h>
#include <stdio.h>

static int on_connect(knServer *server, knConnection *conn)
{
    (void)server;
    printf("+ %s:%hu\\n", knConnection_getIp(conn), knConnection_getPort(conn));
    return KNEVTOK;
}

static int on_read(knConnection *conn, const void *data, size_t size)
{
    return knConnection_send(conn, data, size); // echo it back
}

static int on_disconnect(knServer *server, knConnection *conn)
{
    (void)server;
    printf("- %s:%hu\\n", knConnection_getIp(conn), knConnection_getPort(conn));
    return KNEVTOK;
}

int main(void)
{
    knServer *server = knServer_create(4242, knTCP);

    if (!server)
        return 1;
    knServer_setOnConnect(server, on_connect);
    knServer_setOnRead(server, on_read);
    knServer_setOnDisconnect(server, on_disconnect);
    knServer_run(server); // blocks until knServer_stop()
    knServer_destroy(server);
    return 0;
}`,
      },
    ],
    changelog: [
      {
        version: '1.2.0',
        date: '2026-09-23',
        groups: [
          {
            title: { fr: 'Performances', en: 'Performance' },
            items: {
              fr: ['poll() est remplacé par epoll(), qui tient bien mieux un très grand nombre de clients.'],
              en: ['poll() is replaced by epoll(), which handles a very large number of clients much better.'],
            },
          },
          {
            title: { fr: 'Projet', en: 'Project' },
            items: {
              fr: [
                'Correctif du délai d’expiration TCP.',
                'Le dossier mkn/, une ancienne version modulaire devenue inutile, est supprimé.',
                'Les tests se construisent depuis la racine (-DBUILD_TESTS=ON) avec kronklab, et la CI les lance.',
                'Modèles de PR et d’issue.',
              ],
              en: [
                'TCP timeout fix.',
                'The mkn/ folder, an old modular version that had become useless, is removed.',
                'Tests build from the root (-DBUILD_TESTS=ON) with kronklab, and the CI runs them.',
                'PR and issue templates.',
              ],
            },
          },
        ],
      },
    ],
  },

  kronkflow: {
    about: {
      fr: [
        'Kronkflow est un ordonnanceur de tâches léger en C, sans dépendance. Il range les tâches dans un tas binaire min : la prochaine tâche à lancer est toujours en haut.',
        'Il gère les tâches ponctuelles et périodiques. À chaque tick, les tâches prêtes sont exécutées étape par étape, quel que soit leur ordre d’insertion. Il a été écrit pour le projet zappy, et KronkWorld s’en sert pour lancer ses systèmes.',
      ],
      en: [
        'Kronkflow is a lightweight task scheduler for C, with no dependency. It keeps tasks in a binary min-heap, so the next task to run is always on top.',
        'It handles one-time and periodic tasks. Each tick, ready tasks run stage by stage, whatever the insertion order. It was built for the zappy project, and KronkWorld uses it to run its systems.',
      ],
    },
    examples: [
      {
        title: { fr: 'Une tâche périodique et une tâche ponctuelle', en: 'A periodic task and a one-time task' },
        lang: 'c',
        code: `#include <kronkflow/scheduler.h>
#include <kronkflow/task.h>
#include <stdio.h>
#include <unistd.h>

// Your task handler
static kfBool my_handler(void *context, void *data)
{
    printf("Task executed with data: %ld\\n", (long int)data);
    return kfTrue;
}

int main(void)
{
    // Create a scheduler with a capacity of 512 tasks
    kfScheduler *sch = kfScheduler_create(512);

    // Add a periodic task on stage 0 (runs in 2 ticks, then every 5 ticks)
    kfScheduler_addTask(sch,
        kfTask_opt(&my_handler, (void *)1, NULL, 0, (kfRWMasks){ 0, 0 }), 2, 5);

    // Add a punctual task on stage 1 (runs once in 10 ticks).
    kfScheduler_addTask(sch,
        kfTask_opt(&my_handler, (void *)3, NULL, 1, (kfRWMasks){ 0, 0 }), 10, 0);

    // Main loop
    while (1) {
        sleep(1); // Simulate time passing
        kfScheduler_tick(sch, NULL);
    }

    kfScheduler_destroy(sch);
    return 0;
}`,
      },
    ],
    changelog: [
      {
        version: '1.2.0',
        date: '2026-11-07',
        groups: [
          {
            title: { fr: 'Windows', en: 'Windows' },
            items: {
              fr: ['Compile et tourne sous Windows, avec MSVC et MinGW ; les dépendances sont épinglées à une version précise.'],
              en: ['Builds and runs on Windows, with MSVC and MinGW; dependencies are pinned to a set version.'],
            },
          },
        ],
      },
    ],
  },

  kronkpool: {
    about: {
      fr: [
        'Kronkpool est un pool de threads simple en C, avec une file d’attente maison et pthread (threads Win32 sous Windows). On lui donne des tâches, les workers se les répartissent.',
        'Il se construit avec CMake en bibliothèque statique ou partagée, sous Linux et sous Windows (MSVC, MinGW). Son API tient en quatre fonctions.',
      ],
      en: [
        'Kronkpool is a simple thread pool written in C, using a custom queue and pthread (Win32 threads on Windows). You give it tasks and the workers share them.',
        'It builds with CMake as a static or shared library, on Linux and Windows (MSVC, MinGW). Its API is four functions.',
      ],
    },
    examples: [
      {
        title: { fr: 'Lancer une tâche', en: 'Run a task' },
        lang: 'c',
        code: `#include <pthread.h>
#include <kronkpool/kronkpool.h>
#include <stdio.h>

static void *my_task(void *arg)
{
    printf("Task executed in thread [%zu] with arg [%p]\\n", pthread_self(), arg);
    return NULL;
}

int main(void)
{
    kpThreadPool *p = kpThreadPool_create(-1);

    printf("Threadpool has %zu workers\\n", kpThreadPool_getWorkers(p));

    kpThreadPool_pushTask(p, &my_task, (void *)10);

    kpThreadPool_destroy(p);
    return 0;
}`,
      },
    ],
  },

  kronklab: {
    about: {
      fr: [
        'KronkLab est un framework de tests et de benchmarks léger en C. On déclare un test avec Test(suite, nom), on le vérifie avec les macros Assert, et on lance l’exécutable pour obtenir un rapport.',
        'Un test qui plante (segfault…) est signalé comme échoué sans arrêter les autres. KronkLab compile sous Linux et sous Windows. Kronkpool s’en sert pour ses tests.',
      ],
      en: [
        'KronkLab is a light test and benchmark framework in C. Declare tests with Test(suite, name), check them with the Assert macros, and run the executable to get a report.',
        'A test that crashes (segfault…) is reported as failed and does not stop the others. KronkLab builds on Linux and Windows. Kronkpool uses it for its tests.',
      ],
    },
    examples: [
      {
        title: { fr: 'Écrire des tests', en: 'Writing tests' },
        lang: 'c',
        code: `#include "kronklab/kronklab.h"

Test(math, addition)
{
    AssertEq(1 + 1, 2, "1 + 1 should be 2");
}

Test(str, equal)
{
    AssertStrEq("kronk", "kronk", "strings differ");
}`,
      },
      {
        title: { fr: 'Mesurer', en: 'Benchmarks' },
        lang: 'c',
        code: `Bench(perf, loop)
{
    BenchStart();
    for (size_t i = 0; i < 10000000; ++i)
        ;
    BenchEnd();
    BenchReport();
}`,
      },
    ],
  },

  kronkargs: {
    about: {
      fr: [
        'Kronkargs (le dépôt s’appelle argot dans son README) est une bibliothèque simple pour analyser les arguments d’un programme en C.',
        'Son README est encore minimal : le détail de l’API est dans le dépôt.',
      ],
      en: [
        'Kronkargs (named argot in its README) is a simple library to parse the arguments of a C program.',
        'Its README is still minimal: the details of the API are in the repository.',
      ],
    },
    examples: [],
  },
};
