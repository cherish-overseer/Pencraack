"use client";

import Link from "next/link";
import { usePencrack } from "@/context/PencrackContext";
import {
  STORIES,
  BLOGS,
  POEMS,
  COMICS,
  getImgUrl,
} from "@/data/pencrackData";
import {
  ContentCard,
  PoemCard,
  ComicCard,
} from "@/components/ContentCards";

export default function HomePage() {
  const { openAuth } = usePencrack();

  return (
    <div className="w-full space-y-0">
      {/* ===================== HERO ===================== */}
      <section className="hero bg-[var(--cream)]">
        <div className="wrap hero-in">
          <div>
            <div className="eyebrow">A home for writers &amp; readers</div>
            <h1>
              Read. Write.
              <br />
              Share. <em>Support.</em>
            </h1>
            <p className="sub">
              Pencrack is a home for writers and readers to share stories, poems, blogs, comics, and ideas while connecting with a community that values great writing.
            </p>
            <div className="hero-cta">
              <button
                className="btn btn-primary"
                onClick={() => openAuth("signup")}
              >
                <span>Start Writing</span>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <Link href="/stories" className="btn btn-ghost">
                Explore Writing
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="n">48K+</div>
                <div className="l">Writers</div>
              </div>
              <div>
                <div className="n">320K</div>
                <div className="l">Readers</div>
              </div>
              <div>
                <div className="n">1.2M</div>
                <div className="l">Stories shared</div>
              </div>
              <div>
                <div className="n">₦85M</div>
                <div className="l">Gifted to writers</div>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-card ha1">
              <img src={getImgUrl(0)} alt="Story cover" />
              <div className="pad">
                <div className="tag">Story</div>
                <h4>The Harmattan Letters</h4>
                <div className="mini">by Adaeze N. · 8 min read</div>
              </div>
            </div>

            <div className="hero-card ha2">
              <img src={getImgUrl(2)} alt="Poem cover" />
              <div className="pad">
                <div className="tag">Poetry</div>
                <h4>Lagos at Dawn</h4>
                <div className="mini">by Tunde O.</div>
              </div>
            </div>

            <div className="hero-card ha3">
              <img src={getImgUrl(8)} alt="Comic cover" />
              <div className="pad">
                <div className="tag">Comic</div>
                <h4>Ink &amp; Iron</h4>
              </div>
            </div>

            <div className="floaty" style={{ top: "-6px", right: "4%" }}>
              ❤️ 12.4k likes
            </div>
            <div className="floaty" style={{ bottom: "-8px", left: "2%" }}>
              🎁 ₦5,000 gifted
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURED STORIES ===================== */}
      <section className="sec-pad bg-white">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="tag">Editor&apos;s picks</div>
              <h2>Featured Stories</h2>
            </div>
            <Link href="/stories" className="link-all">
              View All →
            </Link>
          </div>
          <div className="grid g3">
            {STORIES.slice(0, 3).map((story) => (
              <ContentCard key={story.id} data={story} type="Story" />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TRENDING BLOGS ===================== */}
      <section className="sec-pad bg-[var(--cream)]">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="tag">Buzzing now</div>
              <h2>Trending Blogs</h2>
            </div>
            <Link href="/blog" className="link-all">
              View All →
            </Link>
          </div>
          <div className="grid g3">
            {BLOGS.slice(0, 3).map((blog) => (
              <ContentCard key={blog.id} data={blog} type="Blog" />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== POPULAR POEMS ===================== */}
      <section className="sec-pad bg-white">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="tag">Verse &amp; rhythm</div>
              <h2>Popular Poems</h2>
            </div>
            <Link href="/poems" className="link-all">
              View All →
            </Link>
          </div>
          <div className="grid g2">
            {POEMS.slice(0, 2).map((poem) => (
              <PoemCard key={poem.id} poem={poem} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FEATURED COMICS ===================== */}
      <section className="sec-pad bg-[var(--cream)]">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <div className="tag">Panels &amp; pages</div>
              <h2>Featured Comics</h2>
            </div>
            <Link href="/comics" className="link-all">
              View All →
            </Link>
          </div>
          <div className="grid g2">
            {COMICS.slice(0, 2).map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== COMMUNITY SECTION ===================== */}
      <section className="sec-pad bg-[var(--brown)]">
        <div className="wrap">
          <div className="center max-w-[680px] mx-auto mb-10">
            <div className="eyebrow" style={{ color: "var(--gold)" }}>
              The writing community
            </div>
            <h2 className="serif text-3xl sm:text-4xl text-white font-bold leading-tight">
              Publish any kind of writing you love
            </h2>
            <p className="text-[#e6d3bf] mt-3.5 text-base sm:text-lg">
              Whatever your craft, Pencrack gives it a beautiful home and a community ready to read, react, and reward it.
            </p>
          </div>

          <div className="grid g4">
            {[
              { icon: "✍️", title: "Blog", desc: "Share ideas, essays and how-tos." },
              { icon: "📖", title: "Stories", desc: "Fiction, memoir and serialised tales." },
              { icon: "🪡", title: "Poetry", desc: "Verse that lingers long after." },
              { icon: "🎨", title: "Comics", desc: "Visual stories, panel by panel." },
            ].map((c) => (
              <div
                key={c.title}
                className="writer-card"
                style={{
                  background: "rgba(255,255,255,.08)",
                  borderColor: "rgba(255,255,255,.14)",
                }}
              >
                <div className="text-4xl mb-2">{c.icon}</div>
                <h4 className="text-white font-serif text-xl">{c.title}</h4>
                <p className="text-[#e6d3bf] text-xs sm:text-sm mt-1.5">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="center mt-9">
            <button
              className="btn bg-white text-[var(--brown)] hover:bg-[#faf5ee]"
              onClick={() => openAuth("signup")}
            >
              Publish Your Work
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
