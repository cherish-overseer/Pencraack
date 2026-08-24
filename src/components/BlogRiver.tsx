"use client";

import { useState } from "react";
import { Search, Clock, ArrowUpRight, TrendingUp, Mail, Filter } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  excerpt: string;
  gradient: string;
  icon: string;
}

const ARTICLES_DATA: Article[] = [
  {
    id: "1",
    title: "10 Common Mistakes in Doctoral Thesis Defenses & How to Avoid Them",
    category: "Academic Research",
    author: "Dr. Aris Thorne",
    authorRole: "Head of Academic Research",
    date: "3 hours ago",
    readTime: "5 min read",
    excerpt: "From methodology over-complication to nervous Q&A pauses, here is how top doctoral candidates structure winning oral defenses.",
    gradient: "from-amber-800 to-stone-900",
    icon: "🎓",
  },
  {
    id: "2",
    title: "Crafting High-Converting Corporate White Papers in 2026",
    category: "Commercial Writing",
    author: "Julian Vance",
    authorRole: "Commercial Lead",
    date: "6 hours ago",
    readTime: "4 min read",
    excerpt: "How B2B tech executives use narrative case studies to establish authority and drive enterprise client acquisition.",
    gradient: "from-amber-700 to-orange-950",
    icon: "📊",
  },
  {
    id: "3",
    title: "The Art of Ghostwriting: Preserving Author Voice Across 80,000 Words",
    category: "Ghostwriting & Novels",
    author: "Clara Hawthorne",
    authorRole: "Senior Ghostwriter",
    date: "1 day ago",
    readTime: "7 min read",
    excerpt: "Ghostwriting fiction or memoirs requires submerging your ego into the author's personal rhythm, cadence, and worldview.",
    gradient: "from-[#823919] to-stone-900",
    icon: "✍️",
  },
  {
    id: "4",
    title: "The 3-Pass Editorial Framework: From First Draft to Publication-Ready",
    category: "Editing & Proofreading",
    author: "Maya Linwood",
    authorRole: "Managing Editor",
    date: "2 days ago",
    readTime: "4 min read",
    excerpt: "Structural line editing, copyediting, and final proofing: breaking down Pen Crack's rigorous quality assurance workflow.",
    gradient: "from-orange-800 to-amber-900",
    icon: "🔍",
  },
  {
    id: "5",
    title: "Navigating Peer Review Feedback Without Losing Your Academic Mind",
    category: "Academic Research",
    author: "Dr. Eleanor Vance",
    authorRole: "Senior Research Director",
    date: "3 days ago",
    readTime: "6 min read",
    excerpt: "Reviewer 2 requested major revisions? A step-by-step psychological and structural guide to responding to journal critiques.",
    gradient: "from-stone-900 to-amber-900",
    icon: "📑",
  },
  {
    id: "6",
    title: "Why Rhythm and Cadence Matter in Technical Documentation",
    category: "Commercial Writing",
    author: "David K. Thorne",
    authorRole: "Technical Copywriter",
    date: "4 days ago",
    readTime: "5 min read",
    excerpt: "Even API documentation and developer guides benefit from clean prose rhythm, logical flow, and active verbs.",
    gradient: "from-amber-900 to-black",
    icon: "💻",
  },
];

const CATEGORIES = [
  "All Articles",
  "Academic Research",
  "Commercial Writing",
  "Ghostwriting & Novels",
  "Editing & Proofreading",
];

export default function BlogRiver() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles = ARTICLES_DATA.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Articles" || art.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newsletterEmail,
          message: "Weekly Newsletter Subscription Request",
          formType: "Blog Newsletter Subscription",
        }),
      });
    } catch (err) {
      console.error("Newsletter dispatch error:", err);
    } finally {
      setSubscribed(true);
    }
  };

  return (
    <section className="w-full py-12 px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Feed Column (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header Controls: Filter Pills & Search */}
          <div className="bg-surface p-6 rounded-3xl border border-border shadow-sm space-y-6">
            <div className="relative">
              <Search className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles by title, author, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-background border border-border focus:border-brand-600 focus:outline-none text-black font-serif transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs uppercase tracking-wider text-black font-semibold shrink-0 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-brand-600" />
                Category:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 ${
                    selectedCategory === cat
                      ? "bg-brand-600 text-white shadow-sm scale-105"
                      : "bg-background text-black border border-border hover:border-brand-600/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Article River Stream */}
          {filteredArticles.length === 0 ? (
            <div className="bg-surface p-12 rounded-3xl border border-border text-center space-y-3">
              <h3 className="text-2xl font-bold text-brand-600 font-heading">No Articles Found</h3>
              <p className="text-black text-base font-serif">
                Try searching for another keyword or select a different category.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="group bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl hover:border-brand-600/40 transition-all duration-300 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
                >
                  {/* Article Thumbnail Graphic */}
                  <div className="sm:col-span-4 aspect-[4/3] rounded-2xl bg-gradient-to-br overflow-hidden flex items-center justify-center text-4xl shadow-inner group-hover:scale-105 transition-transform duration-300 select-none">
                    <div className={`w-full h-full bg-gradient-to-br ${article.gradient} flex items-center justify-center text-white text-5xl`}>
                      {article.icon}
                    </div>
                  </div>

                  {/* Article Content Info */}
                  <div className="sm:col-span-8 space-y-3">
                    <div className="flex items-center gap-3 text-xs font-serif">
                      <span className="px-3 py-1 bg-brand-600/10 text-brand-600 rounded-full font-bold uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="text-black">•</span>
                      <span className="flex items-center gap-1 text-black font-medium">
                        <Clock className="w-3.5 h-3.5 text-brand-600" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-brand-600 font-heading group-hover:text-brand-700 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-black text-sm sm:text-base font-serif line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="pt-3 border-t border-border/70 flex items-center justify-between text-xs font-serif">
                      <span className="font-semibold text-black">
                        By {article.author} <span className="font-normal text-muted">({article.date})</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-brand-600 font-bold font-heading group-hover:translate-x-1 transition-transform">
                        <span>Read</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Column (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Trending Stories (TechCrunch Style) */}
          <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <TrendingUp className="w-5 h-5 text-brand-600" />
              <h3 className="text-xl font-bold text-brand-600 font-heading">
                Trending Essays
              </h3>
            </div>

            <div className="space-y-5">
              {ARTICLES_DATA.slice(0, 4).map((art, index) => (
                <div key={art.id} className="flex gap-4 items-start group">
                  <span className="text-3xl font-bold text-brand-600/30 font-heading group-hover:text-brand-600 transition-colors">
                    0{index + 1}
                  </span>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-600">
                      {art.category}
                    </span>
                    <h4 className="font-bold text-sm text-black group-hover:text-brand-600 transition-colors font-heading leading-snug">
                      {art.title}
                    </h4>
                    <p className="text-xs text-muted font-serif">By {art.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inline Newsletter Signup Card */}
          <div className="bg-brand-600 text-white p-8 rounded-3xl space-y-6 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-heading">
                Pen Crack Weekly
              </h3>
              <p className="text-white/90 text-sm font-serif leading-relaxed">
                Get handpicked publishing advice, academic writing tips, and creative essays delivered to your inbox every Thursday.
              </p>
            </div>

            {subscribed ? (
              <div className="bg-white/20 p-4 rounded-xl text-center text-sm font-bold font-heading animate-fade-up">
                ✓ Subscribed successfully! Welcome to Pen Crack Weekly.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3 relative z-10">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white text-black font-serif placeholder:text-stone-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-stone-950 hover:bg-black text-white font-bold rounded-xl text-sm font-heading tracking-wide transition-colors shadow-md"
                >
                  SUBSCRIBE NOW
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
