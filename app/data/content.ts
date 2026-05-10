export type Locale = "es" | "va";

export type ProjectItem = {
  title: string;
  category: string;
  year: string;
  shortDescription: string;
  summary: string;
  problem: string;
  role: string;
  technologies: string[];
  href: string;
  preview: string;
  image?: string;
  featured?: boolean;
};

type LocalizedContent = {
  nav: {
    services: string;
    projects: string;
    about: string;
    contact: string;
    talk: string;
    openMenu: string;
    closeMenu: string;
    paletteLabel: string;
    languageLabel: string;
  };
  hero: {
    words: string[];
    subline: string;
    scroll: string;
    chips: string[];
  };
  statement: {
    lines: { text: string; className?: string }[];
    kicker: string;
    ticker: string[];
  };
  services: {
    items: { num: string; title: string; desc: string }[];
  };
  projects: {
    headingTop: string;
    headingBottom: string;
    previous: string;
    next: string;
    preview: string;
    openProject: string;
    close: string;
    roleLabel: string;
    problemLabel: string;
    stackLabel: string;
    items: ProjectItem[];
  };
  stack: {
    kicker: string;
    title: string;
    body: string;
    items: { title: string; body: string; meta: string; initials: string; tools: string[] }[];
  };
  about: {
    kicker: string;
    title: string;
    intro: string;
    meta: string;
    note: string;
    highlights: { label: string; title: string; body: string }[];
    panelTitle: string;
    panelBody: string;
    links: { label: string; type: string; title: string }[];
  };
  footer: {
    wordmark: string;
    copy: string;
    contactKicker: string;
    contactTitle: string;
    contactBody: string;
    social: { github: string; linkedin: string; email: string };
  };
};

const sharedProjects: Omit<ProjectItem, "category" | "shortDescription" | "summary" | "problem" | "role">[] = [
  {
    title: "Lapreviapp",
    year: "2025",
    technologies: ["React Native", "Expo", "Firebase", "Web", "iOS"],
    href: "https://lapreviapp.com",
    preview: "https://lapreviapp.com",
    image: "/projects/lapreviapp.svg",
    featured: true,
  },
  {
    title: "Fiestas Matet",
    year: "2025",
    technologies: ["Next.js", "TypeScript", "Vercel"],
    href: "https://fiestasmatet.vercel.app",
    preview: "https://fiestasmatet.vercel.app",
    image: "/projects/fiestas-matet.svg",
  },
  {
    title: "Strago Chonin",
    year: "2026",
    technologies: ["Next.js", "Brand", "Catalogo", "Frontend"],
    href: "https://strago-chonin.vercel.app/",
    preview: "https://strago-chonin.vercel.app/",
    image: "/projects/strago-chonin.svg",
  },
  {
    title: "Casaleo",
    year: "2024",
    technologies: ["Angular", "Ionic", "Firebase", "UX/UI"],
    href: "https://jgarcia311999.github.io/",
    preview: "https://jgarcia311999.github.io/",
    image: "/projects/casaleo.svg",
  },
  {
    title: "Estima't",
    year: "2024",
    technologies: ["Web", "Accesibilidad", "Diseño visual"],
    href: "https://jgarcia311999.github.io/",
    preview: "https://jgarcia311999.github.io/",
    image: "/projects/estimat.svg",
  },
  {
    title: "Portfolio anterior",
    year: "2024",
    technologies: ["Portfolio", "Frontend", "Contenido"],
    href: "https://jgarcia311999.github.io/",
    preview: "https://jgarcia311999.github.io/",
    image: "/projects/portfolio-anterior.svg",
  },
];

export const contentByLocale: Record<Locale, LocalizedContent> = {
  es: {
    nav: {
      services: "servicios",
      projects: "proyectos",
      about: "sobre mi",
      contact: "contacto",
      talk: "Hablemos",
      openMenu: "Abrir menu",
      closeMenu: "Cerrar menu",
      paletteLabel: "Paletas de prueba",
      languageLabel: "Idioma",
    },
    hero: {
      words: ["portfolio", "apps", "web", "info", "curriculum", "design", "ai"],
      subline: "frontend + diseño + apps + IA aplicada",
      scroll: "Explorar",
      chips: ["Disponible para proyectos", "Valencia / remoto", "Web + apps"],
    },
    statement: {
      lines: [
        { text: "frontend, diseño y producto" },
        { text: "para ideas que quieren verse vivas" },
        { text: "/webs, apps, sistemas y automatización,", className: "slash" },
        { text: "mezclando criterio visual", className: "light" },
        { text: "con IA aplicada y código.", className: "light" },
      ],
      kicker: "Stack habitual",
      ticker: ["TypeScript", "Angular", "Ionic", "Figma", "Node.js", "Symfony", "Docker", "UX/UI", "IA aplicada"],
    },
    services: {
      items: [
        { num: "01", title: "ux/ui y dirección visual", desc: "Diseño interfaces claras, visuales y usables para que la experiencia no solo funcione, sino que también tenga identidad." },
        { num: "02", title: "frontend y experiencias web", desc: "Paso de la idea a una experiencia navegable y cuidada, construyendo webs y productos con atención al detalle y buen ritmo visual." },
        { num: "03", title: "design systems", desc: "Creo bases reutilizables para que los proyectos crezcan con coherencia: componentes, patrones, estilos y una forma clara de construir." },
        { num: "04", title: "ia y automatización", desc: "Exploro flujos con IA aplicada, prototipado rápido y pequeñas automatizaciones que aceleran procesos sin perder el control del resultado." },
        { num: "05", title: "apps propias", desc: "También desarrollo proyectos personales donde mezclo producto, diseño, código y experimentación para lanzar ideas que me interesa probar." },
      ],
    },
    projects: {
      headingTop: "/proyectos que",
      headingBottom: "ya están fuera.",
      previous: "Proyecto anterior",
      next: "Proyecto siguiente",
      preview: "preview",
      openProject: "abrir proyecto",
      close: "cerrar",
      roleLabel: "Mi papel",
      problemLabel: "Qué resolvía",
      stackLabel: "Tecnologías",
      items: [
        {
          ...sharedProjects[0],
          category: "app social",
          shortDescription: "Juego social disponible en web y app para iOS, pensado para compartir, jugar y moverse con soltura entre formatos.",
          summary: "Proyecto propio orientado a juego social. La idea es mezclar interacción, tono visual y una experiencia que funcione tanto en web como en móvil.",
          problem: "Necesitaba una forma de probar una idea de producto más juguetona, social y multiplataforma sin separar demasiado web y app.",
          role: "Diseño de producto, frontend, branding y dirección general de la experiencia.",
        },
        {
          ...sharedProjects[1],
          category: "web informativa",
          shortDescription: "Una web para consultar de forma rápida las fiestas de un pueblo, con foco en claridad, acceso inmediato y diseño directo.",
          summary: "Web de consulta rápida pensada para resolver una necesidad concreta con una interfaz simple, directa y fácil de mantener.",
          problem: "Hacía falta una web clara para consultar programación, actos y fechas sin fricción ni ruido innecesario.",
          role: "Estructura, diseño visual, frontend y organización de la información.",
        },
        {
          ...sharedProjects[2],
          category: "ecommerce local",
          shortDescription: "Ecommerce para un negocio local, combinando producto, catálogo y presencia digital con una estética más cuidada.",
          summary: "Una tienda online para negocio local con intención más visual, mejor presentación del catálogo y una sensación de producto más sólida.",
          problem: "El negocio necesitaba una presencia digital más creíble y un catálogo mejor presentado para vender online.",
          role: "Diseño, frontend, estructura de catálogo y tono visual del proyecto.",
        },
        {
          ...sharedProjects[3],
          category: "app web",
          shortDescription: "Aplicación para mejorar la comunicación y la gestión de eventos dentro del entorno fallero, construida con Angular, Ionic y Firebase.",
          summary: "Aplicación orientada a resolver organización y comunicación en un contexto muy concreto, buscando claridad operativa y acceso rápido.",
          problem: "Había una necesidad real de centralizar avisos, gestión y eventos en un entorno con mucha coordinación manual.",
          role: "UX/UI, frontend y estructura funcional del producto.",
        },
        {
          ...sharedProjects[4],
          category: "web asociativa",
          shortDescription: "Renovación web para una asociación contra el cáncer de mama, con una experiencia más interactiva y accesible.",
          summary: "Una propuesta más sensible y visual para una asociación, intentando equilibrar calidez, accesibilidad y mejor narrativa web.",
          problem: "La web necesitaba una experiencia más humana, más clara y mejor pensada para comunicar recursos y actividad.",
          role: "Diseño visual, arquitectura de contenido y frontend.",
        },
        {
          ...sharedProjects[5],
          category: "curriculum web",
          shortDescription: "Mi portfolio anterior, donde empecé a reunir proyectos, experiencia y una primera manera de contar lo que hago.",
          summary: "La versión anterior de mi portfolio, útil como archivo de proceso y como punto de partida para esta nueva etapa.",
          problem: "Quería reunir en un sitio único mis proyectos, experiencia y primeras pruebas de identidad profesional.",
          role: "Concepto, contenido, diseño y desarrollo.",
        },
      ],
    },
    stack: {
      kicker: "/stack y herramientas",
      title: "con qué suelo trabajar.",
      body: "Diseño, frontend, backend e IA aplicada. Más que una lista cerrada, es una forma de enseñar cómo suelo montar las cosas cuando quiero llevar una idea a producto.",
      items: [
        { title: "Diseño", body: "Figma, Figma Jam, Canva y Miro para pensar flujos, sistemas y presentaciones con una intención visual bastante clara.", meta: "ux/ui · visual", initials: "UX", tools: ["Figma", "Canva", "Miro"] },
        { title: "Frontend", body: "TypeScript, Angular, Ionic y HTML/CSS para construir interfaces con mimo por el detalle, el ritmo y el comportamiento.", meta: "web · apps", initials: "FE", tools: ["TypeScript", "Angular", "Ionic"] },
        { title: "Backend", body: "Node.js, Express, Symfony, PHP y bases de datos para sostener productos completos cuando hace falta cerrar también la parte técnica.", meta: "api · datos", initials: "BE", tools: ["Node.js", "Symfony", "PHP"] },
        { title: "Sistemas", body: "Componentes, patrones y documentación para ordenar el caos cuando un producto empieza a crecer de verdad.", meta: "design systems", initials: "DS", tools: ["Tokens", "Componentes", "Documentación"] },
        { title: "IA aplicada", body: "Automatizaciones, prototipos rápidos y formas de integrar IA en el proceso sin perder criterio ni control del resultado.", meta: "ai · flujos", initials: "IA", tools: ["Automatización", "Prototipos", "Prompts"] },
        { title: "Apps propias", body: "Proyectos personales para probar ideas, equivocarme rápido y lanzar cosas aunque todavía estén en evolución.", meta: "side projects", initials: "AP", tools: ["Producto", "Idea", "Lanzamiento"] },
      ],
    },
    about: {
      kicker: "/sobre mi",
      title: "una forma de construir.",
      intro: "Soy Jesús García. Me gusta moverme entre frontend, diseño y producto, sobre todo cuando una idea necesita pasar de boceto a algo usable y con criterio visual.",
      meta: "He ido mezclando desarrollo, interfaces, apps y experimentos propios hasta acabar en un punto bastante híbrido: me interesa tanto cómo se ve una cosa como cómo se monta por dentro.",
      note: "Ahora mismo me tira especialmente crear productos web, probar ideas rápido y usar IA aplicada como una herramienta más del proceso, no como atajo.",
      highlights: [
        {
          label: "Lo que hago",
          title: "Frontend con intención visual",
          body: "Me interesa que una interfaz funcione bien, pero también que tenga ritmo, jerarquía y una presencia propia.",
        },
        {
          label: "Cómo trabajo",
          title: "Diseño, código y producto juntos",
          body: "Suelo pensar las piezas a la vez: experiencia, implementación y decisiones de producto, para no separar demasiado unas de otras.",
        },
        {
          label: "Ahora mismo",
          title: "Apps, webs y pequeñas automatizaciones",
          body: "Estoy cómodo construyendo producto digital y explorando IA aplicada cuando ayuda a acelerar sin vaciar el criterio.",
        },
      ],
      panelTitle: "Diseño, código y producto en el mismo sitio.",
      panelBody: "Me interesa construir interfaces con intención, pero también que lo que hay debajo sea mantenible, útil y tenga sentido cuando el proyecto crece.",
      links: [
        { label: "Perfil", type: "GitHub", title: "Repositorios, pruebas y proyectos publicados" },
        { label: "CV", type: "Curriculum", title: "Recorrido, herramientas y formación" },
        { label: "Apps", type: "Producto", title: "Ideas propias llevadas a web y móvil" },
        { label: "Contacto", type: "Colaboración", title: "Disponible para proyectos y propuestas nuevas" },
      ],
    },
    footer: {
      wordmark: "jgarcia3199/portfolio",
      copy: "© 2026 Jesús García Alemany. Valencia, España. Todos los derechos reservados.",
      contactKicker: "/contacto",
      contactTitle: "Disponible para producto, frontend y proyectos con algo de intención.",
      contactBody: "Si la idea necesita mezcla de diseño, código y criterio visual, probablemente me interese hablarla.",
      social: { github: "GitHub", linkedin: "LinkedIn", email: "Email" },
    },
  },
  va: {
    nav: {
      services: "serveis",
      projects: "projectes",
      about: "sobre mi",
      contact: "contacte",
      talk: "Parlem",
      openMenu: "Obrir menu",
      closeMenu: "Tancar menu",
      paletteLabel: "Paletes de prova",
      languageLabel: "Idioma",
    },
    hero: {
      words: ["portfolio", "apps", "web", "info", "curriculum", "design", "ai"],
      subline: "frontend + disseny + apps + IA aplicada",
      scroll: "Explorar",
      chips: ["Disponible per a projectes", "València / remot", "Web + apps"],
    },
    statement: {
      lines: [
        { text: "frontend, disseny i producte" },
        { text: "per a idees que volen sentir-se vives" },
        { text: "/webs, apps, sistemes i automatització,", className: "slash" },
        { text: "barrejant criteri visual", className: "light" },
        { text: "amb IA aplicada i codi.", className: "light" },
      ],
      kicker: "Stack habitual",
      ticker: ["TypeScript", "Angular", "Ionic", "Figma", "Node.js", "Symfony", "Docker", "UX/UI", "IA aplicada"],
    },
    services: {
      items: [
        { num: "01", title: "ux/ui i direcció visual", desc: "Dissenye interfícies clares, visuals i usables perquè l'experiència no sols funcione, sinó que també tinga identitat." },
        { num: "02", title: "frontend i experiències web", desc: "Passe de la idea a una experiència navegable i cuidada, construint webs i productes amb atenció al detall i bon ritme visual." },
        { num: "03", title: "design systems", desc: "Cree bases reutilitzables perquè els projectes cresquen amb coherència: components, patrons, estils i una manera clara de construir." },
        { num: "04", title: "ia i automatització", desc: "Explore fluxos amb IA aplicada, prototipat ràpid i xicotetes automatitzacions que acceleren processos sense perdre el control del resultat." },
        { num: "05", title: "apps pròpies", desc: "També desenvolupe projectes personals on barrege producte, disseny, codi i experimentació per a llançar idees que m'interessa provar." },
      ],
    },
    projects: {
      headingTop: "/projectes que",
      headingBottom: "ja estan fora.",
      previous: "Projecte anterior",
      next: "Projecte següent",
      preview: "preview",
      openProject: "obrir projecte",
      close: "tancar",
      roleLabel: "El meu paper",
      problemLabel: "Què resolia",
      stackLabel: "Tecnologies",
      items: [
        {
          ...sharedProjects[0],
          category: "app social",
          shortDescription: "Joc social disponible en web i app per a iOS, pensat per a compartir, jugar i moure's amb soltesa entre formats.",
          summary: "Projecte propi orientat a joc social. La idea és barrejar interacció, to visual i una experiència que funcione tant en web com en mòbil.",
          problem: "Necessitava una manera de provar una idea de producte més juganera, social i multiplataforma sense separar massa web i app.",
          role: "Disseny de producte, frontend, branding i direcció general de l'experiència.",
        },
        {
          ...sharedProjects[1],
          category: "web informativa",
          shortDescription: "Una web per a consultar de forma ràpida les festes d'un poble, amb focus en claredat, accés immediat i disseny directe.",
          summary: "Web de consulta ràpida pensada per a resoldre una necessitat concreta amb una interfície simple, directa i fàcil de mantindre.",
          problem: "Feia falta una web clara per a consultar programació, actes i dates sense fricció ni soroll innecessari.",
          role: "Estructura, disseny visual, frontend i organització de la informació.",
        },
        {
          ...sharedProjects[2],
          category: "ecommerce local",
          shortDescription: "Ecommerce per a un negoci local, combinant producte, catàleg i presència digital amb una estètica més cuidada.",
          summary: "Una botiga online per a negoci local amb més intenció visual, millor presentació del catàleg i una sensació de producte més sòlida.",
          problem: "El negoci necessitava una presència digital més creïble i un catàleg millor presentat per a vendre online.",
          role: "Disseny, frontend, estructura de catàleg i to visual del projecte.",
        },
        {
          ...sharedProjects[3],
          category: "app web",
          shortDescription: "Aplicació per a millorar la comunicació i la gestió d'esdeveniments dins l'entorn faller, construïda amb Angular, Ionic i Firebase.",
          summary: "Aplicació orientada a resoldre organització i comunicació en un context molt concret, buscant claredat operativa i accés ràpid.",
          problem: "Hi havia una necessitat real de centralitzar avisos, gestió i esdeveniments en un entorn amb molta coordinació manual.",
          role: "UX/UI, frontend i estructura funcional del producte.",
        },
        {
          ...sharedProjects[4],
          category: "web associativa",
          shortDescription: "Renovació web per a una associació contra el càncer de mama, amb una experiència més interactiva i accessible.",
          summary: "Una proposta més sensible i visual per a una associació, intentant equilibrar calidesa, accessibilitat i millor narrativa web.",
          problem: "La web necessitava una experiència més humana, més clara i millor pensada per a comunicar recursos i activitat.",
          role: "Disseny visual, arquitectura de contingut i frontend.",
        },
        {
          ...sharedProjects[5],
          category: "curriculum web",
          shortDescription: "El meu portfolio anterior, on vaig començar a reunir projectes, experiència i una primera manera de contar el que faig.",
          summary: "La versió anterior del meu portfolio, útil com a arxiu de procés i com a punt de partida per a esta nova etapa.",
          problem: "Volia reunir en un lloc únic els meus projectes, experiència i primeres proves d'identitat professional.",
          role: "Concepte, contingut, disseny i desenvolupament.",
        },
      ],
    },
    stack: {
      kicker: "/stack i ferramentes",
      title: "amb què solc treballar.",
      body: "Disseny, frontend, backend i IA aplicada. Més que una llista tancada, és una manera d'ensenyar com solc muntar les coses quan vull portar una idea a producte.",
      items: [
        { title: "Disseny", body: "Figma, Figma Jam, Canva i Miro per a pensar fluxos, sistemes i presentacions amb una intenció visual bastant clara.", meta: "ux/ui · visual", initials: "UX", tools: ["Figma", "Canva", "Miro"] },
        { title: "Frontend", body: "TypeScript, Angular, Ionic i HTML/CSS per a construir interfícies amb cura pel detall, el ritme i el comportament.", meta: "web · apps", initials: "FE", tools: ["TypeScript", "Angular", "Ionic"] },
        { title: "Backend", body: "Node.js, Express, Symfony, PHP i bases de dades per a sostindre productes complets quan cal tancar també la part tècnica.", meta: "api · dades", initials: "BE", tools: ["Node.js", "Symfony", "PHP"] },
        { title: "Sistemes", body: "Components, patrons i documentació per a ordenar el caos quan un producte comença a créixer de veritat.", meta: "design systems", initials: "DS", tools: ["Tokens", "Components", "Documentació"] },
        { title: "IA aplicada", body: "Automatitzacions, prototips ràpids i formes d'integrar IA en el procés sense perdre criteri ni control del resultat.", meta: "ai · fluxos", initials: "IA", tools: ["Automatització", "Prototips", "Prompts"] },
        { title: "Apps pròpies", body: "Projectes personals per a provar idees, equivocar-me ràpid i llançar coses encara que continuen evolucionant.", meta: "side projects", initials: "AP", tools: ["Producte", "Idea", "Llançament"] },
      ],
    },
    about: {
      kicker: "/sobre mi",
      title: "una manera de construir.",
      intro: "Soc Jesús García. M'agrada moure'm entre frontend, disseny i producte, sobretot quan una idea necessita passar d'esbós a una cosa usable i amb criteri visual.",
      meta: "He anat barrejant desenvolupament, interfícies, apps i experiments propis fins acabar en un punt prou híbrid: m'interessa tant com es veu una cosa com com es munta per dins.",
      note: "Ara mateix em tira especialment crear productes web, provar idees ràpid i usar IA aplicada com una ferramenta més del procés, no com a drecera.",
      highlights: [
        {
          label: "El que faig",
          title: "Frontend amb intenció visual",
          body: "M'interessa que una interfície funcione bé, però també que tinga ritme, jerarquia i una presència pròpia.",
        },
        {
          label: "Com treballe",
          title: "Disseny, codi i producte junts",
          body: "Solc pensar les peces alhora: experiència, implementació i decisions de producte, per a no separar massa unes de les altres.",
        },
        {
          label: "Ara mateix",
          title: "Apps, webs i xicotetes automatitzacions",
          body: "Estic còmode construint producte digital i explorant IA aplicada quan ajuda a accelerar sense buidar el criteri.",
        },
      ],
      panelTitle: "Disseny, codi i producte en el mateix lloc.",
      panelBody: "M'interessa construir interfícies amb intenció, però també que el que hi ha baix siga mantenible, útil i tinga sentit quan el projecte creix.",
      links: [
        { label: "Perfil", type: "GitHub", title: "Repositoris, proves i projectes publicats" },
        { label: "CV", type: "Curriculum", title: "Recorregut, ferramentes i formació" },
        { label: "Apps", type: "Producte", title: "Idees pròpies portades a web i mòbil" },
        { label: "Contacte", type: "Col·laboració", title: "Disponible per a projectes i propostes noves" },
      ],
    },
    footer: {
      wordmark: "jgarcia3199/portfolio",
      copy: "© 2026 Jesús García Alemany. València, Espanya. Tots els drets reservats.",
      contactKicker: "/contacte",
      contactTitle: "Disponible per a producte, frontend i projectes amb una mica d'intenció.",
      contactBody: "Si la idea necessita barreja de disseny, codi i criteri visual, probablement m'interesse parlar-la.",
      social: { github: "GitHub", linkedin: "LinkedIn", email: "Email" },
    },
  },
};
