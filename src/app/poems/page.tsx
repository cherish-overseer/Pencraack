"use client";

import Link from "next/link";
import { POEMS, WRITERS, getImgUrl } from "@/data/pencrackData";
import { PoemCard } from "@/components/ContentCards";

export default function PoetryPage() {

  const collections = [
    { title: "Love in the Time of Harmattan", count: 6, writer: WRITERS[0] },
    { title: "Lagos Nocturnes", count: 4, writer: WRITERS[1] },
    { title: "Daughters of the Delta", count: 5, writer: WRITERS[2] },
  ];

  return (
    <div className="w-full">
      <div className="pagehead text-center">
        <div className="wrap text-center flex flex-col items-center">
          <div className="eyebrow text-center">Where words breathe</div>
          <h1 className="italic text-center">Poetry</h1>
          <p className="max-w-2xl mx-auto text-center">
            A quiet, spacious place for verse — read slowly, feel deeply, and support the poets who move you.
          </p>
        </div>
      </div>

      <section className="sec-pad bg-white">
        <div className="wrap">
          {/* Featured Poems */}
          <div className="sec-head">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Featured Poems
              </h2>
            </div>
          </div>
          <div className="grid g2 mb-12">
            {POEMS.slice(0, 2).map((poem) => (
              <PoemCard key={poem.id} poem={poem} />
            ))}
          </div>

          {/* Popular Poems */}
          <div className="sec-head mt-12">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Popular Poems
              </h2>
            </div>
          </div>
          <div className="grid g2 mb-12">
            {POEMS.slice(1, 3).map((poem) => (
              <PoemCard key={poem.id} poem={poem} />
            ))}
          </div>

          {/* Latest Poems */}
          <div className="sec-head mt-12">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Latest Poems
              </h2>
            </div>
          </div>
          <div className="grid g2 mb-12">
            {POEMS.slice(2, 4).map((poem) => (
              <PoemCard key={poem.id} poem={poem} />
            ))}
          </div>

          {/* Poetry Collections */}
          <div className="sec-head mt-12">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Poetry Collections
              </h2>
            </div>
          </div>
          <div className="grid g3">
            {collections.map((col, idx) => (
              <Link
                key={col.title}
                href={`/poems/${POEMS[idx % POEMS.length].id}`}
                className="card group cursor-pointer"
              >
                <img
                  className="cover"
                  src={getImgUrl(idx + 2)}
                  alt={col.title}
                />
                <div className="body">
                  <span className="tag">Collection</span>
                  <h3 className="group-hover:text-[var(--brown-700)] transition-colors">
                    {col.title}
                  </h3>
                  <p className="muted text-sm">
                    {col.count} poems · by {col.writer.n}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
