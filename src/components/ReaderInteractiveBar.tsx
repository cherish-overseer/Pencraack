"use client";

import { useState } from "react";
import { usePencrack } from "@/context/PencrackContext";
import { Writer } from "@/data/pencrackData";

interface ReaderInteractiveBarProps {
  writer: Writer;
  initialLikes?: string;
  contentType: "Story" | "Blog" | "Poem" | "Comic";
  title: string;
}

export default function ReaderInteractiveBar({
  writer,
  initialLikes = "1.2k",
  contentType,
  title,
}: ReaderInteractiveBarProps) {
  const { openGift, showToast } = usePencrack();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Parse numeric likes or default to 1,240
  const baseCount = parseInt(initialLikes.replace(/[^0-9]/g, ""), 10) * (initialLikes.includes("k") ? 100 : 1) || 1240;
  const [likesCount, setLikesCount] = useState(baseCount);

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
      showToast("Liked this piece! ❤️", "success");
    } else {
      setIsLiked(false);
      setLikesCount((prev) => Math.max(0, prev - 1));
      showToast("Removed like", "info");
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    showToast(!isSaved ? "Saved to your reading library 🔖" : "Removed from library", "success");
  };

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        if (navigator.share) {
          await navigator.share({
            title: `${title} — Pencrack`,
            text: `Read "${title}" by ${writer.n} on Pencrack`,
            url: window.location.href,
          });
          showToast("Shared successfully! 🚀", "success");
          return;
        }
      } catch (err) {
        // Fallback to clipboard if user cancels or share fails
      }

      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link copied to clipboard! 📋", "success");
      } catch (err) {
        showToast("Unable to copy link", "err");
      }
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    showToast(!isFollowing ? `Now following ${writer.n} 🎉` : `Unfollowed ${writer.n}`, "info");
  };

  return (
    <div className="w-full my-10 space-y-8">
      {/* Action Toolbar */}
      <div className="flex items-center gap-3 py-4 border-y border-[var(--line)] flex-wrap justify-between sm:justify-start">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleLike}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
              isLiked
                ? "text-rose-600 bg-rose-50 border border-rose-200"
                : "text-[var(--brown)] bg-[var(--cream)] border border-[var(--line)] hover:bg-[var(--beige)]"
            }`}
            title="Like this piece"
          >
            <span className="text-base">{isLiked ? "❤️" : "🤍"}</span>
            <span>{likesCount.toLocaleString()}</span>
          </button>

          <button
            onClick={handleSave}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all border ${
              isSaved
                ? "text-[var(--brown)] bg-[var(--beige-2)] border-[var(--brown-500)]"
                : "text-[var(--brown)] bg-[var(--cream)] border-[var(--line)] hover:bg-[var(--beige)]"
            }`}
            title="Save for later"
          >
            <span>{isSaved ? "🔖 Saved" : "🔖 Save"}</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-[var(--brown)] bg-[var(--cream)] border border-[var(--line)] hover:bg-[var(--beige)] transition-all"
            title="Share with friends"
          >
            <span>🔗 Share</span>
          </button>
        </div>

        <button
          onClick={() => openGift(writer.n, writer.img)}
          className="btn btn-gift btn-sm sm:ml-auto"
        >
          🎁 Gift Writer
        </button>
      </div>

      {/* Author Support Box */}
      <div className="bg-[var(--beige)] border border-[var(--line)] rounded-[var(--r)] p-6 sm:p-8 flex items-center gap-6 flex-wrap sm:flex-nowrap shadow-sm">
        <img
          src={writer.img}
          alt={writer.n}
          className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md flex-shrink-0"
        />
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-serif text-2xl font-bold text-[var(--brown)]">{writer.n}</h4>
            <span className="text-xs text-[var(--muted)]">{writer.u}</span>
          </div>
          <p className="text-[var(--ink)] text-sm mt-1.5 leading-relaxed">
            {writer.bio || "Pencrack creator writing stories, verse, and essays that move people."}
          </p>
          <div className="flex items-center gap-5 text-xs font-semibold text-[var(--brown)] mt-3">
            <span><b>{writer.followers || "12.4k"}</b> Followers</span>
            <span><b>{writer.worksCount || 24}</b> Works Published</span>
            {writer.supportedAmt && (
              <span className="text-[var(--brown-600)]">🎁 {writer.supportedAmt} gifted</span>
            )}
          </div>
        </div>

        <div className="flex sm:flex-col gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleFollow}
            className={`btn btn-sm flex-1 sm:w-28 text-center transition-all ${
              isFollowing
                ? "bg-[var(--brown)] text-white"
                : "bg-white text-[var(--brown)] border border-[var(--line)] hover:bg-[var(--cream)]"
            }`}
          >
            {isFollowing ? "Following ✓" : "Follow"}
          </button>
          <button
            onClick={() => openGift(writer.n, writer.img)}
            className="btn btn-gift btn-sm flex-1 sm:w-28 text-center"
          >
            🎁 Gift
          </button>
        </div>
      </div>
    </div>
  );
}
