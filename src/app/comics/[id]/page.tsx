import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMICS, WRITERS, getComicById, getImgUrl } from "@/data/pencrackData";
import ReaderInteractiveBar from "@/components/ReaderInteractiveBar";
import { ComicCard } from "@/components/ContentCards";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return COMICS.map((comic) => ({
    id: comic.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const comic = getComicById(id);

  if (!comic) {
    return {
      title: "Comic Not Found — Pencrack",
    };
  }

  return {
    title: `${comic.t} — Pencrack Comic`,
    description: comic.e,
  };
}

export default async function ComicReaderPage({ params }: PageProps) {
  const { id } = await params;
  const comic = getComicById(id);

  if (!comic) {
    notFound();
  }

  const writer = WRITERS[comic.w] || WRITERS[0];
  const panels = comic.panels && comic.panels.length > 0 ? comic.panels : [comic.i, (comic.i + 1) % 10];
  const relatedComics = COMICS.filter((c) => c.id !== comic.id).slice(0, 2);

  return (
    <article className="min-h-screen bg-[var(--cream)] py-8 sm:py-14">
      <div className="wrap max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--line)]">
          <Link
            href="/comics"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brown)] hover:text-[var(--brown-700)] transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Comics</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="pill">{comic.c}</span>
            <span className="pill bg-[var(--accent)] text-white">{comic.issue || "Episode 1"}</span>
          </div>
        </div>

        {/* Comic Header */}
        <header className="mb-10 text-center sm:text-left">
          <div className="eyebrow mb-2">Visual Storytelling</div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--brown)] leading-tight tracking-tight mb-4">
            {comic.t}
          </h1>

          <p className="text-lg text-[var(--ink)]/80 leading-relaxed mb-6">
            {comic.e}
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-4 pb-6 border-b border-[var(--line)]">
            <img
              src={writer.img}
              alt={writer.n}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
            />
            <div>
              <div className="font-serif text-lg font-bold text-[var(--brown)]">{writer.n}</div>
              <div className="text-xs sm:text-sm text-[var(--muted)] flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <span>Comic Creator</span>
                <span>•</span>
                <span>👁️ {comic.reads} reads</span>
                <span>•</span>
                <span>❤️ {comic.likes} likes</span>
              </div>
            </div>
          </div>
        </header>

        {/* Comic Strip Reader Panels */}
        <div className="space-y-6 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] text-center py-2 bg-[var(--beige)]/50 rounded-lg">
            Scroll down to read Episode 1
          </div>

          {panels.map((panelIdx, pIdx) => (
            <div
              key={pIdx}
              className="bg-black rounded-[var(--r)] overflow-hidden shadow-lg border-2 border-[var(--line)]"
            >
              <img
                src={getImgUrl(panelIdx, 1000)}
                alt={`${comic.t} - Panel ${pIdx + 1}`}
                className="w-full h-auto object-cover max-h-[85vh] mx-auto block"
                loading="lazy"
              />
              <div className="bg-[var(--ink)] text-[#e6d3bf] text-xs py-2.5 px-4 text-center font-mono">
                Panel {pIdx + 1} of {panels.length} · {comic.t}
              </div>
            </div>
          ))}

          <div className="text-center py-6 bg-[var(--beige)] rounded-[var(--r)] border border-[var(--line)]">
            <h4 className="font-serif text-xl font-bold text-[var(--brown)] mb-2">
              End of {comic.issue || "Episode 1"}
            </h4>
            <p className="text-sm text-[var(--muted)] max-w-md mx-auto mb-4">
              Episode 2 is currently in production. Support the creator to help unlock the next release!
            </p>
          </div>
        </div>

        {/* Comic Lore / Synopsis */}
        {comic.synopsis && comic.synopsis.length > 0 && (
          <div className="bg-white/80 border border-[var(--line)] rounded-[var(--r)] p-6 sm:p-8 mb-10 max-w-3xl mx-auto shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[var(--brown)] mb-3">
              About This Comic Universe
            </h3>
            <div className="space-y-3 text-sm sm:text-base text-[var(--ink)] leading-relaxed">
              {comic.synopsis.map((syn, idx) => (
                <p key={idx}>{syn}</p>
              ))}
            </div>
          </div>
        )}

        {/* Reader Action Bar & Author Box */}
        <div className="max-w-3xl mx-auto">
          <ReaderInteractiveBar
            writer={writer}
            initialLikes={comic.likes}
            contentType="Comic"
            title={comic.t}
          />
        </div>

        {/* Related Comics */}
        {relatedComics.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[var(--line)]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl font-bold text-[var(--brown)]">
                More Comics to Read
              </h3>
              <Link href="/comics" className="text-sm font-bold text-[var(--accent)] hover:underline">
                View All Comics →
              </Link>
            </div>
            <div className="grid g2">
              {relatedComics.map((rel) => (
                <ComicCard key={rel.id} comic={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
