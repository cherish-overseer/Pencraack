"use client";

import { useState } from "react";
import { usePencrack } from "@/context/PencrackContext";
import { BLOGS, WRITERS, getImgUrl } from "@/data/pencrackData";
import { ContentCard } from "@/components/ContentCards";

const CHIPS = [
  "All",
  "Technology",
  "Business",
  "Lifestyle",
  "Education",
  "Career",
  "Personal Development",
  "Culture",
  "Opinion",
];

export default function BlogPage() {
  const [activeChip, setActiveChip] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { openReader } = usePencrack();

  const featured = BLOGS[0];
  const featuredWriter = WRITERS[featured.w] || WRITERS[0];

  const filteredBlogs = BLOGS.filter((b) => {
    const matchesChip = activeChip === "All" || b.c.toLowerCase() === activeChip.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      b.t.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.e.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChip && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="pagehead">
        <div className="wrap">
          <div className="eyebrow">Ideas &amp; insight</div>
          <h1>The Pencrack Blog</h1>
          <p>
            Fresh perspectives on technology, business, culture, and the craft of living well — written by our community.
          </p>

          <div className="searchbar mt-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              placeholder="Search blogs, topics, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <section className="sec-pad bg-[var(--cream)]">
        <div className="wrap">
          {/* Category Chips */}
          <div className="chips">
            {CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveChip(chip)}
                className={`chip ${activeChip === chip ? "active" : ""}`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Big Featured Article */}
          <div className="sec-head">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Featured Article
              </h2>
            </div>
          </div>

          <div className="feature-big mb-12">
            <img src={getImgUrl(featured.i, 800)} alt={featured.t} />
            <div className="fb-body">
              <span className="tag">{featured.c}</span>
              <h2>{featured.t}</h2>
              <p>{featured.e}</p>
              <div className="who mb-4">
                <img src={featuredWriter.img} alt={featuredWriter.n} />
                <div>
                  <div className="wn">{featuredWriter.n}</div>
                  <div className="wm">
                    {featured.d} · {featured.rt}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary self-start"
                onClick={() => openReader(featured, "Blog")}
              >
                Read article
              </button>
            </div>
          </div>

          {/* Trending Blogs */}
          <div className="sec-head mt-12">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Trending Blogs
              </h2>
            </div>
          </div>
          <div className="grid g3 mb-12">
            {filteredBlogs.slice(1, 4).map((blog) => (
              <ContentCard key={blog.id} data={blog} type="Blog" />
            ))}
          </div>

          {/* Latest Blogs */}
          <div className="sec-head mt-12">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Latest Blogs
              </h2>
            </div>
          </div>
          <div className="grid g3">
            {filteredBlogs.slice(3, 6).map((blog) => (
              <ContentCard key={blog.id} data={blog} type="Blog" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
