"use client";

import { useState, useEffect } from "react";
import { usePencrack } from "@/context/PencrackContext";

export default function ServiceRequestModal() {
  const {
    isServiceRequestOpen,
    closeServiceRequest,
    serviceRequestName,
    serviceRequestSlug,
    submitServiceRequest,
    showToast,
  } = usePencrack();

  const [servicesList, setServicesList] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    deadline: "",
    details: "",
  });
  const [customFieldValues, setCustomFieldValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  // Fetch services catalogue to match service and retrieve dynamic schema
  useEffect(() => {
    if (!isServiceRequestOpen) {
      setSuccessRef(null);
      return;
    }

    fetch("/api/v1/services")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setServicesList(json.data);
          const found = json.data.find(
            (s: any) =>
              s.name.toLowerCase() === serviceRequestName.toLowerCase() ||
              (serviceRequestSlug && s.slug === serviceRequestSlug)
          );
          setSelectedService(found || json.data[0]);
        }
      })
      .catch(() => {});
  }, [isServiceRequestOpen, serviceRequestName, serviceRequestSlug]);

  if (!isServiceRequestOpen) return null;

  const handleCustomFieldChange = (fieldName: string, val: string) => {
    setCustomFieldValues((prev) => ({ ...prev, [fieldName]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dynamicFieldsArray =
      selectedService?.fields?.map((f: any) => ({
        fieldId: f.id,
        fieldName: f.fieldName,
        fieldValue: customFieldValues[f.fieldName] || "",
      })) || [];

    if (formData.details) {
      dynamicFieldsArray.push({
        fieldName: "Project Scope & Details",
        fieldValue: formData.details,
      });
    }

    const payload = {
      serviceId: selectedService ? Number(selectedService.id) : 1,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone || undefined,
      budgetEstimate: formData.budget || undefined,
      deadlineDate: formData.deadline || undefined,
      fields: dynamicFieldsArray,
    };

    const res = await submitServiceRequest(payload);
    setLoading(false);

    if (res.success && res.reference) {
      setSuccessRef(res.reference);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[500] bg-[rgba(40,25,16,0.55)] backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && closeServiceRequest()}
    >
      <div className="bg-[#faf5ee] border border-[#e8dccb] rounded-[28px] w-full max-w-[560px] shadow-[0_24px_60px_rgba(58,37,24,0.22)] overflow-hidden max-h-[92vh] flex flex-col">
        {/* ===================== HEADER ===================== */}
        <div className="p-6 sm:p-7 pb-4 relative border-b border-[#ebdcca] bg-[#fbf8f2]">
          <button
            type="button"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-600 grid place-items-center transition-colors cursor-pointer text-sm font-bold"
            onClick={closeServiceRequest}
            aria-label="Close dialog"
          >
            ✕
          </button>

          <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[var(--accent)] block mb-1">
            Writing Marketplace Brief
          </span>
          <h2 className="font-serif text-2xl sm:text-[26px] font-bold text-[var(--brown)] leading-tight">
            Request Writing Service
          </h2>
          <p className="text-[var(--muted)] text-xs sm:text-[13px] mt-1 leading-relaxed">
            Submit your project guidelines directly to our editorial directors and vetted writers.
          </p>
        </div>

        {/* ===================== BODY ===================== */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-5">
          {successRef ? (
            <div className="p-6 space-y-5 text-center bg-white rounded-2xl border border-[#e8dccb]">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-3xl font-bold shadow-xs">
                ✓
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[var(--brown)]">
                  Brief Received Successfully!
                </h3>
                <p className="text-xs text-[var(--muted)] mt-1.5 leading-relaxed">
                  Your project brief has been recorded in the database. Our editorial team will review your scope and assign a specialist.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#faf5ee] border border-[#e2d2be]">
                <span className="text-[11px] uppercase text-[var(--muted)] font-bold tracking-wider block font-mono">
                  Project Tracking Code
                </span>
                <span className="font-mono text-xl font-bold text-[var(--brown)] tracking-wider mt-1 block select-all">
                  {successRef}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(successRef);
                    showToast("Tracking code copied to clipboard! 📋", "success");
                  }}
                  className="btn btn-soft flex-1 justify-center py-3 text-xs font-bold cursor-pointer"
                >
                  Copy Code
                </button>
                <button
                  type="button"
                  onClick={closeServiceRequest}
                  className="btn btn-primary flex-1 justify-center py-3 text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Service Badge */}
              <div>
                <label className="modal-label">Selected Service</label>
                <div className="w-full px-4 py-3 border border-[#e2d2be] rounded-xl font-sans text-sm bg-white text-[var(--brown)] font-bold flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base text-[var(--accent)]">✎</span>
                    <span>{selectedService ? selectedService.name : serviceRequestName || "Custom Project"}</span>
                  </div>
                  {selectedService?.category && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--beige)] text-[var(--brown-700)]">
                      {selectedService.category.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="modal-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name or company"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="modal-input"
                  />
                </div>

                <div>
                  <label className="modal-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="modal-input"
                  />
                </div>
              </div>

              {/* Phone & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="modal-label">
                    Phone <span className="text-[var(--muted)] font-normal text-[11px]">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="modal-input"
                  />
                </div>

                <div>
                  <label className="modal-label">Estimated Budget</label>
                  <input
                    type="text"
                    placeholder="e.g. ₦65,000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="modal-input"
                  />
                </div>
              </div>

              {/* Dynamic Service-Specific Fields */}
              {selectedService?.fields && selectedService.fields.length > 0 && (
                <div className="p-4 bg-white rounded-2xl border border-[#e2d2be] space-y-3.5 shadow-xs">
                  <span className="text-xs font-bold text-[var(--brown)] uppercase tracking-wider block font-mono border-b border-[#f0e4d5] pb-2">
                    Service Specific Requirements
                  </span>
                  <div className="space-y-3">
                    {selectedService.fields.map((f: any) => (
                      <div key={f.fieldName || f.name}>
                        <label className="modal-label !mb-1 text-xs">
                          {f.fieldName || f.name} {f.isRequired && <span className="text-rose-500">*</span>}
                        </label>
                        <input
                          type="text"
                          required={f.isRequired}
                          placeholder={f.placeholder || `Enter ${f.fieldName || f.name}`}
                          value={customFieldValues[f.fieldName || f.name] || ""}
                          onChange={(e) =>
                            handleCustomFieldChange(f.fieldName || f.name, e.target.value)
                          }
                          className="modal-input !h-10 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Guidelines */}
              <div>
                <label className="modal-label">Project Scope &amp; Instructions *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your desired style, word count, key themes, target audience, or references..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full p-3.5 border border-[#e7dbcd] rounded-xl font-sans text-sm bg-white text-[var(--ink)] focus:outline-none focus:border-[var(--brown)] focus:ring-2 focus:ring-[#c9a15f]/20 resize-y leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary justify-center py-3.5 text-sm font-bold shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Project Brief...</span>
                  </>
                ) : (
                  <span>Submit Project Brief</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
