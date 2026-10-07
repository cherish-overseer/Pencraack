"use client";

import { useState } from "react";
import { usePencrack } from "@/context/PencrackContext";

export default function ServiceRequestModal() {
  const { isServiceRequestOpen, closeServiceRequest, serviceRequestName, showToast } = usePencrack();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    details: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isServiceRequestOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const subject = encodeURIComponent(`[Pen Crack Service Brief] ${serviceRequestName || "Custom Project"} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Pen Crack Studio,\n\nService Requested: ${serviceRequestName}\nClient Name: ${formData.name}\nEmail: ${formData.email}\nEstimated Budget: ${formData.budget || "Not specified"}\n\nProject Scope & Guidelines:\n${formData.details}\n\nSubmitted via Pencrack Service Request Modal.`
    );

    // Launch mailto
    window.location.href = `mailto:pencrack684@gmail.com?subject=${subject}&body=${body}`;

    // Send payload to background endpoint
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        service: serviceRequestName,
        message: `Budget: ${formData.budget}\nDetails: ${formData.details}`,
        formType: "Service Brief Order",
      }),
    }).catch(() => {});

    setTimeout(() => {
      setLoading(false);
      closeServiceRequest();
      showToast("Service request sent! ✉️ A director will reach out within 24 hours.", "success");
      setFormData({ name: "", email: "", details: "", budget: "" });
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-[500] bg-[rgba(58,37,24,0.45)] backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && closeServiceRequest()}
    >
      <div className="bg-[var(--cream)] rounded-[var(--r-lg)] w-full max-w-[520px] shadow-[var(--shadow-lg)] overflow-hidden max-h-[92vh] overflow-y-auto">
        <div className="p-7 pb-0 relative">
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-xl text-[var(--brown)] grid place-items-center hover:bg-[var(--beige)] transition-colors"
            onClick={closeServiceRequest}
          >
            ✕
          </button>
          <h2 className="font-serif text-2xl font-bold text-[var(--brown)]">
            Request a Writing Service
          </h2>
          <p className="text-[var(--muted)] text-sm mt-1">
            No account needed — just tell us what you need.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-7 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--brown)] mb-1 uppercase tracking-wider">
              Service
            </label>
            <input
              type="text"
              readOnly
              value={serviceRequestName || "Custom Writing Project"}
              className="w-full p-3.5 border border-[var(--line)] rounded-xl font-sans text-sm bg-[var(--beige)] text-[var(--brown)] font-bold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--brown)] mb-1 uppercase tracking-wider">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3.5 border border-[var(--line)] rounded-xl font-sans text-sm bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--brown)] mb-1 uppercase tracking-wider">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3.5 border border-[var(--line)] rounded-xl font-sans text-sm bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--brown)] mb-1 uppercase tracking-wider">
              Project Details *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe your project, target deadline, word count, and guidelines..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full p-3.5 border border-[var(--line)] rounded-xl font-sans text-sm bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--brown)] mb-1 uppercase tracking-wider">
              Estimated Budget (optional)
            </label>
            <input
              type="text"
              placeholder="e.g. ₦50,000"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full p-3.5 border border-[var(--line)] rounded-xl font-sans text-sm bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary justify-center py-3.5 text-base font-bold shadow-md disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>

          <p className="text-[var(--muted)] text-center text-xs">
            We’ll respond within 24 hours. No sign-up required.
          </p>
        </form>
      </div>
    </div>
  );
}
