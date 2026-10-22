// Everything on the site comes from this file. Edit here, not in the components.

export const person = {
  name: 'Oliver Wong',
  initials: 'OW',
  role: 'Cyber security student',
  email: 'olliewong101@gmail.com',
  github: 'https://github.com/Wongers432',
  linkedin: 'https://www.linkedin.com/in/oliver-wong-315736402',
  lastUpdated: 'Oct 2026',
  location: 'Bournemouth and Oxford, UK',
  cvPdf: '/cv/Oliver_Wong_CV.pdf',
  cvDocx: '/cv/Oliver_Wong_CV.docx',
  facts: [
    { k: 'Studying', v: 'BSc Computer Science (Cyber Security), Oxford Brookes' },
    { k: 'Based', v: 'Bournemouth and Oxford, UK' },
    { k: 'Certified', v: 'Google IT Automation with Python' },
  ],
  about:
    'I am a Computer Science (Cyber Security) student at Oxford Brookes University, on a four-year degree with an industry placement year. I have hands-on experience finding and closing vulnerabilities, most recently pen-testing a pre-launch campaign page during an e-commerce internship at Miral in Abu Dhabi. Outside my course I build and ship my own web apps, take hardware apart to understand it, and help people get more confident with technology.',
};

export type Place = { name: string; lat: number; lon: number; tag: string; label?: boolean };

// The first place is home; dashed routes are drawn from it to every place with a tag other than ''.
export const places: Place[] = [
  { name: 'Bournemouth', lat: 50.72, lon: -1.88, tag: 'home' },
  { name: 'Oxford', lat: 51.75, lon: -1.26, tag: '', label: false },
  { name: 'Abu Dhabi', lat: 24.45, lon: 54.38, tag: 'internship' },
  { name: 'Canada', lat: 51.05, lon: -114.07, tag: 'road trips' },
  { name: 'Scotland', lat: 56.49, lon: -4.2, tag: 'road trips' },
  { name: 'China', lat: 30.57, lon: 104.07, tag: 'backpacking' },
  { name: 'Hong Kong', lat: 22.32, lon: 114.17, tag: 'backpacking' },
  { name: 'Paris', lat: 48.86, lon: 2.35, tag: 'holiday' },
  { name: 'Belgium', lat: 50.85, lon: 4.35, tag: 'holiday' },
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
  facts: { k: string; v: string }[];
  story: { heading: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: 'skyblock-dungeons',
    kind: 'game',
    name: 'SkyBlock Dungeons',
    summary:
      "A single-player, offline 2D take on Hypixel SkyBlock's Catacombs for iPhone. Random dungeons, puzzles, secrets and seven bosses from Bonzo to the Wither Lords.",
    tags: ['TypeScript', 'Vite PWA', 'Vitest'],
    repo: 'https://github.com/Wongers432/skyblock-dungeons',
    liveUrl: 'https://skyblock-dungeons.vercel.app/',
    demoUrl: 'https://skyblock-dungeons.vercel.app/',
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
    liveUrl: 'https://gt-sigma-ten.vercel.app/',
    demoUrl: 'https://gt-sigma-ten.vercel.app/',
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

export type Entry = {
  when: string;
  where?: string;
  title: string;
  role: string;
  points?: string[];
  current?: boolean;
};

export const experience: Entry[] = [
  {
    when: 'Summer 2026',
    where: 'Abu Dhabi, UAE',
    title: 'Miral',
    role: 'E-Commerce Intern · the group behind Ferrari World, SeaWorld Abu Dhabi, Yas Waterworld, Warner Bros. World and teamLab',
    points: [
      'Penetration-tested a pre-launch campaign page. Used nmap and network analysis tools to identify where the page sent its payloads, then intercepted and replayed those requests at volume to test how the endpoint handled abuse.',
      'Reported the vulnerabilities found to the team ahead of launch.',
      'Produced a competitor benchmarking presentation and presented it to the Senior Director of E-Commerce.',
      'Adapted quickly to a fast-paced international office, building commercial awareness and professional communication.',
    ],
  },
  {
    when: '2022 – 2025',
    where: 'Poole, UK',
    title: 'Absolute Music',
    role: 'Sales Assistant',
    points: [
      'Supported retail and stock management systems, with a focus on data accuracy and system integrity.',
      'Handled technical product queries, explaining complex information clearly.',
    ],
  },
  {
    when: '2023 – 2025',
    title: 'Commercial cleaning company',
    role: 'Cleaning Operative',
    points: ['Worked independently to tight deadlines, solving problems on the spot.'],
  },
];

export const education: Entry[] = [
  {
    when: 'Sept 2026 – present',
    where: 'Oxford, UK',
    title: 'Oxford Brookes University',
    role: 'BSc Computer Science (Cyber Security) · four years including an industry placement year',
    current: true,
  },
  {
    when: '2024 – 2026',
    where: 'Brockenhurst, UK',
    title: 'Brockenhurst College',
    role: 'A-Levels · Computer Science, Business, Music Technology (Distinction*)',
    points: ['Key project: a C# database module with hashed passwords and SQL injection prevention, designed as a real security solution.'],
  },
  {
    when: '2021 – 2023',
    where: 'Bournemouth, UK',
    title: 'LeAF Studio School',
    role: 'GCSEs · eight subjects including Maths (7), English and Science · Music Technology (Distinction*)',
  },
];

export const skills = [
  { group: 'Cyber security', items: ['Penetration testing', 'Vulnerability analysis', 'Password hashing', 'SQL injection prevention', 'Ethical hacking principles'] },
  { group: 'Languages', items: ['Python', 'C#', 'JavaScript', 'TypeScript', 'HTML and CSS', 'SQL'] },
  { group: 'Tools and hardware', items: ['Kali Linux', 'Command line', 'Git', 'PC and laptop disassembly', 'Diagnostics'] },
  { group: 'Certification', items: ['Google IT Automation with Python'] },
];

export const beyond = [
  { title: 'Travel', text: 'Backpacking in mainland China and Hong Kong, road trips across Canada and Scotland, and holidays in Paris and Belgium.' },
  { title: 'Animal-care programme, China', text: 'Selected for a competitive placement.' },
  { title: 'Bournemouth Writing Festival', text: 'Runner for two consecutive years.' },
  { title: 'Foodbank hamper appeal', text: 'Helped plan and distribute goods to the community.' },
  { title: 'Music', text: 'Grade 5 piano, self-taught guitar, Distinction* in Music Technology.' },
];
