import type { Lang } from '../i18n/ui';

export interface Example {
  title: Record<Lang, string>;
  lang: 'c' | 'cpp' | 'cmake';
  /** Extrait repris du README du dépôt. */
  code: string;
}

export interface Details {
  about: Record<Lang, string[]>;
  examples: Example[];
}

/** Contenu des pages projet, par nom de dépôt. Les exemples viennent des README. */
export const details: Record<string, Details> = {
  KUGE: {
    about: {
      fr: [
        'KUGE est un moteur de jeu C++20 fait de briques indépendantes. Un jeu ne lie que celles dont il a besoin : un jeu solo, un serveur dédié et un jeu où un joueur héberge la partie se construisent avec les mêmes briques.',
        'kuge-core porte la boucle à pas fixe, les scènes et les systèmes. kuge-client ajoute la fenêtre, les entrées, le dessin 2D, les sons, le texte et l’interface. kuge-physics gère les collisions 2D. kuge-net, kuge-server et kuge-replication couvrent le réseau, les salons et la prédiction côté client. Un serveur n’embarque ni fenêtre ni code de dessin : le système de build empêche d’inclure ce qui n’est pas lié.',
        'Le dépôt contient aussi un petit R-Type, en serveur, en client et en hôte, et Arena, un jeu de tir 3D.',
      ],
      en: [
        'KUGE is a C++20 game engine made of independent building blocks. A game links only the ones it needs: a solo game, a dedicated server and a game where one player hosts the match are all built from the same blocks.',
        'kuge-core holds the fixed-step loop, the scenes and the systems. kuge-client adds the window, inputs, 2D drawing, sounds, text and UI. kuge-physics handles 2D collisions. kuge-net, kuge-server and kuge-replication cover the network, lobbies and client-side prediction. A server carries no window and no drawing code: the build system makes it impossible to include what was not linked.',
        'The repository also holds a small R-Type, as a server, a client and a host, and Arena, a 3D shooter.',
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
