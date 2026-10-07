"use client";

import { useState } from "react";
import { usePencrack } from "@/context/PencrackContext";

export default function GiftModal() {
  const { isGiftOpen, closeGift, giftRecipient, showToast } = usePencrack();
  const [selectedAmt, setSelectedAmt] = useState<number>(500);
  const [customAmt, setCustomAmt] = useState<string>("");
  const [message, setMessage] = useState<string>("");

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

  const handlePay = () => {
    const finalAmt = customAmt ? parseInt(customAmt, 10) || 500 : selectedAmt;
    closeGift();
    showToast(`Gift sent! 🎁 You gifted ₦${finalAmt.toLocaleString()} to ${giftRecipient.name}.`, "success");
  };

  return (
    <div
      className="fixed inset-0 z-[500] bg-[rgba(58,37,24,0.45)] backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && closeGift()}
    >
      <div className="bg-[var(--cream)] rounded-[var(--r-lg)] w-full max-w-[520px] shadow-[var(--shadow-lg)] overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="p-7 pb-0 relative">
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-xl text-[var(--brown)] grid place-items-center hover:bg-[var(--beige)] transition-colors"
            onClick={closeGift}
          >
            ✕
          </button>
          <h2 className="font-serif text-2xl font-bold text-[var(--brown)]">
            🎁 Support this writer
          </h2>
          <p className="text-[var(--muted)] text-sm mt-1">
            Your gift goes directly to the writer. Thank you for valuing their work.
          </p>
        </div>

        {/* Body */}
        <div className="p-7 space-y-5">
          {/* Writer preview */}
          <div className="bg-white border border-[var(--line)] rounded-2xl p-4 flex items-center gap-3">
            <img
              src={giftRecipient.img}
              alt={giftRecipient.name}
              className="w-12 h-12 rounded-full object-cover border border-[var(--beige-2)]"
            />
            <div>
              <div className="font-bold text-[var(--brown)]">{giftRecipient.name}</div>
              <div className="text-[var(--muted)] text-xs">Pencrack Author & Creator</div>
            </div>
          </div>

          <div>
            <div className="font-semibold text-[var(--brown)] text-sm mb-2">Choose an amount</div>
            <div className="grid grid-cols-2 gap-3">
              {[500, 1000, 2000, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePickAmt(amt)}
                  className={`py-3.5 px-4 border rounded-xl font-serif font-bold text-base transition-all text-center ${
                    selectedAmt === amt && !customAmt
                      ? "bg-[var(--brown)] text-white border-[var(--brown)] shadow-sm"
                      : "bg-white text-[var(--brown)] border-[var(--line)] hover:border-[var(--accent)]"
                  }`}
                >
                  ₦{amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--brown)] mb-1 uppercase tracking-wider">
              Custom amount
            </label>
            <input
              type="number"
              placeholder="Enter amount in ₦"
              value={customAmt}
              onChange={handleCustomChange}
              className="w-full p-3.5 border border-[var(--line)] rounded-xl font-sans text-sm bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <div className="font-semibold text-[var(--brown)] text-sm mb-2">Payment method</div>
            <div className="flex gap-2.5">
              <div className="flex-1 border border-[var(--brown)] bg-[var(--beige)] rounded-xl py-2.5 text-center font-semibold text-xs text-[var(--brown-700)] cursor-pointer">
                💳 Card
              </div>
              <div className="flex-1 border border-[var(--line)] bg-white rounded-xl py-2.5 text-center font-semibold text-xs text-[var(--brown-700)] cursor-pointer">
                🏦 Bank
              </div>
              <div className="flex-1 border border-[var(--line)] bg-white rounded-xl py-2.5 text-center font-semibold text-xs text-[var(--brown-700)] cursor-pointer">
                📱 USSD
              </div>
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Add a message of encouragement (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3.5 border border-[var(--line)] rounded-xl font-sans text-sm bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <button
            type="button"
            onClick={handlePay}
            className="w-full btn btn-gift justify-center py-3.5 text-base font-bold shadow-md"
          >
            Gift ₦{(customAmt ? parseInt(customAmt, 10) || 500 : selectedAmt).toLocaleString()} securely
          </button>

          <p className="text-[var(--muted)] text-center text-xs">
            🔒 Encrypted &amp; secure · Demo payment
          </p>
        </div>
      </div>
    </div>
  );
}
