"use client";

import { useState } from "react";
import { BookOpen, Search, Filter, Clock, Feather } from "lucide-react";

interface Poem {
  id: string;
  title: string;
  author: string;
  theme: string;
  readTime: string;
  excerpt: string;
  date: string;
}

const POEMS_DATA: Poem[] = [
  {
    id: "1",
    title: "Ode to the Unspoken Word",
    author: "Julian Vance",
    theme: "Philosophy & Art",
    readTime: "2 min read",
    excerpt: "Silence holds a heavier key than speech, unlocking doors that words can never reach...",
    date: "August 5, 2026",
  },
  {
    id: "2",
    title: "Whispers of Autumn Frost",
    author: "Clara Hawthorne",
    theme: "Nature & Seasons",
    readTime: "3 min read",
    excerpt: "Leaves fall like golden coins upon the stream, beneath the amber stillness of a dream...",
    date: "August 4, 2026",
  },
  {
    id: "3",
    title: "The Sanctuary of Dawn",
    author: "Maya Linwood",
    theme: "Solitude & Reflection",
    readTime: "2 min read",
    excerpt: "Before the sun awakens city spires, the quiet soul kindles its inner fires...",
    date: "August 3, 2026",
  },
  {
    id: "4",
    title: "Eternal Constellations",
    author: "David K. Thorne",
    theme: "Love & Devotion",
    readTime: "4 min read",
    excerpt: "Across the void of uncounted light, your hand remains my compass in the night...",
    date: "August 2, 2026",
  },
  {
    id: "5",
    title: "The Scholar's Reflection",
    author: "Dr. Aris Thorne",
    theme: "Philosophy & Art",
    readTime: "3 min read",
    excerpt: "Bound volumes stack like towers in the fog, tracking human thought in ancient log...",
    date: "August 1, 2026",
  },
  {
    id: "6",
    title: "Sonnet of the River Edge",
    author: "Elena Rostova",
    theme: "Nature & Seasons",
    readTime: "2 min read",
    excerpt: "Where fresh streams flow into the surging sea, time pauses for a single breath of memory...",
    date: "July 31, 2026",
  },
];

const THEMES = [
  "All Themes",
  "Solitude & Reflection",
  "Nature & Seasons",
  "Love & Devotion",
  "Philosophy & Art",
];

export default function PoemArchives() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("All Themes");

  const filteredPoems = POEMS_DATA.filter((poem) => {
    const matchesSearch =
      poem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poem.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poem.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTheme =
      selectedTheme === "All Themes" || poem.theme === selectedTheme;

    return matchesSearch && matchesTheme;
  });

  return (
    <section className="w-full py-16 px-8 max-w-7xl mx-auto border-t border-border">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="text-center md:text-left space-y-3">
          <span className="inline-block px-3 py-1 bg-brand-600/10 text-brand-600 rounded-full text-xs font-semibold uppercase tracking-wider">
            Poetry Archive
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-600 font-heading">
            Explore More Poems & Verses
          </h2>
        </div>

        {/* Filter Controls */}
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search poems by title, poet, or excerpt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-background border border-border focus:border-brand-600 focus:outline-none text-black font-serif transition-colors"
              />
            </div>

            {/* Theme Filter Dropdown */}
            <div className="md:col-span-4">
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-background border border-border focus:border-brand-600 focus:outline-none text-black font-serif transition-colors"
              >
                {THEMES.map((t) => (
                  <option key={t} value={t}>
                    Theme: {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Poems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPoems.map((poem) => (
            <div
              key={poem.id}
              className="group bg-surface p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl hover:border-brand-600/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-muted font-serif">
                  <span className="px-2.5 py-1 bg-brand-600/10 text-brand-700 rounded-md font-semibold uppercase tracking-wider">
                    {poem.theme}
                  </span>
                  <span className="flex items-center gap-1 text-black">
                    <Clock className="w-3.5 h-3.5 text-brand-600" />
                    {poem.readTime}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-brand-600 font-heading group-hover:text-brand-700 transition-colors">
                  {poem.title}
                </h3>

                <p className="text-brand-700 text-sm font-heading italic">
                  By {poem.author}
                </p>

                <p className="text-black text-base font-serif italic leading-relaxed pt-2 border-t border-border/60">
                  "{poem.excerpt}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border/80 flex items-center justify-between text-xs font-serif text-black">
                <span>{poem.date}</span>
                <span className="text-brand-600 font-bold group-hover:underline flex items-center gap-1 font-heading">
                  Read Poem →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
