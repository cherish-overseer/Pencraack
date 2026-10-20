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
    <article className="min-h-screen bg-[var(--cream)] py-8 sm:py-14">
      <div className="wrap max-w-4xl mx-auto">
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
        <header className="mb-8">
          <div className="eyebrow mb-2">Pencrack Insights</div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[var(--brown)] leading-tight tracking-tight mb-6">
            {blog.t}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--ink)]/80 leading-relaxed italic mb-6">
            {blog.e}
          </p>

          <div className="flex items-center gap-4 pb-6 border-b border-[var(--line)]">
            <img
              src={writer.img}
              alt={writer.n}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
            />
            <div>
              <div className="font-serif text-lg font-bold text-[var(--brown)]">{writer.n}</div>
              <div className="text-xs sm:text-sm text-[var(--muted)] flex items-center gap-2 flex-wrap">
                <span>{blog.d}</span>
                <span>•</span>
                <span>⏱️ {blog.rt} read</span>
                <span>•</span>
                <span>👁️ {blog.reads} views</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-10">
          <img
            src={coverImg}
            alt={blog.t}
            className="w-full h-72 sm:h-[460px] object-cover rounded-[var(--r)] shadow-md"
          />
        </div>

        {/* Article Content */}
        <div className="space-y-8 max-w-3xl mx-auto">
          {blog.sections && blog.sections.length > 0 ? (
            blog.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-4">
                {section.heading && (
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--brown)] pt-4 pb-1">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-base sm:text-lg text-[var(--ink)] leading-relaxed">
                    {para}
                  </p>
                ))}
                {section.quote && (
                  <blockquote className="border-l-4 border-[var(--accent)] pl-6 py-2 my-6 italic text-[var(--brown-700)] font-serif text-xl sm:text-2xl bg-[var(--beige)]/40 rounded-r-[var(--r-sm)]">
                    {section.quote}
                  </blockquote>
                )}
              </section>
            ))
          ) : (
            <p className="text-lg text-[var(--ink)] leading-relaxed">{blog.e}</p>
          )}
        </div>

        {/* Reader Action Bar & Author Box */}
        <div className="max-w-3xl mx-auto">
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
