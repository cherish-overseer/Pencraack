"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Sparkles, Send } from "lucide-react";

export default function AbimbolaNewsletter() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    const subject = encodeURIComponent(`[Pen Crack Letters] Subscription from ${firstName || email}`);
    const body = encodeURIComponent(
      `Hello Pen Crack Studio,\n\nPlease subscribe me to the bi-monthly Letters from Pen Crack.\n\nFirst Name: ${firstName}\nEmail: ${email}`
    );

    // Launch mailto trigger
    window.location.href = `mailto:pencrack684@gmail.com?subject=${subject}&body=${body}`;

    // Send payload to background endpoint
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: firstName,
        email: email,
        message: "Bi-monthly Letters Subscription Request",
        formType: "Newsletter Letters Subscription",
      }),
    }).catch(() => {});

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <section id="newsletter" className="py-20 lg:py-28 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-2 text-brand-600 text-xs font-bold tracking-[0.2em] uppercase bg-brand-600/10 px-3.5 py-1.5 rounded-full border border-brand-600/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Letters from Pen Crack</span>
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-600 leading-tight">
              Words worth receiving, in your{" "}
              <em className="text-[#823919] not-italic italic font-heading">inbox.</em>
            </h2>

            <div className="space-y-4 text-black text-base sm:text-lg font-serif leading-relaxed">
              <p>
                Twice a month, we send something real. A craft reflection. A literary essay. An editorial guideline we have been sitting with. The kind of thing you read slowly, over coffee, when you want to think about your writing on purpose.
              </p>
              <p className="font-heading text-lg italic text-brand-600 font-bold">
                This is not a newsletter. These are letters.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-sm font-serif text-black">
                <span className="text-brand-600 font-bold text-base select-none mt-0.5">—</span>
                <span>A curated letter every two weeks</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm font-serif text-black">
                <span className="text-brand-600 font-bold text-base select-none mt-0.5">—</span>
                <span>Reflections on writing craft, clarity, and literary architecture</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm font-serif text-black">
                <span className="text-brand-600 font-bold text-base select-none mt-0.5">—</span>
                <span>Early access to new book publications, anthologies, and services</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-surface rounded-3xl p-8 sm:p-10 shadow-xl border border-border">
              {submitted ? (
                <div className="text-center space-y-4 py-8 animate-fade-up">
                  <CheckCircle className="w-12 h-12 text-brand-600 mx-auto" />
                  <h3 className="text-2xl font-bold text-brand-600 font-heading">
                    Welcome to the Letters
                  </h3>
                  <p className="text-black text-sm font-serif">
                    Thank you, <strong>{firstName || "friend"}</strong>. Your email has been added to our bi-monthly distribution. Look out for our next letter in your inbox.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-6 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition-colors font-heading"
                  >
                    Subscribe Another Email
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-heading text-2xl font-bold text-brand-600 mb-2">
                    Get the Letters
                  </h3>
                  <p className="text-black text-xs font-serif mb-6">
                    Start receiving Pen Crack's bi-monthly letters. Add your details below.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-black text-xs font-semibold uppercase tracking-wider mb-1 font-heading">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-brand-600 focus:outline-none text-black font-serif text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-black text-xs font-semibold uppercase tracking-wider mb-1 font-heading">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-brand-600 focus:outline-none text-black font-serif text-sm transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold tracking-wide rounded-full transition-all shadow-md active:scale-95 disabled:opacity-50 font-heading mt-2"
                    >
                      <span>{loading ? "Subscribing..." : "Send me the letters"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <p className="text-muted text-[11px] italic mt-4 text-center font-serif">
                    Bi-monthly. Thoughtful. You can unsubscribe anytime, but we hope you stay.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
