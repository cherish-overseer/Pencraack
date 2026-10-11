"use client";

import { useState } from "react";
import { usePencrack } from "@/context/PencrackContext";

export default function GiftModal() {
  const { isGiftOpen, closeGift, giftRecipient, showToast, initiateGift, isLoggedIn, openAuth } = usePencrack();
  const [selectedAmt, setSelectedAmt] = useState<number>(1000);
  const [customAmt, setCustomAmt] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  if (!isGiftOpen || !giftRecipient) return null;

  const handlePickAmt = (val: number) => {
    setSelectedAmt(val);
    setCustomAmt("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmt(e.target.value);
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setSelectedAmt(parsed);
    }
  };

  const handlePay = async () => {
    const finalAmt = customAmt ? parseInt(customAmt, 10) || 500 : selectedAmt;

    if (!isLoggedIn) {
      openAuth("login");
      return;
    }

    setLoading(true);
    const writerId = giftRecipient.writerId || "1";

    const res = await initiateGift(writerId, finalAmt, message);
    setLoading(false);

    if (res.success) {
      closeGift();
      showToast(
        `Payment initialized! Ref: ${res.reference || "PC-GFT"}. ${
          res.checkoutUrl ? "Redirecting to checkout..." : "Thank you for supporting!"
        }`,
        "success"
      );
      if (res.checkoutUrl && typeof window !== "undefined") {
        window.location.href = res.checkoutUrl;
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[500] bg-[rgba(40,25,16,0.55)] backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && closeGift()}
    >
      <div className="bg-[#faf5ee] border border-[#e8dccb] rounded-[28px] w-full max-w-[500px] shadow-[0_24px_60px_rgba(58,37,24,0.22)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* ===================== HEADER ===================== */}
        <div className="p-6 sm:p-7 pb-4 relative border-b border-[#ebdcca] bg-[#fbf8f2]">
          <button
            type="button"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-600 grid place-items-center transition-colors cursor-pointer text-sm font-bold"
            onClick={closeGift}
            aria-label="Close dialog"
          >
            ✕
          </button>

          <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[var(--gold)] block mb-1">
            Author Appreciation
          </span>
          <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[var(--brown)] leading-tight">
            🎁 Support this Creator
          </h2>
          <p className="text-[var(--muted)] text-xs sm:text-[13px] mt-1 leading-relaxed">
            Your gift is credited instantly to the author&apos;s ledger wallet.
          </p>
        </div>

        {/* ===================== BODY ===================== */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-5">
          {/* Writer preview badge */}
          <div className="bg-white border border-[#e2d2be] rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
            <img
              src={giftRecipient.img}
              alt={giftRecipient.name}
              className="w-13 h-13 rounded-full object-cover border-2 border-[var(--gold)]"
            />
            <div>
              <div className="font-serif font-bold text-base text-[var(--brown)]">{giftRecipient.name}</div>
              <div className="text-[var(--muted)] text-xs">Pencrack Verified Author &amp; Creator</div>
            </div>
          </div>

          {/* Amount selector pills */}
          <div>
            <label className="modal-label">Choose an Amount</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[500, 1000, 2500, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePickAmt(amt)}
                  className={`py-3 px-3 border rounded-xl font-mono font-bold text-xs transition-all text-center cursor-pointer ${
                    selectedAmt === amt && !customAmt
                      ? "bg-[var(--brown)] text-white border-[var(--brown)] shadow-xs scale-[1.02]"
                      : "bg-white text-[var(--brown)] border-[#e2d2be] hover:border-[var(--brown)]"
                  }`}
                >
                  ₦{amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div>
            <label className="modal-label">Or Custom Amount (₦)</label>
            <input
              type="number"
              placeholder="e.g. 10000"
              value={customAmt}
              onChange={handleCustomChange}
              className="modal-input font-mono"
            />
          </div>

          {/* Note of encouragement */}
          <div>
            <label className="modal-label">
              Words of Appreciation <span className="text-[var(--muted)] font-normal text-[11px]">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Thank you for this captivating prose! Keep writing."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="modal-input"
            />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handlePay}
            className="w-full btn btn-gift justify-center py-3.5 text-sm font-bold shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Preparing Payment...</span>
              </>
            ) : (
              <span>
                Gift ₦{(customAmt ? parseInt(customAmt, 10) || 500 : selectedAmt).toLocaleString()} to {giftRecipient.name}
              </span>
            )}
          </button>

          <p className="text-[var(--muted)] text-center text-[11px] font-mono">
            🔒 Double-entry ledger verified · Paystack Direct Checkout
          </p>
        </div>
      </div>
    </div>
  );
}
