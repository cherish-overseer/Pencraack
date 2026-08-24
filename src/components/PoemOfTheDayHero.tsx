"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, Bookmark, Share2, Sparkles, Feather } from "lucide-react";

const POEM_TITLE = "The Architecture of Solitude";
const POEM_AUTHOR = "Maya Linwood";

const STANZAS = [
  [
    "I built a sanctuary out of quiet stone,",
    "Where morning light falls softly on the floor,",
    "And measured thoughts are gathered all alone,",
    "Beyond the clatter of the outer door."
  ],
  [
    "The ink remembers what the tongue forgot,",
    "In rhythm, cadence, and unspoken grace,",
    "A quiet courage that no time can rot,",
    "Carved deep within this empty, sacred space."
  ],
  [
    "Here shadows breathe and whisper in the dark,",
    "Not of sorrow, but of truth restored,",
    "A gentle ember catching from a spark,",
    "Where silence sits beside the written word."
  ]
];

// Full text string passed to the browser speech engine
const FULL_POEM_TEXT = `${POEM_TITLE}. By ${POEM_AUTHOR}. ` + STANZAS.flatMap((s) => s).join(". ");

export default function PoemOfTheDayHero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cleanup speech on unmount
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const togglePlay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Audio speech synthesis is not supported in your browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setProgress(0);
    } else {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(FULL_POEM_TEXT);
      utterance.rate = 0.85; // Elegant, steady poetic pace
      utterance.pitch = 0.95; // Warm, resonant tone

      // Load available speech voices
      const voices = window.speechSynthesis.getVoices();
      const EnglishVoice = voices.find(
        (v) => (v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Daniel"))) || v.lang.startsWith("en")
      );
      if (EnglishVoice) {
        utterance.voice = EnglishVoice;
      }

      const totalLen = FULL_POEM_TEXT.length;

      utterance.onboundary = (event) => {
        if (event.name === "word" || event.name === "sentence") {
          const currentPercent = Math.min(100, Math.round((event.charIndex / totalLen) * 100));
          setProgress(currentPercent);
        }
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <section className="w-full py-12 md:py-20 px-8 max-w-5xl mx-auto space-y-12">
      {/* Top Category Badge & Date */}
      <div className="text-center space-y-3 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/10 border border-brand-600/20 text-brand-600 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Poem of the Day</span>
          <span>•</span>
          <span>August 6, 2026</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-brand-600 font-heading leading-tight tracking-tight">
          {POEM_TITLE}
        </h1>

        <p className="text-brand-700 font-heading text-lg sm:text-xl italic">
          By {POEM_AUTHOR}
        </p>
      </div>

      {/* Interactive Audio Reader Bar (Poetry Foundation Style with Real Speech Narration) */}
      <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md cursor-pointer"
            aria-label={isPlaying ? "Pause audio reading" : "Play audio reading"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <div>
            <h4 className="font-bold text-brand-600 text-sm font-heading">
              {isPlaying ? "Reading Poem Out Loud..." : "Listen to Poem"}
            </h4>
            <p className="text-black text-xs font-serif">Read by author {POEM_AUTHOR}</p>
          </div>
        </div>

        {/* Audio Progress Bar Syncing with Live Speech */}
        <div className="w-full sm:flex-1 max-w-xs flex items-center gap-3">
          <Volume2 className={`w-4 h-4 shrink-0 ${isPlaying ? "text-brand-600 animate-pulse" : "text-muted"}`} />
          <div className="w-full bg-border h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-black shrink-0 font-serif">
            {progress}%
          </span>
        </div>
      </div>

      {/* Poem Stanzas Body (Formated in EB Garamond & Black Text) */}
      <div className="bg-surface p-8 sm:p-14 rounded-3xl border border-border shadow-md max-w-3xl mx-auto space-y-8 relative">
        <div className="absolute top-8 right-8 flex items-center gap-2 text-muted">
          <button className="p-2 hover:bg-background rounded-full transition-colors text-brand-600" title="Bookmark">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-background rounded-full transition-colors text-brand-600" title="Share">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Stanzas */}
        <div className="space-y-6 text-black text-lg sm:text-xl md:text-2xl font-serif leading-relaxed tracking-wide">
          {STANZAS.map((stanza, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {stanza.map((line, lIdx) => (
                <p key={lIdx} className={lIdx % 2 === 1 ? "pl-4" : ""}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Curator Notes & Poet Bio */}
        <div className="pt-8 border-t border-border/80 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-600/10 text-brand-600 flex items-center justify-center font-bold">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-brand-600 text-sm font-heading">About Maya Linwood</h4>
              <p className="text-black text-xs font-serif">Poet & Senior Literary Editor at Pen Crack Studio</p>
            </div>
          </div>
          <p className="text-black text-sm leading-relaxed font-serif bg-background p-4 rounded-xl border border-border/60">
            <strong>Editor's Note:</strong> <em>The Architecture of Solitude</em> explores the restorative nature of creative isolation and the sacred space required to craft authentic literature.
          </p>
        </div>
      </div>
    </section>
  );
}
