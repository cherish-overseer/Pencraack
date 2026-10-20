import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STORIES, WRITERS, getStoryById, getImgUrl } from "@/data/pencrackData";
import ReaderInteractiveBar from "@/components/ReaderInteractiveBar";
import { ContentCard } from "@/components/ContentCards";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return STORIES.map((story) => ({
    id: story.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const story = getStoryById(id);

  if (!story) {
    return {
      title: "Story Not Found — Pencrack",
    };
  }

  return {
    title: `${story.t} — Pencrack`,
    description: story.e,
  };
}

export default async function StoryReaderPage({ params }: PageProps) {
  const { id } = await params;
  const story = getStoryById(id);

  if (!story) {
    notFound();
  }

  const writer = WRITERS[story.w] || WRITERS[0];
  const coverImg = getImgUrl(story.i, 1200);
  const relatedStories = STORIES.filter((s) => s.id !== story.id).slice(0, 3);

  return (
    <article className="min-h-screen bg-[var(--cream)] py-8 sm:py-16">
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-8">
        {/* Navigation Breadcrumb & Category */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--line)]">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brown)] hover:text-[var(--brown-700)] transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Stories</span>
          </Link>
          <span className="pill">{story.c}</span>
        </div>

        {/* Story Header */}
        <header className="mb-10 max-w-5xl">
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[var(--brown)] leading-[1.15] tracking-tight mb-6">
            {story.t}
          </h1>

          <div className="flex items-center gap-4 pb-6 border-b border-[var(--line)]">
            <img
              src={writer.img}
              alt={writer.n}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
            />
            <div>
              <div className="font-serif text-xl font-bold text-[var(--brown)]">{writer.n}</div>
              <div className="text-xs sm:text-sm text-[var(--muted)] flex items-center gap-2.5 flex-wrap mt-0.5">
                <span>{story.d || "Oct 2026"}</span>
                <span>•</span>
                <span>⏱️ {story.rt}</span>
                <span>•</span>
                <span>👁️ {story.reads} reads</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image with Generous Spacing */}
        <div className="mb-20 sm:mb-28">
          <img
            src={coverImg}
            alt={story.t}
            className="w-full h-80 sm:h-[540px] object-cover rounded-[var(--r)] shadow-md"
          />
          <div className="text-xs text-[var(--muted)] mt-4 italic font-sans text-center tracking-wide">
            Cover Illustration · Pencrack Stories
          </div>
        </div>

        {/* Story Body Content - Fits the Screen, Expansive & Breathable */}
        <div className="max-w-5xl mx-auto w-full pt-4">
          <div className="font-serif text-xl sm:text-[23px] text-[var(--ink)] leading-[2.2] sm:leading-[2.35] space-y-10 sm:space-y-12">
            {story.body && story.body.length > 0 ? (
              <>
                <p className="font-serif">
                  {story.body[0]}
                </p>
                {story.body.slice(1, 2).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                {story.quote && (
                  <blockquote className="border-l-4 border-[var(--accent)] pl-8 sm:pl-10 py-6 my-14 italic text-[var(--brown-700)] font-serif text-2xl sm:text-3xl leading-[1.8] bg-[var(--beige)]/50 rounded-r-[var(--r)] shadow-xs">
                    {story.quote}
                  </blockquote>
                )}

                {story.subheading && (
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--brown)] pt-10 pb-4 border-b border-[var(--line)]/60">
                    {story.subheading}
                  </h2>
                )}

                {story.body.slice(2).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </>
            ) : (
              <p>{story.e}</p>
            )}
          </div>
        </div>

        {/* Reader Action Bar & Author Box */}
        <div className="max-w-5xl mx-auto mt-20">
          <ReaderInteractiveBar
            writer={writer}
            initialLikes={story.likes}
            contentType="Story"
            title={story.t}
          />
        </div>

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[var(--line)]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl font-bold text-[var(--brown)]">
                More Stories You May Enjoy
              </h3>
              <Link href="/stories" className="text-sm font-bold text-[var(--accent)] hover:underline">
                View All Stories →
              </Link>
            </div>
            <div className="grid g3">
              {relatedStories.map((rel) => (
                <ContentCard key={rel.id} data={rel} type="Story" />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
