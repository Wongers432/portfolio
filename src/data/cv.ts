// Everything on the site comes from this file. Edit here, not in the components.

export const person = {
  name: 'Oliver Wong',
  initials: 'OW',
  email: 'olliewong101@gmail.com',
  github: 'https://github.com/Wongers432',
  linkedin: 'https://www.linkedin.com/in/oliver-wong-315736402',
  lastUpdated: 'Oct 2026',
  chips: ['Class: Cyber Security', 'Guild: Oxford Brookes', 'Spawn: Bournemouth'],
  // value is 0–100, the width of the bar
  bars: [
    { label: 'Degree', value: 25, note: 'year 1 of 4' },
    { label: 'Solo trips', value: 100, note: '4 countries' },
    { label: 'Apps built', value: 100, note: '2 on iPhone' },
  ],
  currentQuest:
    'BSc Computer Science (Cyber Security) at Oxford Brookes, with a placement year. I already have real pen-testing experience from an internship in Abu Dhabi, and I spend my spare time building games and gym apps and taking laptops apart.',
};

export type Place = { name: string; lat: number; lon: number; tag: string; label?: boolean };

// The first place is home; dashed routes are drawn from it to every place with a tag other than ''.
export const places: Place[] = [
  { name: 'Bournemouth', lat: 50.72, lon: -1.88, tag: 'home' },
  { name: 'Oxford', lat: 51.75, lon: -1.26, tag: '', label: false },
  { name: 'Abu Dhabi', lat: 24.45, lon: 54.38, tag: 'internship' },
  { name: 'Canada', lat: 51.05, lon: -114.07, tag: 'solo' },
  { name: 'Scotland', lat: 56.49, lon: -4.2, tag: 'solo' },
  { name: 'China', lat: 30.57, lon: 104.07, tag: 'solo' },
];

export type Project = {
  slug: string;
  kind: string;
  name: string;
  summary: string;
  tags: string[];
  repo: string;
  // Set these once each app is deployed (for example https://play.yourdomain.dev).
  liveUrl: string | null;
  // URL loaded in the "Try it here" frame. Usually liveUrl plus a demo flag.
  demoUrl: string | null;
  startLabel: string;
  facts: { k: string; v: string }[];
  story: { heading: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: 'skyblock-dungeons',
    kind: 'game',
    name: 'SkyBlock Dungeons',
    summary:
      "A solo, offline 2D take on Hypixel SkyBlock's Catacombs for iPhone. Random dungeons, puzzles, secrets and seven bosses from Bonzo to the Wither Lords.",
    tags: ['TypeScript', 'Vite PWA', 'Vitest'],
    repo: 'https://github.com/Wongers432/skyblock-dungeons',
    liveUrl: null,
    demoUrl: null,
    startLabel: 'Press start',
    facts: [
      { k: 'Stack', v: 'TypeScript, Vite, vite-plugin-pwa, Vitest' },
      { k: 'Scope', v: 'Floors 1–7, seven bosses, Master Mode M1–M7' },
      { k: 'Plays', v: 'Touch, fully offline, installable' },
    ],
    story: [
      {
        heading: 'What it is',
        body: 'A randomly generated dungeon every run, built from hand-made room layouts. Clear rooms, find secrets, solve puzzles (Tic Tac Toe, Higher or Lower, Three Weirdos), rush the Wither Doors to the Blood Room, then fight the floor boss.',
      },
      {
        heading: 'The bosses',
        body: 'Each floor has its own mechanic: Bonzo pops balloons, Scarf has a Priest that revives his minions, Thorn only takes damage from the Spirit Bow, Livid hides among seven fakes, Sadan brings four Giants, and Floor 7 runs through all four Wither Lords.',
      },
      {
        heading: 'Why I built it',
        body: 'I wanted to play Catacombs on my phone with no signal, so I rebuilt it as an installable web app.',
      },
    ],
  },
  {
    slug: 'liftboard',
    kind: 'gym tracker',
    name: 'Liftboard',
    summary:
      'A gym tracker that installs to the home screen and works with no signal. Log maxes for 58 exercises and climb from Bronze to Champion.',
    tags: ['Vanilla JS', 'Chart.js', 'Offline-first'],
    repo: 'https://github.com/Wongers432/liftboard',
    liveUrl: null,
    demoUrl: null,
    startLabel: 'Load save',
    facts: [
      { k: 'Stack', v: 'HTML, CSS, JavaScript, Chart.js, service worker' },
      { k: 'Scope', v: '58 exercises, 6 rank tiers, progress graphs' },
      { k: 'Data', v: 'Stays on the phone. No server, no accounts.' },
    ],
    story: [
      {
        heading: 'What it is',
        body: 'Log a max and your sets for 58 common exercises, earn a rank from Bronze to Champion based on strength standards, and watch progress in graphs and a training calendar.',
      },
      {
        heading: 'Private by design',
        body: 'There is no backend. Everything is saved in local storage on the phone, with export and import so nothing is lost.',
      },
      {
        heading: 'No build step',
        body: 'Plain HTML, CSS and JavaScript modules, with a service worker that caches every file so it still works with no signal.',
      },
    ],
  },
];

export type Quest = {
  type: 'Main quest' | 'Now' | 'Side quest';
  when: string;
  coords: string;
  title: string;
  role: string;
  points?: string[];
  reward?: string;
};

export const quests: Quest[] = [
  {
    type: 'Main quest',
    when: 'Summer 2026',
    coords: '24.45°N 54.38°E',
    title: 'Miral, Abu Dhabi',
    role: 'E-Commerce Intern · Ferrari World, SeaWorld, Yas Waterworld, Warner Bros. World, teamLab',
    points: [
      'Pen-tested the upcoming Harry Potter countdown page and helped find vulnerabilities before launch.',
      'Presented a competitor benchmark to the Senior Director of E-Commerce.',
      'Travelled out alone for the two-week placement.',
    ],
    reward: '+ real-world security XP',
  },
  {
    type: 'Now',
    when: 'Sept 2026 –',
    coords: '51.75°N 1.26°W',
    title: 'Oxford Brookes University',
    role: 'BSc Computer Science (Cyber Security) · four years with a placement year',
  },
  {
    type: 'Side quest',
    when: '2024 – 2026',
    coords: '50.82°N 1.57°W',
    title: 'Brockenhurst College',
    role: 'A-Levels · Computer Science, Business, Music Technology (Distinction*)',
    points: ['Built a C# database module with hashed passwords and SQL injection prevention.'],
  },
  {
    type: 'Side quest',
    when: '2022 – 2025',
    coords: '50.72°N 1.98°W',
    title: 'Absolute Music, Poole',
    role: 'Sales Assistant · stock systems, technical product questions, one-to-one computer help',
  },
];

export const achievements = [
  { icon: '✈', title: 'Lone Wanderer', text: 'Solo backpacking across Canada, Scotland and mainland China.' },
  { icon: '✓', title: 'Before Launch', text: "Found vulnerabilities in a live brand's page before it shipped." },
  { icon: 'Py', title: 'Certified', text: 'Google IT Automation with Python.' },
  { icon: '♪', title: 'Distinction*', text: 'Music Technology, twice. Grade 5 piano.' },
  { icon: 'CN', title: 'Selected', text: 'Competitive animal-care programme in China.' },
  { icon: '★', title: 'Volunteer', text: 'Writing Festival runner two years running, foodbank hamper appeal.' },
];

// hi: true gives the slot the ink border and shadow.
export const inventory = [
  { name: 'Kali Linux', note: 'Offence', hi: true },
  { name: 'Python', note: 'Certified', hi: true },
  { name: 'C#', note: 'Secure DB', hi: true },
  { name: 'TypeScript', note: 'Game' },
  { name: 'JavaScript', note: 'Liftboard' },
  { name: 'SQL', note: 'Injection-safe' },
  { name: 'HTML/CSS', note: 'Front end' },
  { name: 'CLI', note: 'Daily' },
  { name: 'Screwdriver', note: 'Hardware' },
];
