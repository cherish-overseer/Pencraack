"use client";

import { COMICS, WRITERS } from "@/data/pencrackData";
import { ComicCard, WriterCard } from "@/components/ContentCards";

export default function ComicsPage() {
  return (
    <div className="w-full">
      <div className="pagehead">
        <div className="wrap">
          <div className="eyebrow">Panels, pages &amp; worlds</div>
          <h1>Comics</h1>
          <p>
            Bold art and serialised stories from independent creators. Dive into a new universe today.
          </p>
        </div>
      </div>

      <section className="sec-pad bg-[var(--cream)]">
        <div className="wrap">
          {/* Featured Comics */}
          <div className="sec-head">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Featured Comics
              </h2>
            </div>
          </div>
          <div className="grid g2 mb-12">
            {COMICS.slice(0, 2).map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>

          {/* Popular Comics */}
          <div className="sec-head mt-12">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Popular Comics
              </h2>
            </div>
          </div>
          <div className="grid g2 mb-12">
            {COMICS.slice(1, 3).map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>

          {/* Latest Comics */}
          <div className="sec-head mt-12">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Latest Comics
              </h2>
            </div>
          </div>
          <div className="grid g2 mb-12">
            {COMICS.slice(2, 4).map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>

          {/* Comic Creators */}
          <div className="sec-head mt-12">
            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--brown)]">
                Comic Creators
              </h2>
            </div>
          </div>
          <div className="grid g4">
            {WRITERS.slice(1, 5).map((writer) => (
              <WriterCard key={writer.id} writer={writer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
