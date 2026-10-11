"use client";

import { useState, useEffect } from "react";
import { usePencrack } from "@/context/PencrackContext";
import { WRITERS, getImgUrl } from "@/data/pencrackData";

export default function ReaderModal() {
  const {
    isReaderOpen,
    closeReader,
    readerData,
    openGift,
    showToast,
    isLoggedIn,
    openAuth,
  } = usePencrack();

  const [fullContent, setFullContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isPaywalled, setIsPaywalled] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Comments state
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  // Initialize and fetch real content if slug exists
  useEffect(() => {
    if (!isReaderOpen || !readerData) {
      setFullContent(null);
      setIsPaywalled(false);
      setComments([]);
      return;
    }

    const slug =
      readerData.slug ||
      readerData.t?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    if (!isLoggedIn) {
      setIsPaywalled(true);
      setLikesCount(parseInt(readerData.likes) || 2431);
      return;
    }

    setIsPaywalled(false);
    setLoading(true);

    fetch(`/api/v1/content/${slug}`)
      .then((res) => {
        if (res.status === 401) {
          setIsPaywalled(true);
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then((json) => {
        if (json && json.success && json.data) {
          setFullContent(json.data);
          setLikesCount(json.data.likesCount || 0);
          setIsLiked(Boolean(json.data.isLiked));

          // Fetch comments
          if (json.data.id) {
            fetch(`/api/v1/content/${json.data.id}/comments`)
              .then((cRes) => cRes.json())
              .then((cJson) => {
                if (cJson.success && cJson.data) {
                  setComments(cJson.data);
                }
              })
              .catch(() => {});
          }
        }
      })
      .catch(() => {
        // Fallback to initial reader data if local offline
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isReaderOpen, readerData, isLoggedIn]);

  if (!isReaderOpen || !readerData) return null;

  const writer =
    fullContent?.author?.profile ||
    WRITERS[readerData.w] || {
      n: fullContent?.author?.profile?.fullName || "Adaeze Nwosu",
      img: fullContent?.author?.profile?.avatarUrl || "https://i.pravatar.cc/120?img=32",
      bio: fullContent?.author?.profile?.bio || "Pencrack storyteller",
    };

  const authorName = fullContent?.author?.profile?.fullName || writer.n || writer.fullName || "Author";
  const authorAvatar = fullContent?.author?.profile?.avatarUrl || writer.img || writer.avatarUrl || "https://i.pravatar.cc/120?img=32";
  const authorBio = fullContent?.author?.profile?.bio || writer.bio || "Pencrack Storyteller";
  const authorId = fullContent?.author?.id ? String(fullContent.author.id) : undefined;

  const coverImg =
    fullContent?.coverImageUrl ||
    readerData.cover ||
    getImgUrl(readerData.i || 0, 1000);

  const title = fullContent?.title || readerData.t;
  const contentType = fullContent?.type || readerData.c || readerData.contentType || "Story";

  const handleLike = async () => {
    if (!isLoggedIn) {
      openAuth("login");
      return;
    }

    const contentId = fullContent?.id || readerData.id;
    if (!contentId) return;

    try {
      const res = await fetch(`/api/v1/content/${contentId}/like`, { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setIsLiked(json.data.liked);
        setLikesCount(json.data.likesCount);
        showToast(json.data.liked ? "Liked ❤️" : "Unliked");
      }
    } catch {
      // Local fallback toggle
      setIsLiked(!isLiked);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!isLoggedIn) {
      openAuth("login");
      return;
    }

    const contentId = fullContent?.id;
    if (!contentId) return;

    setSubmittingComment(true);
    try {
      const res = await fetch(`/api/v1/content/${contentId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentText: newComment }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setComments((prev) => [json.data, ...prev]);
        setNewComment("");
        showToast("Comment posted! 💬", "success");
      }
    } catch {
      showToast("Could not post comment", "err");
    } finally {
      setSubmittingComment(false);
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
              className="inline-flex items-center gap-1.5 font-bold text-sm text-[var(--brown)] hover:text-[var(--brown-700)] cursor-pointer"
            >
              ← Close Reader
            </button>
            <span className="pill">{contentType}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--brown)] leading-tight mb-4">
            {title}
          </h1>

          <div className="flex items-center gap-3.5 pb-6 mb-6 border-b border-[var(--line)]">
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-11 h-11 rounded-full object-cover border border-[var(--beige-2)]"
            />
            <div>
              <div className="font-bold text-[var(--brown)] text-sm">{authorName}</div>
              <div className="text-[var(--muted)] text-xs">
                {readerData.d || "Oct 2026"} · {readerData.rt || "8 min read"}
              </div>
            </div>
          </div>

          <img
            src={coverImg}
            alt={title}
            className="w-full h-64 sm:h-80 object-cover rounded-[var(--r)] mb-8 shadow-sm"
          />

          {/* Paywall Gate vs Real Content */}
          {isPaywalled ? (
            <div className="space-y-6">
              <p className="font-serif text-lg text-[var(--ink)] leading-relaxed italic">
                {readerData.e || "The first letter arrived with the dry wind, its edges curled by heat and distance..."}
              </p>

              {/* Paywall Container */}
              <div className="bg-gradient-to-b from-white to-[var(--beige)] border border-[var(--line)] rounded-2xl p-8 text-center space-y-4 shadow-sm my-6">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center mx-auto text-xl font-bold">
                  🔒
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[var(--brown)]">
                    Sign in to Read the Full Piece
                  </h3>
                  <p className="text-sm text-[var(--muted)] max-w-md mx-auto mt-1">
                    Readers must be logged into Pencrack to unlock full stories, poems, comics, and support authors. Free to join.
                  </p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => openAuth("login")}
                    className="btn btn-primary px-6 py-2.5 text-sm font-bold"
                  >
                    Log In to Continue Reading
                  </button>
                  <button
                    onClick={() => openAuth("signup")}
                    className="btn btn-ghost px-5 py-2.5 text-sm font-bold"
                  >
                    Create Free Account
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="font-serif text-lg text-[var(--ink)] leading-relaxed space-y-6">
              {loading ? (
                <div className="py-12 text-center text-[var(--muted)]">
                  Loading reading experience...
                </div>
              ) : fullContent?.bodyContent ? (
                <div className="whitespace-pre-line leading-loose text-[var(--brown-900)]">
                  {fullContent.bodyContent}
                </div>
              ) : readerData.v ? (
                <div className="whitespace-pre-line italic text-xl text-[var(--brown-700)] leading-loose">
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
          )}

          {/* Reading Actions */}
          <div className="flex items-center gap-3 my-8 py-4 border-y border-[var(--line)] flex-wrap">
            <button
              onClick={handleLike}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                isLiked ? "text-rose-600 bg-rose-50" : "text-[var(--brown-700)] hover:bg-[var(--beige)]"
              }`}
            >
              <span>{isLiked ? "❤️" : "🤍"}</span>
              <span>{likesCount.toLocaleString()}</span>
            </button>
            <button
              onClick={() => showToast("Saved to your reading library", "success")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[var(--brown-700)] hover:bg-[var(--beige)] transition-colors cursor-pointer"
            >
              <span>🔖 Save</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                showToast("Link copied to clipboard!");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-[var(--brown-700)] hover:bg-[var(--beige)] transition-colors cursor-pointer"
            >
              <span>🔗 Share</span>
            </button>
            <button
              onClick={() => openGift(authorName, authorAvatar, authorId)}
              className="btn btn-gift btn-sm ml-auto"
            >
              🎁 Gift Writer
            </button>
          </div>

          {/* Author Box */}
          <div className="bg-[var(--beige)] rounded-[var(--r)] p-6 flex items-center gap-4 flex-wrap mb-8">
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="flex-1 min-w-[200px]">
              <h4 className="font-serif text-xl font-bold text-[var(--brown)]">{authorName}</h4>
              <p className="text-[var(--muted)] text-xs mt-0.5">{authorBio}</p>
              <div className="flex gap-4 text-xs font-bold text-[var(--brown)] mt-2">
                <span>Verified Author</span>
                <span>Active Writer</span>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={() => showToast(`Following ${authorName}`)}
                className="btn btn-ghost btn-sm bg-white"
              >
                Follow
              </button>
              <button
                onClick={() => openGift(authorName, authorAvatar, authorId)}
                className="btn btn-gift btn-sm"
              >
                🎁 Gift
              </button>
            </div>
          </div>

          {/* Reader Discussion / Comments Section */}
          <div className="pt-4 border-t border-[var(--line)] space-y-4">
            <h4 className="font-serif text-xl font-bold text-[var(--brown)]">
              Reader Discussion ({comments.length})
            </h4>

            {isLoggedIn ? (
              <form onSubmit={handlePostComment} className="flex gap-2.5">
                <input
                  type="text"
                  placeholder="Leave a thoughtful reaction or reflection..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 p-3 border border-[var(--line)] rounded-xl font-sans text-xs bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
                />
                <button
                  type="submit"
                  disabled={submittingComment || !newComment.trim()}
                  className="btn btn-primary btn-sm px-4 disabled:opacity-50"
                >
                  {submittingComment ? "Posting..." : "Comment"}
                </button>
              </form>
            ) : (
              <p className="text-xs text-[var(--muted)]">
                <button onClick={() => openAuth("login")} className="text-[var(--brown)] font-bold hover:underline">
                  Log in
                </button>{" "}
                to join the discussion and share your thoughts.
              </p>
            )}

            <div className="space-y-3 pt-2">
              {comments.map((c) => (
                <div key={c.id} className="p-3.5 bg-white rounded-xl border border-[var(--line)]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xs text-[var(--brown)]">
                      {c.user?.profile?.fullName || c.user?.username || "Reader"}
                    </span>
                    <span className="text-[10px] text-[var(--muted)]">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--ink)]">{c.commentText}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
