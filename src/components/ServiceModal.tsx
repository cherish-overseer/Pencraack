"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, Clock, ShieldCheck, Send, Sparkles, FileText } from "lucide-react";

export interface ServiceDetail {
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  turnaround: string;
  guarantee: string;
}

export const SERVICE_DETAILS_MAP: Record<string, ServiceDetail> = {
  "Copywriting": {
    title: "Copywriting",
    category: "Creative & Commercial",
    shortDesc: "Persuasive narrative construction designed to convert.",
    fullDesc: "Our master copywriters craft high-converting landing page copy, sales letters, brand narratives, and promotional campaigns. We combine consumer psychology with crystalline prose to give your brand authoritative market presence.",
    deliverables: ["Conversion-Optimized Sales Copy", "Brand Tone & Style Guide", "2 Rounds of Revision", "Headline & Hook Variations"],
    turnaround: "3 - 5 Business Days",
    guarantee: "100% Original & Tone-Guaranteed",
  },
  "Editing": {
    title: "Editing & Line Proofing",
    category: "Creative & Commercial",
    shortDesc: "Refining raw drafts into polished masterpieces.",
    fullDesc: "Comprehensive line editing, structural reorganization, and stylistic refinement. We polish your syntax, fix pacing, and eliminate awkward phrasing while preserving your distinct authorial voice.",
    deliverables: ["Tracked Changes Document", "Clean Final Master Draft", "Editorial Feedback Summary", "Word Count & Flow Optimization"],
    turnaround: "2 - 4 Business Days",
    guarantee: "Journal & Publisher Ready",
  },
  "Poetry": {
    title: "Poetry & Lyrical Verse",
    category: "Creative & Commercial",
    shortDesc: "Lyrical composition and structural verse analysis.",
    fullDesc: "Custom poetic compositions for books, special commissions, literary journals, or performance. Our poets bring deep mastery of meter, imagery, and emotion to every line.",
    deliverables: ["Original Metric Verse", "Poetic Form Analysis", "Rhyme & Rhythm Calibration", "Publication Rights Included"],
    turnaround: "3 - 5 Business Days",
    guarantee: "Unique Literary Composition",
  },
  "Technical Writing": {
    title: "Technical Writing",
    category: "Creative & Commercial",
    shortDesc: "Simplifying complex systems into accessible documentation.",
    fullDesc: "Clear, structured technical documentation, API guides, user manuals, and system architecture briefs. We turn dense engineering concepts into intuitive, user-friendly reading.",
    deliverables: ["User Manuals & API Documentation", "System Architecture Diagrams", "Technical Glossary", "Markdown & HTML Export"],
    turnaround: "4 - 7 Business Days",
    guarantee: "Accuracy & Clarity Certified",
  },
  "Grant Writing": {
    title: "Grant Proposals",
    category: "Creative & Commercial",
    shortDesc: "Strategic proposals designed to secure high-impact funding.",
    fullDesc: "High-stakes grant applications, NGO proposals, and institutional funding briefs. We align your project goals with grantor metrics to maximize approval rates.",
    deliverables: ["Full Grant Application Brief", "Budget Narrative & Justification", "Executive Summary Deck", "Reviewer Criterion Alignment"],
    turnaround: "5 - 8 Business Days",
    guarantee: "Grantor Guideline Compliant",
  },
  "Scriptwriting": {
    title: "Scriptwriting",
    category: "Creative & Commercial",
    shortDesc: "Narrative architecture for film, stage, and digital media.",
    fullDesc: "Professional screenplays, video scripts, audio drama scripts, and podcast narrative arcs. Written in standard Hollywood formatting with vivid scene directions.",
    deliverables: ["Industry-Standard Screenplay", "Scene Breakdown & Character Arc", "Dialogue Polish", "Production Note Sheet"],
    turnaround: "5 - 10 Business Days",
    guarantee: "Industry Standard Format",
  },
  "Newsletter": {
    title: "Newsletter & Email Copy",
    category: "Creative & Commercial",
    shortDesc: "Engaging email campaigns delivered directly to your audience.",
    fullDesc: "Serialized newsletter issues, welcome sequences, and promotional email blasts designed to maintain open rates above 45% and build deep subscriber trust.",
    deliverables: ["5-Part Email Sequence", "Subject Line A/B Variations", "Preview Text Hooks", "Call-to-Action Buttons"],
    turnaround: "2 - 3 Business Days",
    guarantee: "High Open & Click Guarantee",
  },
  "Proofreading": {
    title: "Proofreading",
    category: "Creative & Commercial",
    shortDesc: "The final line of defense against linguistic imperfection.",
    fullDesc: "Meticulous grammar, punctuation, spelling, and typography checks. We catch typos, misplaced commas, and formatting glitches right before printing or publishing.",
    deliverables: ["Errata & Typo Correction Report", "Clean Print-Ready PDF/Word", "Style Guide Verification", "Final Sign-off Certificate"],
    turnaround: "1 - 2 Business Days",
    guarantee: "Zero-Typo Quality Standard",
  },
  "Thesis Support": {
    title: "Thesis & Dissertation Support",
    category: "Academic & Research",
    shortDesc: "Structural and linguistic guidance for Master's & PhD candidates.",
    fullDesc: "Rigorous academic editing, citation verification (APA, Chicago, MLA, IEEE), methodology alignment, and literature review editing for academic researchers.",
    deliverables: ["Full Dissertation Line Edit", "APA/Chicago Citation Audit", "Argument Flow & Chapter Breakdown", "Defense Question Preparation Notes"],
    turnaround: "5 - 10 Business Days",
    guarantee: "100% Academic Integrity Guarantee",
  },
  "White Papers": {
    title: "Corporate White Papers",
    category: "Academic & Research",
    shortDesc: "Authoritative reports that establish B2B thought leadership.",
    fullDesc: "Data-backed white papers and industry intelligence reports. Designed to position your enterprise as an undisputed market authority and generate warm executive leads.",
    deliverables: ["10-15 Page Authoritative Report", "Custom Data Tables & Charts", "Executive Summary", "PDF Layout Ready for Download"],
    turnaround: "6 - 9 Business Days",
    guarantee: "Data & Source Verified",
  },
  "UX Writing": {
    title: "UX & Product Writing",
    category: "Product & Digital",
    shortDesc: "Digital product microcopy and user journey messaging.",
    fullDesc: "Intuitive interface copy, button labels, onboarding modals, and error messages that guide users effortlessly through web and mobile applications.",
    deliverables: ["Interface Microcopy Spreadsheet", "Figma Component Text Alignment", "User Onboarding Flow", "Error & Empty State Messages"],
    turnaround: "3 - 5 Business Days",
    guarantee: "Usability & Clarity Guaranteed",
  },
  "Content Strategy": {
    title: "Content Strategy & Roadmaps",
    category: "Strategic Planning",
    shortDesc: "Editorial planning, topical authority, and content roadmaps.",
    fullDesc: "Comprehensive 6-month content calendars, keyword cluster strategies, and publishing roadmaps designed to establish domain authority and organic search dominance.",
    deliverables: ["6-Month Content Roadmap", "Topic Cluster Blueprint", "SEO Keyword Matrix", "Content Governance Guide"],
    turnaround: "5 - 7 Business Days",
    guarantee: "Organic Growth Aligned",
  },
  "Transcreation": {
    title: "Transcreation & Localization",
    category: "Global Content",
    shortDesc: "Cultural translation and localized voice adaptation.",
    fullDesc: "Adapting marketing messaging, literary works, or corporate campaigns into global languages while preserving tone, humor, and cultural relevance.",
    deliverables: ["Cultural Nuance Audit", "Localized Master Draft", "Bilingual Comparative Grid", "Market Feedback Summary"],
    turnaround: "4 - 6 Business Days",
    guarantee: "Cultural Accuracy Certified",
  },
  "Speech Writing": {
    title: "Executive Speech Writing",
    category: "Public Address",
    shortDesc: "Keynotes, commencement speeches, and public addresses.",
    fullDesc: "Memorable keynote addresses and executive remarks crafted for impact, emotional resonance, and natural spoken delivery.",
    deliverables: ["Full Speech Script with Delivery Cues", "Executive Summary Card", "Pacing & Emphasis Notation", "Audio Rehearsal Track"],
    turnaround: "3 - 5 Business Days",
    guarantee: "Audience Impact Guaranteed",
  },
  "Resume Design": {
    title: "Executive Resume & Bio Design",
    category: "Professional Branding",
    shortDesc: "Professional CVs, executive bios, and LinkedIn profiles.",
    fullDesc: "ATS-optimized executive resumes, compelling executive biographies, and high-impact LinkedIn profiles designed to attract top recruiters.",
    deliverables: ["ATS-Formatted Executive Resume", "1-Page Executive Biography", "Optimized LinkedIn Profile Text", "Cover Letter Template"],
    turnaround: "2 - 3 Business Days",
    guarantee: "ATS & Recruiter Approved",
  },
  "Press Releases": {
    title: "Media Press Releases",
    category: "Public Relations",
    shortDesc: "Media-ready announcements for journalists and news outlets.",
    fullDesc: "AP-style press releases that grab journalist attention, featuring killer headlines, strong quotes, and media kit boilerplate text.",
    deliverables: ["AP-Style Press Release", "Executive Quotes & Media Kit Text", "Journalist Pitch Email Draft", "Distribution Checklist"],
    turnaround: "1 - 2 Business Days",
    guarantee: "AP-Style Compliant",
  },
};

interface ServiceModalProps {
  serviceName: string | null;
  onClose: () => void;
}

export default function ServiceModal({ serviceName, onClose }: ServiceModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    wordCount: "",
    deadline: "",
    brief: "",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!serviceName) return null;

  const detail: ServiceDetail = SERVICE_DETAILS_MAP[serviceName] || {
    title: serviceName,
    category: "Editorial Service",
    shortDesc: "Tailored editorial and writing solutions provided by Pen Crack Studio.",
    fullDesc: "Our team of senior editors, ghostwriters, and researchers deliver publication-grade prose crafted to your exact specifications.",
    deliverables: ["Publication-Ready Draft", "Line Edit & Proofreading", "Tracked Changes", "Dedicated Editor Consultation"],
    turnaround: "3 - 5 Business Days",
    guarantee: "100% Originality & Quality Guaranteed",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const subject = encodeURIComponent(`[Pen Crack Service Brief] ${detail.title} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Pen Crack Studio,\n\nI would like to commission ${detail.title}.\n\nClient Name: ${formData.name}\nClient Email: ${formData.email}\nWord Count Scope: ${formData.wordCount}\nTarget Deadline: ${formData.deadline}\n\nProject Instructions & Guidelines:\n${formData.brief}\n\nSubmitted via Pen Crack Service Modal.`
    );

    // Launch default email client directly to pencrack684@gmail.com
    window.location.href = `mailto:pencrack684@gmail.com?subject=${subject}&body=${body}`;

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        service: detail.title,
        wordCount: formData.wordCount,
        deadline: formData.deadline,
        message: formData.brief,
        formType: `Service Brief Order (${detail.title})`,
      }),
    }).catch(() => {});

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-up overflow-y-auto">
      <div className="bg-surface border border-border rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6 sm:p-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-background border border-border hover:bg-brand-600 hover:text-white transition-colors text-black z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 border-b border-border pb-6 pr-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-600/10 text-brand-600 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{detail.category}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-600 font-heading">
            {detail.title}
          </h2>

          <p className="text-black text-base sm:text-lg font-serif">
            {detail.shortDesc}
          </p>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Left Column: Service Details & Deliverables (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black font-heading">
                Service Overview
              </h3>
              <p className="text-black text-sm font-serif leading-relaxed">
                {detail.fullDesc}
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black font-heading flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-brand-600" />
                Key Deliverables
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-serif text-black">
                {detail.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline & Guarantee Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/80">
              <div className="bg-background p-3.5 rounded-2xl border border-border flex items-center gap-3">
                <Clock className="w-5 h-5 text-brand-600 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted block">Turnaround</span>
                  <span className="text-xs font-bold text-black font-serif">{detail.turnaround}</span>
                </div>
              </div>

              <div className="bg-background p-3.5 rounded-2xl border border-border flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted block">Guarantee</span>
                  <span className="text-xs font-bold text-black font-serif">{detail.guarantee}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Service Order Form (6 cols) */}
          <div className="lg:col-span-6 bg-background p-6 rounded-2xl border border-border/80">
            {submitted ? (
              <div className="text-center space-y-4 py-8 animate-fade-up">
                <CheckCircle className="w-12 h-12 text-brand-600 mx-auto" />
                <h3 className="text-2xl font-bold text-brand-600 font-heading">
                  Request Received!
                </h3>
                <p className="text-black text-sm font-serif">
                  Thank you for ordering <strong>{detail.title}</strong>. Our senior editorial director will review your specifications and contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition-colors"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-brand-600 font-heading border-b border-border pb-2">
                  Request a Quote / Brief
                </h3>

                <div>
                  <label className="block text-black text-xs font-semibold uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border focus:border-brand-600 focus:outline-none text-black font-serif text-sm"
                  />
                </div>

                <div>
                  <label className="block text-black text-xs font-semibold uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border focus:border-brand-600 focus:outline-none text-black font-serif text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-black text-xs font-semibold uppercase tracking-wider mb-1">
                      Word Count / Scope
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5,000 words"
                      value={formData.wordCount}
                      onChange={(e) => setFormData({ ...formData, wordCount: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border focus:border-brand-600 focus:outline-none text-black font-serif text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-black text-xs font-semibold uppercase tracking-wider mb-1">
                      Target Deadline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aug 30, 2026"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border focus:border-brand-600 focus:outline-none text-black font-serif text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-black text-xs font-semibold uppercase tracking-wider mb-1">
                    Project Guidelines / Details *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide specific guidelines, topic details, citation styles, or goals..."
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border focus:border-brand-600 focus:outline-none text-black font-serif text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 disabled:opacity-50 font-heading"
                >
                  <span>{loading ? "Submitting..." : `ORDER ${detail.title.toUpperCase()}`}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
