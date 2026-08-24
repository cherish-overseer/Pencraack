"use client";

import { useState } from "react";
import { Search, Star, BookOpen, Filter, ArrowUpDown } from "lucide-react";

interface ComicSeries {
  id: string;
  title: string;
  coverGradient: string;
  coverPattern: string;
  rating: number;
  status: "Ongoing" | "Completed";
  genres: string[];
  latestChapter: string;
  updatedTime: string;
  description: string;
}

const COMIC_DATA: ComicSeries[] = [
  {
    id: "1",
    title: "Tomb Raider King: Legacy",
    coverGradient: "from-amber-700 via-orange-800 to-yellow-900",
    coverPattern: "🏺",
    rating: 9.8,
    status: "Ongoing",
    genres: ["Action", "Fantasy", "Regression"],
    latestChapter: "Chapter 48",
    updatedTime: "2 hours ago",
    description: "Gods and ancient artifacts re-awaken in modern metropolis, sparking a war for ultimate relic ownership.",
  },
  {
    id: "2",
    title: "The Ruler of Darkness",
    coverGradient: "from-amber-900 via-stone-900 to-neutral-950",
    coverPattern: "⚔️",
    rating: 9.7,
    status: "Ongoing",
    genres: ["Martial Arts", "Revenge", "Action"],
    latestChapter: "Chapter 35",
    updatedTime: "5 hours ago",
    description: "Born under the Heavenly Killing Star, he embraces the forbidden sutra to punish the corrupt masters.",
  },
  {
    id: "3",
    title: "The Scholar's System",
    coverGradient: "from-yellow-800 via-amber-700 to-orange-900",
    coverPattern: "📜",
    rating: 9.9,
    status: "Ongoing",
    genres: ["System", "Fantasy", "Reincarnation"],
    latestChapter: "Chapter 62",
    updatedTime: "1 day ago",
    description: "A failed academic wakes up with an ancient library system that translates divine scriptures.",
  },
  {
    id: "4",
    title: "Shadow Alchemist",
    coverGradient: "from-[#823919] via-stone-800 to-[#3d1a0b]",
    coverPattern: "🧪",
    rating: 9.5,
    status: "Ongoing",
    genres: ["Dark Fantasy", "Action", "Mystery"],
    latestChapter: "Chapter 29",
    updatedTime: "2 days ago",
    description: "Transmuting forgotten relics into dark spells, he seeks vengeance for his fallen alchemy guild.",
  },
  {
    id: "5",
    title: "Chronicles of the Heavenly Sword",
    coverGradient: "from-amber-600 via-orange-900 to-stone-900",
    coverPattern: "🗡️",
    rating: 9.6,
    status: "Completed",
    genres: ["Martial Arts", "Action", "Drama"],
    latestChapter: "Chapter 120 (End)",
    updatedTime: "1 week ago",
    description: "The grandmaster of the Southern Sect returns after a century of solitary meditation.",
  },
  {
    id: "6",
    title: "Neon Cyber Ninja",
    coverGradient: "from-[#54240f] via-amber-900 to-stone-800",
    coverPattern: "⚡",
    rating: 9.4,
    status: "Ongoing",
    genres: ["Sci-Fi", "Action", "System"],
    latestChapter: "Chapter 18",
    updatedTime: "3 days ago",
    description: "In a dystopian cyberpunk city, a cybernetically enhanced assassin takes on mega-corporations.",
  },
  {
    id: "7",
    title: "Reborn as the Villain's Tutor",
    coverGradient: "from-orange-800 via-amber-700 to-yellow-800",
    coverPattern: "👑",
    rating: 9.8,
    status: "Ongoing",
    genres: ["Reincarnation", "Romance", "Fantasy"],
    latestChapter: "Chapter 44",
    updatedTime: "4 hours ago",
    description: "Transmigrated into a popular web novel, she must reform the tyrannical prince before he destroys the realm.",
  },
  {
    id: "8",
    title: "Necromancer of the Abyss",
    coverGradient: "from-stone-900 via-[#3d1a0b] to-black",
    coverPattern: "💀",
    rating: 9.7,
    status: "Ongoing",
    genres: ["Dark Fantasy", "System", "Action"],
    latestChapter: "Chapter 51",
    updatedTime: "6 hours ago",
    description: "Summoning undead legions from the forgotten abyss to conquer the highest dungeon towers.",
  },
];

const GENRES = [
  "All",
  "Action",
  "Fantasy",
  "Reincarnation",
  "Martial Arts",
  "System",
  "Dark Fantasy",
  "Romance",
  "Sci-Fi",
  "Mystery",
];

export default function ComicBrowseView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  // Filter comics
  const filteredComics = COMIC_DATA.filter((comic) => {
    const matchesSearch =
      comic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comic.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || comic.genres.includes(selectedGenre);

    const matchesStatus =
      statusFilter === "All" || comic.status === statusFilter;

    return matchesSearch && matchesGenre && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "popular") return b.rating * 10 - a.rating * 10;
    return 0; // Default latest
  });

  return (
    <div className="w-full py-12 px-8 max-w-7xl mx-auto space-y-10">
      {/* Title & Header */}
      <div className="space-y-4 text-center sm:text-left border-b border-border pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600/10 text-brand-600 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Graphics & Webtoons</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-600 font-heading">
          Browse Comics & Graphic Novels
        </h1>
        <p className="text-black text-base sm:text-lg font-serif max-w-2xl">
          Explore Pen Crack's curated library of serialized webtoons, action manhwa, and illustrated literary comics.
        </p>
      </div>

      {/* Search & Filter Bar (Asura Scans Style) */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, story keyword, or lore..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-background border border-border focus:border-brand-600 focus:outline-none text-black font-serif transition-colors"
            />
          </div>

          {/* Status Dropdown */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-background border border-border focus:border-brand-600 focus:outline-none text-black font-serif transition-colors"
            >
              <option value="All">Status: All</option>
              <option value="Ongoing">Status: Ongoing</option>
              <option value="Completed">Status: Completed</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-background border border-border focus:border-brand-600 focus:outline-none text-black font-serif transition-colors"
            >
              <option value="latest">Sort: Latest Update</option>
              <option value="rating">Sort: Highest Rating</option>
              <option value="popular">Sort: Popularity</option>
            </select>
          </div>
        </div>

        {/* Genre Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs uppercase tracking-wider text-black font-semibold shrink-0 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-brand-600" />
            Genres:
          </span>
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                selectedGenre === genre
                  ? "bg-brand-600 text-white shadow-sm scale-105"
                  : "bg-background text-black border border-border hover:border-brand-600/40"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Series Grid */}
      {filteredComics.length === 0 ? (
        <div className="bg-surface p-12 rounded-3xl border border-border text-center space-y-3">
          <h3 className="text-2xl font-bold text-brand-600 font-heading">No Comics Found</h3>
          <p className="text-black text-base font-serif">
            Try adjusting your search query or selecting a different genre filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredComics.map((comic) => (
            <div
              key={comic.id}
              className="group bg-surface rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-600/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Cover Card Aspect Ratio Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-900">
                <div
                  className={`w-full h-full bg-gradient-to-br ${comic.coverGradient} flex flex-col items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-500`}
                >
                  <span className="text-5xl sm:text-6xl mb-3 drop-shadow-md select-none">
                    {comic.coverPattern}
                  </span>
                  <h4 className="text-white font-bold text-base sm:text-lg font-heading leading-tight drop-shadow-sm">
                    {comic.title}
                  </h4>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{comic.rating}</span>
                </div>

                {/* Status Badge */}
                <div
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                    comic.status === "Ongoing"
                      ? "bg-brand-600 text-white"
                      : "bg-emerald-700 text-white"
                  }`}
                >
                  {comic.status}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-brand-600 font-heading line-clamp-1 group-hover:text-brand-700 transition-colors">
                    {comic.title}
                  </h3>
                  <p className="text-black text-xs font-serif line-clamp-2 mt-1">
                    {comic.description}
                  </p>
                </div>

                {/* Genres & Latest Chapter */}
                <div className="space-y-2 pt-2 border-t border-border/80">
                  <div className="flex flex-wrap gap-1">
                    {comic.genres.slice(0, 2).map((g) => (
                      <span
                        key={g}
                        className="px-2 py-0.5 bg-brand-600/10 text-brand-700 rounded text-[10px] font-semibold uppercase tracking-wider"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-bold text-brand-600 font-serif">
                      {comic.latestChapter}
                    </span>
                    <span className="text-muted text-[11px]">
                      {comic.updatedTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
