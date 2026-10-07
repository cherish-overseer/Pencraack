"use client";

import { usePencrack } from "@/context/PencrackContext";

export default function AboutPage() {
  const { openAuth } = usePencrack();

  return (
    <div className="w-full">
      <div className="pagehead">
        <div className="wrap">
          <div className="eyebrow">Our story</div>
          <h1>Where writing becomes opportunity.</h1>
          <p>
            Pencrack is a platform built for writers, readers, creators, and people looking for professional writing services.
          </p>
        </div>
      </div>

      <section className="sec-pad bg-white">
        <div className="wrap max-w-[860px]">
          {/* Mission Card */}
          <div className="panel text-center bg-[var(--beige)] border-none p-10">
            <div className="eyebrow mb-2">Our Mission</div>
            <p className="serif text-2xl sm:text-3xl text-[var(--brown)] font-bold leading-relaxed">
              “To create a space where writing is discovered, shared, supported, and transformed into opportunity.”
            </p>
          </div>

          <div className="grid g2 mt-8">
            <div className="panel">
              <h3 className="font-serif text-xl font-bold text-[var(--brown)]">
                What We Do
              </h3>
              <p className="text-[var(--brown-700)] text-sm leading-relaxed mt-2">
                We bring writing of every kind — blogs, stories, poetry and comics — into one beautiful, discoverable home, and give readers simple ways to support the people behind the words.
              </p>
            </div>

            <div className="panel">
              <h3 className="font-serif text-xl font-bold text-[var(--brown)]">
                Why Pencrack
              </h3>
              <p className="text-[var(--brown-700)] text-sm leading-relaxed mt-2">
                Because great writing deserves more than a scroll-past. We pair editorial quality with real monetary support and a thriving creative community.
              </p>
            </div>

            <div className="panel">
              <h3 className="font-serif text-xl font-bold text-[var(--brown)]">
                For Writers
              </h3>
              <p className="text-[var(--brown-700)] text-sm leading-relaxed mt-2">
                Publish freely, grow an audience, track your analytics, and earn directly through gifts and professional service requests.
              </p>
            </div>

            <div className="panel">
              <h3 className="font-serif text-xl font-bold text-[var(--brown)]">
                For Readers
              </h3>
              <p className="text-[var(--brown-700)] text-sm leading-relaxed mt-2">
                Discover fresh voices across genres, build your library, follow writers you love, and support them with a tap.
              </p>
            </div>

            <div className="panel col-span-full">
              <h3 className="font-serif text-xl font-bold text-[var(--brown)]">
                For Businesses
              </h3>
              <p className="text-[var(--brown-700)] text-sm leading-relaxed mt-2">
                Access a marketplace of skilled writers for copywriting, technical docs, academic support, UX writing and more — no account required to request a quote.
              </p>
            </div>
          </div>

          <div className="center mt-10">
            <button
              className="btn btn-primary px-8 py-3.5 text-base"
              onClick={() => openAuth("signup")}
            >
              Join the Pencrack Community
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
