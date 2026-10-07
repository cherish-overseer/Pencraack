"use client";

import { usePencrack } from "@/context/PencrackContext";

export default function ToastContainer() {
  const { toasts } = usePencrack();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[700] flex flex-col gap-2.5 items-center pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-6 py-3.5 rounded-full font-semibold text-sm shadow-xl flex items-center gap-2.5 animate-bounce-short text-white ${
            toast.type === "err" ? "bg-[#b4453f]" : "bg-[var(--brown)]"
          }`}
        >
          <span>{toast.type === "err" ? "⚠️" : "✔"}</span>
          <span>{toast.msg}</span>
        </div>
      ))}
    </div>
  );
}
