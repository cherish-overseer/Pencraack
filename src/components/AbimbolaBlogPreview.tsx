"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface BlogArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  gradient: string;
}

const ARTICLES: BlogArticle[] = [
  {
    id: "1",
    category: "Reflections",
    title: "The Medal Before the Ring: On Premature Expertise",
    excerpt:
      "I've noticed how easy it is to become an expert on battles we've never fought. From a distance, every decision looks obvious, and every sentence looks easy to write.",
    gradient: "from-[#823919] via-stone-900 to-amber-950",
  },
  {
    id: "2",
    category: "Craft & Rigor",
    title: "The Quiet Voice: Why True Writers Resist Shortcuts",
    excerpt:
      "You don't resist change because you doubt the new way. You resist it because the craftsmanship of measured thinking demands patience and deliberate cadence.",
    gradient: "from-stone-950 via-amber-900 to-stone-900",
  },
  {
    id: "3",
    category: "Stories",
    title: "Table 7: Observations on Solitude and Literature",
    excerpt:
      "Saturdays are for observing humanity in its unfiltered joy. Between the noise and the clinking glasses, stories unfold in the silence between strangers.",
    gradient: "from-amber-900 via-stone-900 to-black",
  },
];

export default function AbimbolaBlogPreview() {
  return (
    <section id="blog" className="py-20 lg:py-28 px-6 lg:px-12 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 text-brand-600 text-xs font-bold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Reflections & Insights</span>
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-600">
              Latest from the <em className="text-[#823919] not-italic italic font-heading">Blog</em>
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 font-heading tracking-wide uppercase transition-colors"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <Link
              key={article.id}
              href="/blog"
              className="bg-surface rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              {/* Cover Art */}
              <div className="h-48 overflow-hidden bg-stone-900 relative">
                <div
                  className={`w-full h-full bg-gradient-to-br ${article.gradient} p-6 flex flex-col justify-between text-white group-hover:scale-105 transition-transform duration-500`}
                >
                  <span className="self-start text-[10px] font-mono uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full border border-white/20">
                    {article.category}
                  </span>
                  <span className="text-2xl select-none self-end">📖</span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-brand-600 text-[11px] font-bold uppercase tracking-wider font-mono">
                    {article.category}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-brand-600 group-hover:text-brand-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-black text-sm font-serif leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center gap-1.5 text-xs font-bold text-brand-600 font-heading group-hover:text-brand-700">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
