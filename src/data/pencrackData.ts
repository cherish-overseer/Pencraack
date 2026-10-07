export interface Writer {
  id: number;
  n: string;
  u: string;
  img: string;
  bio?: string;
  followers?: string;
  worksCount?: number;
  supportedAmt?: string;
}

export interface Story {
  id: string;
  t: string;
  e: string;
  c: string;
  rt: string;
  reads: string;
  likes: string;
  w: number;
  i: number;
  d?: string;
}

export interface Blog {
  id: string;
  t: string;
  e: string;
  c: string;
  rt: string;
  reads: string;
  likes: string;
  w: number;
  i: number;
  d: string;
}

export interface Poem {
  id: string;
  t: string;
  v: string;
  w: number;
  likes: string;
  reads: string;
  d: string;
}

export interface Comic {
  id: string;
  t: string;
  e: string;
  c: string;
  w: number;
  i: number;
  likes: string;
  reads: string;
}

export interface ServiceItem {
  name: string;
  desc: string;
  category: "creative" | "academic";
  turnaround?: string;
  price?: string;
  included?: string[];
  deliverables?: string[];
}

const IMG = [
  'photo-1455390582262-044cdead277a',
  'photo-1532012197267-da84d127e765',
  'photo-1513001900722-370f803f498d',
  'photo-1507842217343-583bb7270b66',
  'photo-1544716278-ca5e3f4abd8c',
  'photo-1519682337058-a94d519337bc',
  'photo-1491841550275-ad7854e35ca1',
  'photo-1456513080510-7bf3a84b82f8',
  'photo-1526304640581-d334cdbbf45e',
  'photo-1543002588-bfa74002ed7e'
];

export const getImgUrl = (index: number, width = 600) =>
  `https://images.unsplash.com/${IMG[index % IMG.length]}?w=${width}&q=75`;

export const WRITERS: Writer[] = [
  {
    id: 0,
    n: "Adaeze Nwosu",
    u: "@adaeze.writes",
    img: "https://i.pravatar.cc/120?img=32",
    bio: "Lagos-based storyteller writing about love, memory and home. 24 published works.",
    followers: "12.4k",
    worksCount: 24,
    supportedAmt: "₦1.2M",
  },
  {
    id: 1,
    n: "Tunde Okafor",
    u: "@tunde.o",
    img: "https://i.pravatar.cc/120?img=12",
    bio: "Poet and cultural essayist documenting African contemporary narratives.",
    followers: "8.9k",
    worksCount: 19,
    supportedAmt: "₦850k",
  },
  {
    id: 2,
    n: "Zainab Bello",
    u: "@zee.writes",
    img: "https://i.pravatar.cc/120?img=45",
    bio: "Historical fiction writer exploring pre-colonial empires and mythology.",
    followers: "15.2k",
    worksCount: 31,
    supportedAmt: "₦1.8M",
  },
  {
    id: 3,
    n: "Chidi Eze",
    u: "@chidi",
    img: "https://i.pravatar.cc/120?img=60",
    bio: "Comic scriptwriter and speculative fiction creator.",
    followers: "6.7k",
    worksCount: 14,
    supportedAmt: "₦620k",
  },
  {
    id: 4,
    n: "Ngozi Ade",
    u: "@ngozi",
    img: "https://i.pravatar.cc/120?img=26",
    bio: "Literary fiction author and workshop mentor for young African writers.",
    followers: "11.1k",
    worksCount: 22,
    supportedAmt: "₦940k",
  },
  {
    id: 5,
    n: "Kwame Mensah",
    u: "@kwame",
    img: "https://i.pravatar.cc/120?img=14",
    bio: "Tech essayist and travel journalist covering emerging Africa.",
    followers: "9.5k",
    worksCount: 17,
    supportedAmt: "₦780k",
  },
];

export const STORIES: Story[] = [
  {
    id: "s1",
    t: "The Harmattan Letters",
    e: "A love written entirely on paper, across one long dry season in Lagos.",
    c: "Romance",
    rt: "8 min",
    reads: "182k",
    likes: "12.4k",
    w: 0,
    i: 0,
    d: "Oct 2, 2026",
  },
  {
    id: "s2",
    t: "Where the River Bends",
    e: "A fishing village keeps a secret the tide refuses to bury.",
    c: "Mystery",
    rt: "12 min",
    reads: "96k",
    likes: "7.1k",
    w: 3,
    i: 1,
    d: "Oct 1, 2026",
  },
  {
    id: "s3",
    t: "Ashes of Oyo",
    e: "An empire falls, and a girl inherits more than she bargained for.",
    c: "Fantasy",
    rt: "15 min",
    reads: "140k",
    likes: "9.8k",
    w: 2,
    i: 5,
    d: "Sep 28, 2026",
  },
  {
    id: "s4",
    t: "Night Bus to Kano",
    e: "Strangers on a long journey discover they share one impossible memory.",
    c: "Thriller",
    rt: "10 min",
    reads: "77k",
    likes: "5.4k",
    w: 1,
    i: 3,
    d: "Sep 24, 2026",
  },
  {
    id: "s5",
    t: "The Tailor’s Daughter",
    e: "Every dress she sews stitches a wish — until one comes true.",
    c: "Drama",
    rt: "9 min",
    reads: "63k",
    likes: "4.9k",
    w: 4,
    i: 6,
    d: "Sep 20, 2026",
  },
  {
    id: "s6",
    t: "Beyond the Baobab",
    e: "Two cousins set off to find a tree that only grows in dreams.",
    c: "Adventure",
    rt: "11 min",
    reads: "54k",
    likes: "3.7k",
    w: 5,
    i: 7,
    d: "Sep 15, 2026",
  },
];

export const BLOGS: Blog[] = [
  {
    id: "b1",
    t: "Why African Startups Are Building for Offline-First",
    e: "Connectivity shapes product design more than we admit. Here’s how.",
    c: "Technology",
    rt: "6 min",
    reads: "44k",
    likes: "2.1k",
    w: 1,
    i: 1,
    d: "Oct 4, 2026",
  },
  {
    id: "b2",
    t: "The Quiet Power of Writing Every Morning",
    e: "A simple ritual that rewired how I think, work and create.",
    c: "Personal Development",
    rt: "5 min",
    reads: "38k",
    likes: "3.3k",
    w: 0,
    i: 3,
    d: "Oct 3, 2026",
  },
  {
    id: "b3",
    t: "Building a Brand People Actually Trust",
    e: "Trust is slow to earn and fast to lose. A founder’s playbook.",
    c: "Business",
    rt: "7 min",
    reads: "29k",
    likes: "1.8k",
    w: 3,
    i: 4,
    d: "Oct 1, 2026",
  },
  {
    id: "b4",
    t: "What Lagos Taught Me About Resilience",
    e: "Lessons from a city that never stops moving.",
    c: "Culture",
    rt: "8 min",
    reads: "51k",
    likes: "4.2k",
    w: 2,
    i: 6,
    d: "Sep 29, 2026",
  },
  {
    id: "b5",
    t: "The Future of Remote Work in Africa",
    e: "Talent is everywhere. Opportunity is finally catching up.",
    c: "Career",
    rt: "6 min",
    reads: "22k",
    likes: "1.4k",
    w: 4,
    i: 7,
    d: "Sep 27, 2026",
  },
  {
    id: "b6",
    t: "A Minimalist’s Guide to a Full Life",
    e: "Less stuff, more meaning. How I rebuilt my days.",
    c: "Lifestyle",
    rt: "5 min",
    reads: "34k",
    likes: "2.9k",
    w: 5,
    i: 9,
    d: "Sep 25, 2026",
  },
];

export const POEMS: Poem[] = [
  {
    id: "p1",
    t: "Lagos at Dawn",
    v: "Before the danfos wake,\nthe city holds its breath —\na held note, a prayer\nthe morning cannot keep.",
    w: 1,
    likes: "3.4k",
    reads: "21k",
    d: "Oct 5, 2026",
  },
  {
    id: "p2",
    t: "Harmattan Skin",
    v: "The wind writes its name\nin cracks across my palms,\nand I learn again\nhow dryness, too, is love.",
    w: 0,
    likes: "5.1k",
    reads: "29k",
    d: "Oct 2, 2026",
  },
  {
    id: "p3",
    t: "Letters I Never Sent",
    v: "They live in a drawer\nwith the smell of old ink —\nevery word a door\nI was too afraid to open.",
    w: 2,
    likes: "2.7k",
    reads: "15k",
    d: "Sep 30, 2026",
  },
  {
    id: "p4",
    t: "Market Woman",
    v: "She counts the day in naira\nand in small mercies:\na sold basket, a cool breeze,\nher children’s laughter.",
    w: 4,
    likes: "4.3k",
    reads: "24k",
    d: "Sep 28, 2026",
  },
];

export const COMICS: Comic[] = [
  {
    id: "c1",
    t: "Ink & Iron",
    e: "A blacksmith’s apprentice forges a sword that remembers every hand that held it.",
    c: "Fantasy",
    w: 3,
    i: 8,
    likes: "8.2k",
    reads: "61k",
  },
  {
    id: "c2",
    t: "Neon Harmattan",
    e: "Cyberpunk Lagos, 2099. A courier carries a package that could rewrite the city.",
    c: "Sci-Fi",
    w: 1,
    i: 4,
    likes: "11.4k",
    reads: "88k",
  },
  {
    id: "c3",
    t: "The Masquerade",
    e: "Behind every festival mask hides a story the village forgot on purpose.",
    c: "Mystery",
    w: 2,
    i: 5,
    likes: "6.7k",
    reads: "47k",
  },
  {
    id: "c4",
    t: "Schoolyard Spirits",
    e: "Three friends can see the ghosts that haunt their boarding school — and the ghosts need help.",
    c: "Comedy",
    w: 4,
    i: 6,
    likes: "5.1k",
    reads: "39k",
  },
];

export const SERVICES_CREATIVE: ServiceItem[] = [
  {
    name: "Copywriting",
    desc: "Persuasive copy for brands, ads and landing pages.",
    category: "creative",
    turnaround: "3–5 days",
    price: "From ₦25,000",
  },
  {
    name: "Editing",
    desc: "Sharpen clarity, flow and tone in your manuscript.",
    category: "creative",
    turnaround: "4–7 days",
    price: "From ₦30,000",
  },
  {
    name: "Poetry",
    desc: "Custom verse for occasions, brands or publication.",
    category: "creative",
    turnaround: "2–4 days",
    price: "From ₦15,000",
  },
  {
    name: "Technical Writing",
    desc: "Clear docs, manuals and API guides.",
    category: "creative",
    turnaround: "5–8 days",
    price: "From ₦45,000",
  },
  {
    name: "Grant Writing",
    desc: "Compelling proposals that win funding.",
    category: "creative",
    turnaround: "7–10 days",
    price: "From ₦60,000",
  },
  {
    name: "Scriptwriting",
    desc: "Scripts for film, video and audio productions.",
    category: "creative",
    turnaround: "5–10 days",
    price: "From ₦50,000",
  },
  {
    name: "Newsletter",
    desc: "Engaging email content your readers open.",
    category: "creative",
    turnaround: "2–3 days",
    price: "From ₦20,000",
  },
  {
    name: "Proofreading",
    desc: "Final polish — grammar, spelling, punctuation.",
    category: "creative",
    turnaround: "2–4 days",
    price: "From ₦15,000",
  },
];

export const SERVICES_ACADEMIC: ServiceItem[] = [
  {
    name: "Thesis Support",
    desc: "Structure, editing and research guidance.",
    category: "academic",
    turnaround: "7–14 days",
    price: "From ₦75,000",
  },
  {
    name: "White Papers",
    desc: "Authoritative, research-backed long-form reports.",
    category: "academic",
    turnaround: "7–12 days",
    price: "From ₦65,000",
  },
  {
    name: "UX Writing",
    desc: "Microcopy that guides and converts users.",
    category: "academic",
    turnaround: "3–5 days",
    price: "From ₦35,000",
  },
  {
    name: "Content Strategy",
    desc: "Plans that align content architecture with goals.",
    category: "academic",
    turnaround: "5–7 days",
    price: "From ₦50,000",
  },
  {
    name: "Transcreation",
    desc: "Creative translation that keeps meaning & nuance.",
    category: "academic",
    turnaround: "3–6 days",
    price: "From ₦30,000",
  },
  {
    name: "Speech Writing",
    desc: "Memorable speeches for any podium or stage.",
    category: "academic",
    turnaround: "3–5 days",
    price: "From ₦40,000",
  },
  {
    name: "Resume Design",
    desc: "Standout executive CVs and cover letters.",
    category: "academic",
    turnaround: "2–3 days",
    price: "From ₦20,000",
  },
  {
    name: "Press Releases",
    desc: "Newsworthy media announcements that land coverage.",
    category: "academic",
    turnaround: "2–4 days",
    price: "From ₦25,000",
  },
];
