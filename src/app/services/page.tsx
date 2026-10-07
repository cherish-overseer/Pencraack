"use client";

import { usePencrack } from "@/context/PencrackContext";
import { SERVICES_CREATIVE, SERVICES_ACADEMIC } from "@/data/pencrackData";
import { ServiceCard } from "@/components/ContentCards";

export default function ServicesPage() {
  const { openServiceRequest } = usePencrack();

  return (
    <div className="w-full">
      <div className="pagehead">
        <div className="wrap">
          <div className="eyebrow">No account needed</div>
          <h1>Professional writing services for every need.</h1>
          <p>
            From creative writing to technical and academic content, get quality writing support from skilled writers. Browse and request any service — no login required.
          </p>
          <div className="mt-5 flex gap-3 flex-wrap">
            <span className="pill">✔ Browse freely</span>
            <span className="pill">✔ Request without signing up</span>
            <span className="pill">✔ Vetted writers</span>
          </div>
        </div>
      </div>

      <section className="sec-pad bg-[var(--cream)]">
        <div className="wrap">
          {/* Creative & Commercial */}
          <div className="svc-cat-head">
            <span className="bar" />
            <h3>Creative &amp; Commercial</h3>
          </div>
          <div className="svc-grid">
            {SERVICES_CREATIVE.map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </div>

          {/* Academic & Research */}
          <div className="svc-cat-head mt-14">
            <span className="bar" />
            <h3>Academic &amp; Research</h3>
          </div>
          <div className="svc-grid">
            {SERVICES_ACADEMIC.map((service) => (
              <ServiceCard key={service.name} service={service} />
            ))}
          </div>

          {/* Custom Project Callout */}
          <div className="panel mt-12 text-center bg-[var(--brown)] text-white border-none p-10">
            <h3 className="text-white text-2xl font-serif">
              Can’t find exactly what you need?
            </h3>
            <p className="text-[#e6d3bf] my-3 max-w-lg mx-auto">
              Tell us about your project and our editorial directors will match you with the right specialist.
            </p>
            <button
              className="btn bg-white text-[var(--brown)] hover:bg-[var(--beige)] mt-2 font-bold"
              onClick={() => openServiceRequest("Custom Writing Project")}
            >
              Request a Custom Service
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
