"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function HelixContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Academic & Research Writing",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const subject = encodeURIComponent(`[Pen Crack Project Inquiry] ${formData.service} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Pen Crack Studio,\n\nFull Name: ${formData.name}\nEmail Address: ${formData.email}\nService Interested: ${formData.service}\n\nProject Details:\n${formData.message}\n\nSubmitted via Pen Crack Website Contact Form.`
    );

    const mailtoUrl = `mailto:pencrack684@gmail.com?subject=${subject}&body=${body}`;

    // Trigger HTML mailto link dispatch to open user's default email client
    window.location.href = mailtoUrl;

    // Also send background dispatch payload
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        message: formData.message,
        formType: "Contact Us Consultation",
      }),
    }).catch(() => {});

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <section className="w-full py-16 px-8 max-w-7xl mx-auto">
      <div className="bg-surface p-8 sm:p-12 md:p-16 rounded-3xl border border-border shadow-md relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <div className="text-center space-y-3">
            <span className="inline-block px-3 py-1 bg-brand-600/10 text-brand-600 rounded-full text-xs font-semibold uppercase tracking-wider">
              Project Consultation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-600 font-heading">
              Have Any Project on Your Mind?
            </h2>
            <p className="text-black text-base sm:text-lg font-serif max-w-xl mx-auto">
              Great! We're excited to hear from you. Fill out the form below to kickstart your project.
            </p>
          </div>

          {submitted ? (
            <div className="bg-brand-600/10 border border-brand-600/30 p-8 sm:p-10 rounded-2xl text-center space-y-4 animate-fade-up">
              <CheckCircle className="w-12 h-12 text-brand-600 mx-auto" />
              <h3 className="text-2xl font-bold text-brand-600 font-heading">
                Thank You for Reaching Out!
              </h3>
              <p className="text-black text-base font-serif max-w-md mx-auto">
                Your message has been received. Our editorial director will review your brief and reply within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold font-heading transition-colors shadow-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              action={`mailto:pencrack684@gmail.com?subject=${encodeURIComponent(`[Pen Crack Project Inquiry] ${formData.service} - ${formData.name}`)}`}
              method="POST"
              encType="text/plain"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-black text-xs font-semibold uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-brand-600 focus:outline-none text-black font-serif transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-black text-xs font-semibold uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. eleanor@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-brand-600 focus:outline-none text-black font-serif transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-black text-xs font-semibold uppercase tracking-wider mb-2">
                  Service Interest
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-brand-600 focus:outline-none text-black font-serif transition-colors"
                >
                  <option>Academic Thesis & Research Writing</option>
                  <option>Book Writing & Ghostwriting (Fiction/Non-Fiction)</option>
                  <option>Corporate Profile & Business Writing</option>
                  <option>Technical Writing & Grant Proposals</option>
                  <option>Editing, Proofreading & Transcreation</option>
                </select>
              </div>

              <div>
                <label className="block text-black text-xs font-semibold uppercase tracking-wider mb-2">
                  How Can We Help You? *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your project, target timeline, word count, or custom guidelines..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-brand-600 focus:outline-none text-black font-serif transition-colors"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-10 py-4 rounded-xl font-medium text-base transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                  <span>{loading ? "Sending..." : "SEND MESSAGE"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
