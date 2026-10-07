"use client";

import { useState } from "react";
import { usePencrack } from "@/context/PencrackContext";
import { WRITERS, getImgUrl } from "@/data/pencrackData";

export default function ReaderModal() {
  const { isReaderOpen, closeReader, readerData, openGift, showToast } = usePencrack();
  const [likesCount, setLikesCount] = useState(2431);
  const [isLiked, setIsLiked] = useState(false);

  if (!isReaderOpen || !readerData) return null;

  const writer = WRITERS[readerData.w] || WRITERS[0];
  const coverImg = readerData.cover || getImgUrl(readerData.i || 0, 1000);

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
      showToast("Liked ❤️", "success");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[500] bg-[rgba(58,37,24,0.5)] backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && closeReader()}
    >
      <div className="bg-[var(--cream)] rounded-[var(--r-lg)] w-full max-w-[760px] shadow-[var(--shadow-lg)] overflow-hidden my-8 max-h-[92vh] overflow-y-auto">
        <div className="p-6 sm:p-10">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={closeReader}
              className="inline-flex items-center gap-1.5 font-bold text-sm text-[var(--brown)] hover:text-[var(--brown-700)]"
            >
              ← Close Reader
            </button>
            <span className="pill">{readerData.c || readerData.contentType || "Story"}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--brown)] leading-tight mb-4">
            {readerData.t}
          </h1>

          <div className="flex items-center gap-3.5 pb-6 mb-6 border-b border-[var(--line)]">
            <img
              src={writer.img}
              alt={writer.n}
              className="w-11 h-11 rounded-full object-cover border border-[var(--beige-2)]"
            />
            <div>
              <div className="font-bold text-[var(--brown)] text-sm">{writer.n}</div>
              <div className="text-[var(--muted)] text-xs">
                {readerData.d || "Oct 2026"} · {readerData.rt || "8 min read"}
              </div>
            </div>
          </div>

          <img
            src={coverImg}
            alt={readerData.t}
            className="w-full h-64 sm:h-80 object-cover rounded-[var(--r)] mb-8 shadow-sm"
          />

          <div className="font-serif text-lg text-[var(--ink)] leading-relaxed space-y-6">
            {readerData.v ? (
              <div className="whitespace-pre-line font-serif italic text-xl text-[var(--brown-700)] leading-loose">
                {readerData.v}
              </div>
            ) : (
              <>
                <p>
                  The first letter arrived with the dry wind, its edges curled by heat and distance. She read it twice before the meaning settled — the way sand settles after a storm, slow and unarguable.
                </p>
                <p>
                  In the compound, the mango tree had already dropped its leaves. Everything felt paused, waiting for a rain that the harmattan would not permit.
                </p>
                <h3 className="font-serif text-2xl font-bold text-[var(--brown)] pt-2">
                  A season of waiting
                </h3>
                <p>
                  She kept the letters in a tin that once held butter biscuits. Each one a small country she could visit when the nights grew long and the generator fell silent.
                </p>
                <blockquote className="border-l-4 border-[var(--accent)] pl-5 italic text-[var(--brown-700)] my-6 font-serif text-xl">
                  “Write to me as if the distance were nothing,” he had asked. And so she did, every evening, by lamplight.
                </blockquote>
                <p>
                  By the time the rains returned, the tin was full, and so was she — of words, of waiting, of a love that had learned to live on paper.
                </p>
              </>
            )}
          </div>

          {/* Reading Actions */}
          <div className="flex items-center gap-3 my-8 py-4 border-y border-[var(--line)] flex-wrap">
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isLiked ? "text-rose-600 bg-rose-50" : "text-[var(--brown-700)] hover:bg-[var(--beige)]"
              }`}
            >
              <span>❤️</span>
              <span>{likesCount.toLocaleString()}</span>
            </button>
            <button
              onClick={() => showToast("Saved to your library", "success")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[var(--brown-700)] hover:bg-[var(--beige)] transition-colors"
            >
              <span>🔖 Save</span>
            </button>
            <button
              onClick={() => showToast("Link copied to clipboard!")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[var(--brown-700)] hover:bg-[var(--beige)] transition-colors"
            >
              <span>🔗 Share</span>
            </button>
            <button
              onClick={() => openGift(writer.n, writer.img)}
              className="btn btn-gift btn-sm ml-auto"
            >
              🎁 Gift Writer
            </button>
          </div>

          {/* Author Box */}
          <div className="bg-[var(--beige)] rounded-[var(--r)] p-6 flex items-center gap-4 flex-wrap">
            <img
              src={writer.img}
              alt={writer.n}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-serif text-xl font-bold text-[var(--brown)]">{writer.n}</h4>
              <p className="text-[var(--muted)] text-xs mt-0.5">{writer.bio || "Pencrack storyteller"}</p>
              <div className="flex gap-4 text-xs font-bold text-[var(--brown)] mt-2">
                <span>{writer.followers || "12.4k"} Followers</span>
                <span>{writer.worksCount || 24} Works</span>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => showToast(`Following ${writer.n}`)}
                className="btn btn-ghost btn-sm bg-white"
              >
                Follow
              </button>
              <button
                onClick={() => openGift(writer.n, writer.img)}
                className="btn btn-gift btn-sm"
              >
                🎁 Gift
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
