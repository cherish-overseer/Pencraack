import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POEMS, WRITERS, getPoemById } from "@/data/pencrackData";
import ReaderInteractiveBar from "@/components/ReaderInteractiveBar";
import { PoemCard } from "@/components/ContentCards";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return POEMS.map((poem) => ({
    id: poem.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const poem = getPoemById(id);

  if (!poem) {
    return {
      title: "Poem Not Found — Pencrack",
    };
  }

  return {
    title: `${poem.t} — Pencrack Poetry`,
    description: poem.v.replace(/\n/g, " "),
  };
}

export default async function PoemReaderPage({ params }: PageProps) {
  const { id } = await params;
  const poem = getPoemById(id);

  if (!poem) {
    notFound();
  }

  const writer = WRITERS[poem.w] || WRITERS[0];
  const relatedPoems = POEMS.filter((p) => p.id !== poem.id).slice(0, 2);

  return (
    <article className="min-h-screen bg-[var(--cream)] py-8 sm:py-16">
      <div className="wrap max-w-3xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--line)]">
          <Link
            href="/poems"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brown)] hover:text-[var(--brown-700)] transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Poetry</span>
          </Link>
          <span className="pill">Poetry</span>
        </div>

        {/* Poem Header */}
        <header className="text-center mb-12">
          <div className="eyebrow mb-2">Verse &amp; Rhythm</div>
          <h1 className="font-serif italic text-4xl sm:text-5xl font-bold text-[var(--brown)] leading-tight mb-6">
            {poem.t}
          </h1>

          <div className="flex items-center justify-center gap-3.5 pb-8 border-b border-[var(--line)]">
            <img
              src={writer.img}
              alt={writer.n}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="text-left">
              <div className="font-serif text-base font-bold text-[var(--brown)]">{writer.n}</div>
              <div className="text-xs text-[var(--muted)] flex items-center gap-2">
                <span>{poem.d}</span>
                <span>•</span>
                <span>👁️ {poem.reads} reads</span>
              </div>
            </div>
          </div>
        </header>

        {/* Poem Sanctuary / Verse Body */}
        <div className="bg-white/80 backdrop-blur-sm border border-[var(--line)] rounded-[var(--r-lg)] p-8 sm:p-14 shadow-sm mb-10 text-center">
          <div className="font-serif text-xl sm:text-2xl text-[var(--brown-700)] leading-loose space-y-8">
            {poem.stanzas && poem.stanzas.length > 0 ? (
              poem.stanzas.map((stanza, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <div className="whitespace-pre-line italic font-normal tracking-wide">
                    {stanza}
                  </div>
                  {sIdx < poem.stanzas!.length - 1 && (
                    <div className="text-center text-[var(--accent)] select-none py-2 text-sm opacity-60">
                      ✦ ✦ ✦
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="whitespace-pre-line italic font-normal tracking-wide">
                {poem.v}
              </div>
            )}
          </div>

          {/* Poet's Note */}
          {poem.poetNote && (
            <div className="mt-12 pt-8 border-t border-[var(--line)] text-left bg-[var(--cream)] rounded-[var(--r)] p-5 text-sm text-[var(--muted)]">
              <span className="font-bold text-[var(--brown)] block mb-1">Poet’s Note:</span>
              <p className="italic leading-relaxed">{poem.poetNote}</p>
            </div>
          )}
        </div>

        {/* Reader Action Bar & Author Box */}
        <ReaderInteractiveBar
          writer={writer}
          initialLikes={poem.likes}
          contentType="Poem"
          title={poem.t}
        />

        {/* More Poems */}
        {relatedPoems.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[var(--line)]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl font-bold text-[var(--brown)]">
                More Poems to Read
              </h3>
              <Link href="/poems" className="text-sm font-bold text-[var(--accent)] hover:underline">
                View All Poetry →
              </Link>
            </div>
            <div className="grid g2">
              {relatedPoems.map((rel) => (
                <PoemCard key={rel.id} poem={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
