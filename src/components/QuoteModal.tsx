"use client";

import { useState, useEffect } from "react";
import { X, Quote, Feather, Sparkles, RefreshCw } from "lucide-react";

interface DisplayItem {
  type: "quote" | "poetry";
  title?: string;
  text: string | string[];
  author: string;
  authorBio: string;
}

const INTERCHANGEABLE_ITEMS: DisplayItem[] = [
  {
    type: "quote",
    text: "Words have energy and persistence. They are a force for change and narrative architecture.",
    author: "Maya Angelou",
    authorBio: "Iconic Poet, Memoirist & Civil Rights Activist",
  },
  {
    type: "poetry",
    title: "The Architecture of Solitude",
    text: [
      "I built a sanctuary out of quiet stone,",
      "Where morning light falls softly on the floor,",
      "And measured thoughts are gathered all alone,",
      "Beyond the clatter of the outer door."
    ],
    author: "Maya Linwood",
    authorBio: "Poet & Senior Editor at Pen Crack Studio",
  },
  {
    type: "quote",
    text: "Research is formalized curiosity. It is poking and prying with a purpose.",
    author: "Zora Neale Hurston",
    authorBio: "Anthropologist & Author of Their Eyes Were Watching God",
  },
  {
    type: "poetry",
    title: "The Road Not Taken",
    text: [
      "Two roads diverged in a yellow wood,",
      "And sorry I could not travel both",
      "And be one traveler, long I stood",
      "And looked down one as far as I could."
    ],
    author: "Robert Frost",
    authorBio: "Four-Time Pulitzer Prize Winning Poet",
  },
  {
    type: "quote",
    text: "There is no greater agony than bearing an untold story inside you.",
    author: "Maya Angelou",
    authorBio: "Memoirist & Author of I Know Why the Caged Bird Sings",
  },
  {
    type: "poetry",
    title: "Whispers of Autumn Frost",
    text: [
      "Leaves fall like golden coins upon the stream,",
      "Beneath the amber stillness of a dream,",
      "Where autumn lingers in a quiet grace,",
      "And time stands still in this forgotten place."
    ],
    author: "Clara Hawthorne",
    authorBio: "Contemporary Verse Writer",
  },
  {
    type: "quote",
    text: "Good copy is not written to impress; it is written to illuminate and convert.",
    author: "David Ogilvy",
    authorBio: "Father of Modern Advertising & Brand Strategy",
  },
  {
    type: "poetry",
    title: "Ode to the Unspoken Word",
    text: [
      "Silence holds a heavier key than speech,",
      "Unlocking doors that words can never reach,",
      "A quiet courage caught within a spark,",
      "Where light meets shadow in the deepest dark."
    ],
    author: "Julian Vance",
    authorBio: "Literary Essayist & Poet",
  },
];

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const currentItem = INTERCHANGEABLE_ITEMS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % INTERCHANGEABLE_ITEMS.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md animate-fade-up">
      <div className="bg-surface border border-border rounded-3xl shadow-2xl w-full max-w-2xl relative p-6 sm:p-10 my-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-background border border-border hover:bg-brand-600 hover:text-white transition-colors text-black z-20"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 border-b border-border pb-5 pr-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-600/10 text-brand-600 rounded-full text-xs font-bold uppercase tracking-wider font-heading">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Literary Quotes & Poetry Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-600 font-heading">
            Quotes & Verses
          </h2>
        </div>

        {/* Interchanging Quote / Poetry Display Card */}
        <div className="mt-6 bg-gradient-to-br from-brand-600 via-brand-700 to-stone-950 text-white p-8 sm:p-10 rounded-3xl space-y-6 shadow-xl relative overflow-hidden transition-all duration-500">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Type Badge (Interchanges between Quote & Poetic Verse) */}
          <div className="flex items-center justify-between relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-mono font-bold uppercase tracking-widest border border-white/20">
              {currentItem.type === "quote" ? (
                <>
                  <Quote className="w-3.5 h-3.5" />
                  <span>Literary Quote</span>
                </>
              ) : (
                <>
                  <Feather className="w-3.5 h-3.5" />
                  <span>Poetic Verse</span>
                </>
              )}
            </span>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-semibold font-heading transition-all border border-white/20 active:scale-95 cursor-pointer"
              title="Next Quote/Poem"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next Quote / Verse</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="space-y-4 relative z-10 py-2">
            {currentItem.type === "poetry" && currentItem.title && (
              <h3 className="text-2xl font-bold font-heading text-brand-200">
                {currentItem.title}
              </h3>
            )}

            {typeof currentItem.text === "string" ? (
              <p className="text-xl sm:text-2xl md:text-3xl font-serif italic leading-relaxed text-white">
                "{currentItem.text}"
              </p>
            ) : (
              <div className="space-y-1.5 text-lg sm:text-xl md:text-2xl font-serif italic leading-relaxed text-white">
                {currentItem.text.map((line, lIdx) => (
                  <p key={lIdx} className={lIdx % 2 === 1 ? "pl-6" : ""}>
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Author Attribution */}
          <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative z-10">
            <div>
              <h4 className="font-extrabold text-white text-lg font-heading">
                — {currentItem.author}
              </h4>
              <p className="text-white/80 text-xs font-serif">{currentItem.authorBio}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-bold text-xs font-heading tracking-wider uppercase cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Cycle Quote / Poem ({activeIndex + 1}/{INTERCHANGEABLE_ITEMS.length})</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold font-heading transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
