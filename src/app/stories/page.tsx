"use client";

import { useState } from "react";
import { STORIES, WRITERS } from "@/data/pencrackData";
import { ContentCard, WriterCard } from "@/components/ContentCards";

const CHIPS = [
  "All",
  "Romance",
  "Fiction",
  "Thriller",
  "Mystery",
  "Fantasy",
  "Drama",
  "Adventure",
  "Short Stories",
];

export default function StoriesPage() {
  const [activeChip, setActiveChip] = useState("All");

  const filteredStories = STORIES.filter((s) => {
    return activeChip === "All" || s.c.toLowerCase() === activeChip.toLowerCase();
  });

  return (
    <div className="w-full">
      <div className="pagehead">
        <div className="wrap">
          <div className="eyebrow">Worlds to get lost in</div>
          <h1>Stories</h1>
          <p>
            From sweeping novels to a single unforgettable scene — discover storytellers writing their hearts out.
          </p>
        </div>
      </div>

      <section className="sec-pad bg-[var(--cream)]">
        <div className="wrap">
          {/* Genre Chips */}
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

          {/* Featured Stories */}
          <div className="sec-head">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Featured Stories
              </h2>
            </div>
          </div>
          <div className="grid g3 mb-12">
            {filteredStories.slice(0, 3).map((story) => (
              <ContentCard key={story.id} data={story} type="Story" />
            ))}
          </div>

          {/* Trending Stories */}
          <div className="sec-head mt-12">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Trending
              </h2>
            </div>
          </div>
          <div className="grid g3 mb-12">
            {filteredStories.slice(2, 5).map((story) => (
              <ContentCard key={story.id} data={story} type="Story" />
            ))}
          </div>

          {/* Latest Stories */}
          <div className="sec-head mt-12">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Latest Stories
              </h2>
            </div>
          </div>
          <div className="grid g3 mb-12">
            {filteredStories.slice(1, 4).map((story) => (
              <ContentCard key={story.id} data={story} type="Story" />
            ))}
          </div>

          {/* Popular Writers */}
          <div className="sec-head mt-12">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Popular Writers
              </h2>
            </div>
          </div>
          <div className="grid g4">
            {WRITERS.slice(0, 4).map((writer) => (
              <WriterCard key={writer.id} writer={writer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
