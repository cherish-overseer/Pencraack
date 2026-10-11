export interface CatalogService {
  name: string;
  slug: string;
  category: "CREATIVE" | "ACADEMIC";
  shortDesc: string;
  fullDesc: string;
  startingPrice: number;
  turnaroundTime: string;
  guarantee: string;
  fields: {
    fieldKey: string;
    fieldLabel: string;
    fieldType: "TEXT" | "TEXTAREA" | "NUMBER" | "SELECT" | "FILE" | "DATE";
    isRequired: boolean;
    options?: string[];
  }[];
}

export const INITIAL_SERVICES: CatalogService[] = [
  // 1. Creative & Commercial
  {
    name: "Copywriting",
    slug: "copywriting",
    category: "CREATIVE",
    shortDesc: "Persuasive narrative construction designed to convert.",
    fullDesc: "High-converting landing page copy, sales letters, brand narratives, and promotional campaigns. We combine consumer psychology with crystalline prose.",
    startingPrice: 25000,
    turnaroundTime: "3–5 days",
    guarantee: "100% Original & Tone-Guaranteed",
    fields: [
      { fieldKey: "business_name", fieldLabel: "Business / Company Name", fieldType: "TEXT", isRequired: true },
      { fieldKey: "target_audience", fieldLabel: "Target Audience", fieldType: "TEXT", isRequired: true },
      { fieldKey: "tone_of_voice", fieldLabel: "Preferred Tone of Voice", fieldType: "TEXT", isRequired: false },
      { fieldKey: "word_count", fieldLabel: "Estimated Word Count Scope", fieldType: "NUMBER", isRequired: false },
    ],
  },
  {
    name: "Editing",
    slug: "editing",
    category: "CREATIVE",
    shortDesc: "Refining raw drafts into polished masterpieces.",
    fullDesc: "Comprehensive line editing, structural reorganization, and stylistic refinement while preserving your authorial voice.",
    startingPrice: 30000,
    turnaroundTime: "4–7 days",
    guarantee: "Journal & Publisher Ready",
    fields: [
      { fieldKey: "manuscript_genre", fieldLabel: "Genre or Field", fieldType: "TEXT", isRequired: true },
      { fieldKey: "editing_level", fieldLabel: "Editing Focus", fieldType: "SELECT", isRequired: true, options: ["Line Editing", "Structural / Developmental", "Copyediting"] },
      { fieldKey: "word_count", fieldLabel: "Total Manuscript Words", fieldType: "NUMBER", isRequired: true },
    ],
  },
  {
    name: "Poetry",
    slug: "poetry",
    category: "CREATIVE",
    shortDesc: "Custom verse for occasions, brands or publication.",
    fullDesc: "Original metric verse compositions, anthologies, and structural rhythm analysis.",
    startingPrice: 15000,
    turnaroundTime: "2–4 days",
    guarantee: "Unique Literary Composition",
    fields: [
      { fieldKey: "occasion_theme", fieldLabel: "Theme or Occasion", fieldType: "TEXT", isRequired: true },
      { fieldKey: "poetic_style", fieldLabel: "Preferred Style", fieldType: "SELECT", isRequired: false, options: ["Free Verse", "Rhymed / Sonnet", "Lyrical / Spoken Word"] },
    ],
  },
  {
    name: "Technical Writing",
    slug: "technical-writing",
    category: "CREATIVE",
    shortDesc: "Clear docs, manuals and API guides.",
    fullDesc: "Simplifying complex architecture into intuitive developer documentation, user manuals, and system guides.",
    startingPrice: 45000,
    turnaroundTime: "5–8 days",
    guarantee: "Accuracy & Clarity Certified",
    fields: [
      { fieldKey: "system_type", fieldLabel: "System / Tech Stack", fieldType: "TEXT", isRequired: true },
      { fieldKey: "doc_type", fieldLabel: "Documentation Type", fieldType: "SELECT", isRequired: true, options: ["API Docs", "User Guide", "System Architecture", "SDK Documentation"] },
      { fieldKey: "target_readers", fieldLabel: "Target Reader Level", fieldType: "SELECT", isRequired: true, options: ["Engineers / Developers", "End Users", "Executive Stakeholders"] },
    ],
  },
  {
    name: "Grant Writing",
    slug: "grant-writing",
    category: "CREATIVE",
    shortDesc: "Compelling proposals that win funding.",
    fullDesc: "High-stakes NGO proposals, institutional funding briefs, and reviewer criterion alignment.",
    startingPrice: 60000,
    turnaroundTime: "7–10 days",
    guarantee: "Grantor Guideline Compliant",
    fields: [
      { fieldKey: "grantor_name", fieldLabel: "Target Grantor / Organization", fieldType: "TEXT", isRequired: true },
      { fieldKey: "project_scope", fieldLabel: "Project Scope & Funding Amount", fieldType: "TEXT", isRequired: true },
    ],
  },
  {
    name: "Scriptwriting",
    slug: "scriptwriting",
    category: "CREATIVE",
    shortDesc: "Scripts for film, video and audio productions.",
    fullDesc: "Narrative screenplays in industry standard format with character breakdowns and dialogue polish.",
    startingPrice: 50000,
    turnaroundTime: "5–10 days",
    guarantee: "Industry Standard Format",
    fields: [
      { fieldKey: "medium", fieldLabel: "Production Medium", fieldType: "SELECT", isRequired: true, options: ["Short Film", "Feature Film", "Podcast / Audio Drama", "Commercial Video"] },
      { fieldKey: "target_duration", fieldLabel: "Target Duration (minutes)", fieldType: "NUMBER", isRequired: false },
    ],
  },
  {
    name: "Newsletter",
    slug: "newsletter",
    category: "CREATIVE",
    shortDesc: "Engaging email content your readers open.",
    fullDesc: "Serialized newsletter sequences, lead magnets, and promotional email blasts.",
    startingPrice: 20000,
    turnaroundTime: "2–3 days",
    guarantee: "High Open & Click Focus",
    fields: [
      { fieldKey: "audience_niche", fieldLabel: "Audience & Niche", fieldType: "TEXT", isRequired: true },
      { fieldKey: "issue_frequency", fieldLabel: "Delivery Frequency", fieldType: "SELECT", isRequired: false, options: ["Single Issue", "Weekly Series", "Automated Welcome Sequence"] },
    ],
  },
  {
    name: "Proofreading",
    slug: "proofreading",
    category: "CREATIVE",
    shortDesc: "Final polish — grammar, spelling, punctuation.",
    fullDesc: "The final line of defense against linguistic imperfection prior to printing or publication.",
    startingPrice: 15000,
    turnaroundTime: "2–4 days",
    guarantee: "Zero-Typo Quality Standard",
    fields: [
      { fieldKey: "document_type", fieldLabel: "Document Format", fieldType: "TEXT", isRequired: true },
      { fieldKey: "page_count", fieldLabel: "Total Page Count", fieldType: "NUMBER", isRequired: true },
    ],
  },

  // 2. Academic & Research
  {
    name: "Thesis Support",
    slug: "thesis-support",
    category: "ACADEMIC",
    shortDesc: "Structure, editing and research guidance.",
    fullDesc: "Linguistic and structural guidance for Master's and PhD candidates across all disciplines.",
    startingPrice: 75000,
    turnaroundTime: "7–14 days",
    guarantee: "100% Academic Integrity Guarantee",
    fields: [
      { fieldKey: "institution", fieldLabel: "University / Institution", fieldType: "TEXT", isRequired: true },
      { fieldKey: "degree_level", fieldLabel: "Academic Level", fieldType: "SELECT", isRequired: true, options: ["Doctoral (PhD)", "Master's (MSc/MA)", "Undergraduate (BSc/BA)"] },
      { fieldKey: "citation_style", fieldLabel: "Citation Style", fieldType: "SELECT", isRequired: true, options: ["APA 7th", "Chicago / Turabian", "MLA 9th", "IEEE", "Harvard"] },
      { fieldKey: "research_topic", fieldLabel: "Research Topic & Title", fieldType: "TEXT", isRequired: true },
    ],
  },
  {
    name: "White Papers",
    slug: "white-papers",
    category: "ACADEMIC",
    shortDesc: "Authoritative, research-backed long-form reports.",
    fullDesc: "Data-backed white papers and industry intelligence reports that position enterprises as authorities.",
    startingPrice: 65000,
    turnaroundTime: "7–12 days",
    guarantee: "Data & Source Verified",
    fields: [
      { fieldKey: "industry_vertical", fieldLabel: "Industry Vertical", fieldType: "TEXT", isRequired: true },
      { fieldKey: "business_objective", fieldLabel: "Core Objective", fieldType: "TEXT", isRequired: true },
    ],
  },
  {
    name: "UX Writing",
    slug: "ux-writing",
    category: "ACADEMIC",
    shortDesc: "Microcopy that guides and converts users.",
    fullDesc: "Intuitive product interface copy, button labels, and onboarding walkthroughs.",
    startingPrice: 35000,
    turnaroundTime: "3–5 days",
    guarantee: "Usability & Clarity Guaranteed",
    fields: [
      { fieldKey: "product_platform", fieldLabel: "Platform", fieldType: "SELECT", isRequired: true, options: ["Mobile App (iOS/Android)", "Web SaaS Application", "E-commerce Store"] },
      { fieldKey: "screen_count", fieldLabel: "Number of Screens / Flows", fieldType: "NUMBER", isRequired: false },
    ],
  },
  {
    name: "Content Strategy",
    slug: "content-strategy",
    category: "ACADEMIC",
    shortDesc: "Plans that align content architecture with goals.",
    fullDesc: "Topical authority maps, editorial calendars, and organic search content blueprints.",
    startingPrice: 50000,
    turnaroundTime: "5–7 days",
    guarantee: "Organic Growth Aligned",
    fields: [
      { fieldKey: "domain_niche", fieldLabel: "Website or Market Niche", fieldType: "TEXT", isRequired: true },
      { fieldKey: "strategy_horizon", fieldLabel: "Strategy Horizon", fieldType: "SELECT", isRequired: false, options: ["3 Months", "6 Months", "12 Months"] },
    ],
  },
  {
    name: "Transcreation",
    slug: "transcreation",
    category: "ACADEMIC",
    shortDesc: "Creative translation that keeps meaning & nuance.",
    fullDesc: "Cultural translation and localized voice adaptation that preserves humor, tone, and context.",
    startingPrice: 30000,
    turnaroundTime: "3–6 days",
    guarantee: "Cultural Accuracy Certified",
    fields: [
      { fieldKey: "source_language", fieldLabel: "Source Language", fieldType: "TEXT", isRequired: true },
      { fieldKey: "target_language", fieldLabel: "Target Language", fieldType: "TEXT", isRequired: true },
    ],
  },
  {
    name: "Speech Writing",
    slug: "speech-writing",
    category: "ACADEMIC",
    shortDesc: "Memorable speeches for any podium or stage.",
    fullDesc: "Keynotes, commencement addresses, and executive remarks with delivery cues and natural spoken cadence.",
    startingPrice: 40000,
    turnaroundTime: "3–5 days",
    guarantee: "Audience Impact Guaranteed",
    fields: [
      { fieldKey: "audience_event", fieldLabel: "Event & Audience Profile", fieldType: "TEXT", isRequired: true },
      { fieldKey: "delivery_time_mins", fieldLabel: "Target Speech Length (Minutes)", fieldType: "NUMBER", isRequired: true },
    ],
  },
  {
    name: "Resume Design",
    slug: "resume-design",
    category: "ACADEMIC",
    shortDesc: "Standout executive CVs and cover letters.",
    fullDesc: "ATS-optimized executive resumes, compelling career bios, and high-impact LinkedIn profiles.",
    startingPrice: 20000,
    turnaroundTime: "2–3 days",
    guarantee: "ATS & Recruiter Approved",
    fields: [
      { fieldKey: "target_role", fieldLabel: "Target Role / Job Title", fieldType: "TEXT", isRequired: true },
      { fieldKey: "career_level", fieldLabel: "Career Level", fieldType: "SELECT", isRequired: true, options: ["Entry Level", "Mid Level", "Senior / Manager", "Executive / C-Suite"] },
      { fieldKey: "industry", fieldLabel: "Industry", fieldType: "TEXT", isRequired: true },
    ],
  },
  {
    name: "Press Releases",
    slug: "press-releases",
    category: "ACADEMIC",
    shortDesc: "Newsworthy media announcements that land coverage.",
    fullDesc: "AP-style press releases that grab journalist attention with killer quotes and boilerplate text.",
    startingPrice: 25000,
    turnaroundTime: "2–4 days",
    guarantee: "AP-Style Compliant",
    fields: [
      { fieldKey: "announcement_type", fieldLabel: "Announcement Type", fieldType: "SELECT", isRequired: true, options: ["Product Launch", "Funding Round", "Partnership / Milestone", "Executive Appointment"] },
      { fieldKey: "target_publications", fieldLabel: "Target Media Outlets", fieldType: "TEXT", isRequired: false },
    ],
  },
];

export const SERVICES_CATALOG = INITIAL_SERVICES;
