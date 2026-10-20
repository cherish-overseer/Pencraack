import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOGS, WRITERS, getBlogById, getImgUrl } from "@/data/pencrackData";
import ReaderInteractiveBar from "@/components/ReaderInteractiveBar";
import { ContentCard } from "@/components/ContentCards";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return BLOGS.map((blog) => ({
    id: blog.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = getBlogById(id);

  if (!blog) {
    return {
      title: "Article Not Found — Pencrack",
    };
  }

  return {
    title: `${blog.t} — Pencrack Blog`,
    description: blog.e,
  };
}

export default async function BlogReaderPage({ params }: PageProps) {
  const { id } = await params;
  const blog = getBlogById(id);

  if (!blog) {
    notFound();
  }

  const writer = WRITERS[blog.w] || WRITERS[0];
  const coverImg = getImgUrl(blog.i, 1200);
  const relatedBlogs = BLOGS.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <article className="min-h-screen bg-[var(--cream)] py-8 sm:py-16">
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--line)]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brown)] hover:text-[var(--brown-700)] transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Blog</span>
          </Link>
          <span className="pill">{blog.c}</span>
        </div>

        {/* Article Header */}
        <header className="mb-10 max-w-5xl">
          <div className="eyebrow mb-2">Pencrack Insights</div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[var(--brown)] leading-[1.15] tracking-tight mb-6">
            {blog.t}
          </h1>

          <p className="text-xl sm:text-2xl text-[var(--ink)]/80 leading-relaxed italic mb-8">
            {blog.e}
          </p>

          <div className="flex items-center gap-4 pb-6 border-b border-[var(--line)]">
            <img
              src={writer.img}
              alt={writer.n}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
            />
            <div>
              <div className="font-serif text-xl font-bold text-[var(--brown)]">{writer.n}</div>
              <div className="text-xs sm:text-sm text-[var(--muted)] flex items-center gap-2.5 flex-wrap mt-0.5">
                <span>{blog.d}</span>
                <span>•</span>
                <span>⏱️ {blog.rt} read</span>
                <span>•</span>
                <span>👁️ {blog.reads} views</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image with Generous Spacing */}
        <div className="mb-16 sm:mb-24">
          <img
            src={coverImg}
            alt={blog.t}
            className="w-full h-80 sm:h-[520px] object-cover rounded-[var(--r)] shadow-md"
          />
          <div className="text-xs text-[var(--muted)] mt-3 italic font-sans text-center">
            Editorial Photo · Pencrack Journal
          </div>
        </div>

        {/* Article Content - Wide, Spacious, Readable */}
        <div className="max-w-4xl mx-auto space-y-12">
          {blog.sections && blog.sections.length > 0 ? (
            blog.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-6">
                {section.heading && (
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--brown)] pt-6 pb-2 border-b border-[var(--line)]/60">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-lg sm:text-xl text-[var(--ink)] leading-[2.1] sm:leading-[2.2]">
                    {para}
                  </p>
                ))}
                {section.quote && (
                  <blockquote className="border-l-4 border-[var(--accent)] pl-8 sm:pl-10 py-5 my-10 italic text-[var(--brown-700)] font-serif text-2xl sm:text-3xl leading-[1.8] bg-[var(--beige)]/50 rounded-r-[var(--r)] shadow-xs">
                    {section.quote}
                  </blockquote>
                )}
              </section>
            ))
          ) : (
            <p className="text-lg sm:text-xl text-[var(--ink)] leading-[2.1]">{blog.e}</p>
          )}
        </div>

        {/* Reader Action Bar & Author Box */}
        <div className="max-w-4xl mx-auto mt-16">
          <ReaderInteractiveBar
            writer={writer}
            initialLikes={blog.likes}
            contentType="Blog"
            title={blog.t}
          />
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[var(--line)]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl font-bold text-[var(--brown)]">
                More Articles to Read
              </h3>
              <Link href="/blog" className="text-sm font-bold text-[var(--accent)] hover:underline">
                View All Articles →
              </Link>
            </div>
            <div className="grid g3">
              {relatedBlogs.map((rel) => (
                <ContentCard key={rel.id} data={rel} type="Blog" />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
