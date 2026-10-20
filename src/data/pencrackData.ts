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
  body?: string[];
  subheading?: string;
  quote?: string;
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  quote?: string;
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
  sections?: BlogSection[];
}

export interface Poem {
  id: string;
  t: string;
  v: string;
  w: number;
  likes: string;
  reads: string;
  d: string;
  stanzas?: string[];
  poetNote?: string;
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
  issue?: string;
  synopsis?: string[];
  panels?: number[];
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
    subheading: "A Season of Waiting and Written Words",
    quote: "“Write to me as if the distance were nothing,” he had asked. And so she did, every evening, by lamplight.",
    body: [
      "The first letter arrived with the dry wind, its edges curled by heat and distance. She read it twice before the meaning settled — the way sand settles after a storm, slow and unarguable.",
      "In the compound, the old mango tree had already dropped its brittle leaves. Everything felt paused, waiting for a rain that the stubborn harmattan would not permit.",
      "She kept each envelope inside an embossed metal tin that once held Danish butter biscuits. Each missive was a small country she could visit when the nights stretched long and the street generator fell silent into the dark.",
      "At sunrise, the haze sat over the rooftops like parchment. She dipped her nib into blue Quink ink, answering every line as though breath itself were carried in cursive strokes across the miles.",
      "By the time the early rains finally broke the drought, the tin was overflowing, and so was she — of patience, of longing, and of a love that had learned to conquer silence."
    ]
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
    subheading: "The Secret Beneath the Mangroves",
    quote: "“The river forgets nothing, boy. It only waits for someone patient enough to listen.”",
    body: [
      "The elders in Okrika warned that whoever fished past the third bend after sunset was casting nets into another world.",
      "Barikpoa had laughed at the old wives' tales until the night his canoe drifted silently through the mangrove mist, and his lantern illuminated something that did not belong to the living.",
      "Submerged just beneath the emerald current lay an ancient brass canoe, intact and surrounded by schools of glowing silver fish that circled like silent mourners.",
      "When he touched the water above it, memories not his own flooded his mind: songs of ancestral wars, forgotten covenants, and the true reason the river had never run dry.",
      "Returning to shore before dawn, he knew he could never view the river with ordinary eyes again."
    ]
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
    subheading: "The Flame That Could Not Be Put Out",
    quote: "“An empire is not built of stone, but of the names we refuse to let die.”",
    body: [
      "The smoke from the palace courtyard smelled of charred cedar and spilled palm wine. Simi stood beside the broken colonnade, her fingers clutching the bronze torque her grandmother had worn during the coronation.",
      "Around her, the royal guards were preparing horses for the retreat into the hills. The northern riders had breached the outer ramparts before midnight.",
      "Yet Simi refused to mount. Hidden beneath the floor of the ancestral shrine was the ledger of royal bloodlines — the one thing the invaders sought to eradicate.",
      "She ran through the blazing corridors alone, smoke burning her eyes, determined that even if the city fell to embers, its true history would survive in her hands.",
      "When she emerged beyond the city gates into the dawn, the parchment was safe beneath her cloak. Oyo had fallen, but its memory was alive."
    ]
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
    subheading: "Synchronicity on the Open Highway",
    quote: "“Two strangers carrying one key can either unlock the past or leave the door shut forever.”",
    body: [
      "The luxury bus rattled along the potholed stretch of the Kaduna bypass, its headlights cutting jagged beams through the northern dust.",
      "Farida pulled her shawl closer, glancing across the aisle at the passenger in seat 14. He was looking at the exact same vintage photograph she held in her palm.",
      "It was a black-and-white print of a railway station dated 1984. Neither of them had been born then, yet both possessed original copies passed down with the same cryptic instruction: find the man on seat 14.",
      "As the bus pulled into the midnight terminal, the silence between them shattered into a revelation that changed everything they knew about their families.",
      "The journey had ended, but the investigation had only just begun."
    ]
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
    subheading: "The Alchemy of Thread and Wish",
    quote: "“Every thread holds tension; every stitch decides whether a seam will tear or endure.”",
    body: [
      "In the humming heart of Tejuosho market, her father’s antique Singer sewing machine sounded like a steady, comforting heartbeat.",
      "Amaka had learned to guide satin beneath the needle before she learned long division. But her stitches were different: she wove subtle, unspoken prayers into the hems of every wedding gown and graduation suit.",
      "People said wearing a dress from Master Eze’s daughter brought uncanny good fortune. Brides found unexpected peace; nervous scholars aced their interviews.",
      "Then one afternoon, a quiet stranger walked in wearing a faded coat, asking her to sew a garment that would help him find his way back home.",
      "Amaka measured him with care, knowing that some garments require more than cloth — they require forgiveness."
    ]
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
    subheading: "The Horizon of Forgotten Wonders",
    quote: "“We do not wander to find what was lost, but to discover who we become along the way.”",
    body: [
      "The legend said the celestial baobab appeared only to those who had lost something irreplaceable and possessed the courage to cross the red dunes.",
      "Kofi and his cousin Nnedi packed three water gourds, dried plantain chips, and a compass that spun erratically toward the setting sun.",
      "On the fifth day of the trek, as dusk turned the horizon violet, the colossal silhouette emerged against the sky — its branches glowing with faint bioluminescent fruit.",
      "Underneath its roots, the wind whispered answers to questions they had been too afraid to ask aloud.",
      "When they turned back toward the village, their hands were empty, but their spirits were complete."
    ]
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
    sections: [
      {
        heading: "The Reality of Intermittent Bandwidth",
        paragraphs: [
          "In tech hubs from Lagos to Nairobi, developers are rewriting the modern software playbook. While Silicon Valley builds for gigabit fiber-optic speeds and persistent WebSockets, African engineers design for erratic 3G connections, sudden data dropouts, and prepaid metering.",
          "Building offline-first is not a compromise — it is a profound competitive advantage. When an app synchronizes effortlessly in the background using local storage engines like SQLite or IndexedDB, users experience near-instant load times."
        ],
        quote: "“The best app isn't the one with the flashiest animations; it's the one that works when the cell tower goes silent.”"
      },
      {
        heading: "Architectural Principles of Resilient Software",
        paragraphs: [
          "First, prioritize optimistic UI updates. Allow users to tap 'Send Money' or 'Record Sale' immediately, queuing transactions locally with deterministic idempotency keys that resolve whenever network access returns.",
          "Second, aggressively compress assets. Vector SVGs over heavy raster imagery, dynamic font subsets, and payload budgets under 150KB make or break user retention when daily data costs are top-of-mind."
        ]
      },
      {
        heading: "Looking Ahead: The Global Export of Frugal Engineering",
        paragraphs: [
          "Products engineered under rigorous infrastructural constraints tend to be faster, lighter, and vastly more reliable anywhere in the world. African software architecture is quietly setting the standard for the next billion internet users."
        ]
      }
    ]
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
    sections: [
      {
        heading: "Before the World Begins Demanding Your Attention",
        paragraphs: [
          "For three years, my mornings began with notification triage: emails from across time zones, WhatsApp pings, and the ceaseless churn of headlines. I was reactive before my feet touched the floor.",
          "Switching to sixty minutes of unplugged morning writing was initially excruciating. The mind craves stimulation. But sitting with a blank notebook at 6 AM taught me how to hear my own voice again."
        ],
        quote: "“Writing in the morning is not about producing masterpieces; it is about clearing the windshield before you drive.”"
      },
      {
        heading: "The Compound Effect of Daily Pages",
        paragraphs: [
          "Writing just 400 words each morning amounts to nearly 150,000 words a year — enough for two full-length books or dozens of thoughtful essays.",
          "More importantly, it provides emotional grounding. Clarifying your thinking on paper eliminates decision fatigue and gives you an unshakeable sense of purpose."
        ]
      }
    ]
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
    sections: [
      {
        heading: "The Currency of Consistency",
        paragraphs: [
          "In an era where slick marketing can be generated in seconds, customers have developed finely tuned radar for inauthenticity. Flashy campaigns can win attention, but only consistent follow-through secures loyalty.",
          "Brand trust isn't built on taglines; it is forged across mundane operational moments: how you handle a delayed shipment, whether your support team speaks like humans, and how transparent you are when mistakes happen."
        ],
        quote: "“Trust is an accumulated reserve of kept promises.”"
      },
      {
        heading: "The 3 Pillars of Authentic Branding",
        paragraphs: [
          "1. Radical Transparency: Share the process, acknowledge the difficulties, and explain pricing with honesty.",
          "2. Community Respect: Treat early users not as conversion statistics, but as collaborators whose input directly shapes your product roadmap.",
          "3. Uncompromising Quality: Never ship a half-baked experience just to meet an artificial marketing deadline."
        ]
      }
    ]
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
    sections: [
      {
        heading: "The Electric Pulse of Lagos",
        paragraphs: [
          "To live in Lagos is to enter a masterclass in human adaptability. The traffic on Ikorodu road, the sudden afternoon cloudbursts, the spontaneous markets that flourish between car lanes — it requires a mindset that greets disruption with inventiveness.",
          "Here, plan B is not a backup; it is an instinct. When the power cuts, the hum of generators forms a chorus of determination. When transport stalls, people walk with heads held high."
        ],
        quote: "“Lagos doesn't wait for ideal conditions. It creates them out of willpower and grit.”"
      },
      {
        heading: "Tenacity as a Way of Life",
        paragraphs: [
          "The entrepreneurs selling bespoke leather shoes from roadside booths possess the same strategic tenacity as venture-backed founders. There is an unspoken rule in the city: keep moving, keep creating, and never let circumstance dictate your ceiling."
        ]
      }
    ]
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
    sections: [
      {
        heading: "Democratizing Global Opportunity",
        paragraphs: [
          "For decades, high-paying career trajectories required relocation to Western capitals or major metropolitan centers. Today, high-speed fiber and asynchronous collaboration platforms have leveled the playing field.",
          "Software architects, technical writers, and designers from Accra, Kigali, and Ibadan are leading teams at global enterprises while staying rooted in their home communities."
        ],
        quote: "“When geographic boundaries dissolve, merit and craft become the only borders that matter.”"
      },
      {
        heading: "Solving the Infrastructure Challenge",
        paragraphs: [
          "Remote work in emerging markets still requires deliberate investments: solar power backups, co-working spaces, and multi-network failovers. But the return on investment — keeping wealth and expertise local — is transforming entire economies."
        ]
      }
    ]
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
    sections: [
      {
        heading: "The Illusion of More",
        paragraphs: [
          "Consumer culture teaches us that peace is always one purchase away: a better device, a larger desk, a trendier wardrobe. Yet every item you acquire demands maintenance, attention, and mental space.",
          "Minimalism isn't about stark white walls or owning precisely thirty things. It is about the intentional elimination of the non-essential so that the essential can flourish."
        ],
        quote: "“Simplicity is not the lack of clutter; it is the presence of purpose.”"
      },
      {
        heading: "Designing a Lightweight Life",
        paragraphs: [
          "Start by decluttering your digital landscape: unsubscribing from noisy lists, silencing non-urgent notifications, and choosing physical books over endless algorithmic scrolling.",
          "When you reclaim your attention, you suddenly have time to read, converse deeply, and create work that matters."
        ]
      }
    ]
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
    poetNote: "Composed overlooking the Third Mainland Bridge in the golden half-hour before the city's millions rise.",
    stanzas: [
      "Before the yellow danfos wake,\nthe lagoon holds its breath —\na held note, a velvet prayer\nthe morning cannot keep.",
      "A fisherman casts silent twine\ninto the lavender grey,\nwhile distant church bells intertwine\nwith minarets far away.",
      "Here, survival is a psalm\nhummed through morning steam,\na city rising from the palm\nof an unbroken dream."
    ]
  },
  {
    id: "p2",
    t: "Harmattan Skin",
    v: "The wind writes its name\nin cracks across my palms,\nand I learn again\nhow dryness, too, is love.",
    w: 0,
    likes: "5.1k",
    reads: "29k",
    d: "Oct 2, 2026",
    poetNote: "A meditation on the northern desert wind that visits West Africa every winter, whitening skin and softening light.",
    stanzas: [
      "The desert wind writes its name\nin white cracks across my palms,\nand I remember once again\nhow dryness, too, is love.",
      "It strips the vanity of leaves,\nit pales the afternoon sky,\nand teaches everything that breathes\nhow to endure and sigh.",
      "Behind closed shutters, tea boils slow;\nwe rub shea butter on our hands,\ncontent that seasons come and go\nlike footprints in red sands."
    ]
  },
  {
    id: "p3",
    t: "Letters I Never Sent",
    v: "They live in a drawer\nwith the smell of old ink —\nevery word a door\nI was too afraid to open.",
    w: 2,
    likes: "2.7k",
    reads: "15k",
    d: "Sep 30, 2026",
    poetNote: "For every word unspoken that took deeper root than all the words that were ever said.",
    stanzas: [
      "They live inside a cedar drawer\nwith the scent of aged blue ink —\nevery folded sheet a door\nI stood beside to think.",
      "I wrote your name in margins wide,\nthen crossed it out in haste,\npreferring silence on my side\nto words laid out to waste.",
      "Now years have turned the pages gold,\nthe fire in them burns low,\nbut some quiet tales remain untold\nso love can gently glow."
    ]
  },
  {
    id: "p4",
    t: "Market Woman",
    v: "She counts the day in naira\nand in small mercies:\na sold basket, a cool breeze,\nher children’s laughter.",
    w: 4,
    likes: "4.3k",
    reads: "24k",
    d: "Sep 28, 2026",
    poetNote: "Dedicated to the mothers in Balogun and Tejuosho whose resilience sustains generations.",
    stanzas: [
      "She counts the hours not by clock\nbut by the shade of parasols,\ngreeting the morning trading flock\nwith songs the market knows.",
      "She counts the day in naira notes\nand in the small, sweet mercies won:\na sold basket of sweet peppers,\na sudden breeze, the setting sun.",
      "Her laughter rings above the crowd,\nher posture steady, straight and proud;\nher children learn from how she stands\nthat courage lives in working hands."
    ]
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
    issue: "Episode 1 · The Memory of Steel",
    panels: [8, 0, 1],
    synopsis: [
      "In the ancient kingdom of Ire, blacksmiths are not merely metalworkers — they are soul-weavers who bind oaths into tempered iron.",
      "Dayo is a seventeen-year-old apprentice who stumbles upon a cursed meteorite blade in his master’s locked crucible. When he touches the hilt, the memories of a legendary fallen warrior rush into his mind, thrusting him into a conflict that threatens both kingdoms."
    ]
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
    issue: "Episode 1 · High Altitude Drop",
    panels: [4, 5, 2],
    synopsis: [
      "Lagos, 2099. Megatowers reach past the clouds above the lagoon, while neon-lit hovercrafts dart through the perpetual dust of the cyber-harmattan.",
      "Jax, an augmented dispatch courier with cybernetic reflexes, takes on an off-the-books delivery from an anonymous patron. But when the bio-lock on the package flashes with royal government insignia, she realizes half the security forces in West Africa are tracking her signal."
    ]
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
    issue: "Episode 1 · The Sacred Grove",
    panels: [5, 6, 7],
    synopsis: [
      "Every fifty years, the village of Umunze hosts the Great Masquerade to appease the guardian spirits of the hills.",
      "When the prized ancestral mask vanishes on the eve of the festival, two estranged siblings must unravel centuries of suppressed village secrets before the guardian spirits wake in wrath."
    ]
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
    issue: "Episode 1 · Dormitory 4B",
    panels: [6, 8, 9],
    synopsis: [
      "Federal Government College, Okigwe has rules: lights out by 10 PM, morning prep at 6 AM, and never walk near the abandoned chemistry lab after dark.",
      "Tobi, Chioma, and Segun discover why when they accidentally awaken the spirit of a former 1970s head boy who refuses to move on until he finishes his WAEC chemistry practicals!"
    ]
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

export function getStoryById(id: string): Story | undefined {
  return STORIES.find((s) => s.id === id);
}

export function getBlogById(id: string): Blog | undefined {
  return BLOGS.find((b) => b.id === id);
}

export function getPoemById(id: string): Poem | undefined {
  return POEMS.find((p) => p.id === id);
}

export function getComicById(id: string): Comic | undefined {
  return COMICS.find((c) => c.id === id);
}
