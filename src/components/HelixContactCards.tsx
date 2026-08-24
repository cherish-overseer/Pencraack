"use client";

import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";

export default function HelixContactCards() {
  const cards = [
    {
      icon: MapPin,
      title: "Location",
      line1: "Nigeria",
      line2: "Remote Global Hub",
      linkText: "Get direction",
      href: "https://maps.google.com",
    },
    {
      icon: Mail,
      title: "Email Address",
      line1: "hello@pencrack.com",
      line2: "pencrack684@gmail.com",
      linkText: "Send message",
      href: "mailto:hello@pencrack.com",
    },
    {
      icon: Phone,
      title: "Phone & WhatsApp",
      line1: "+234 816 806 0414",
      line2: "",
      linkText: "Call anytime",
      href: "tel:+2348168060414",
    },
  ];

  return (
    <section className="w-full py-12 px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="group bg-surface p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl hover:border-brand-600/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-600/10 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-brand-600 font-heading mb-3">
                    {card.title}
                  </h3>
                  <p className="text-black text-base font-serif font-medium leading-relaxed">
                    {card.line1}
                  </p>
                  <p className="text-black text-base font-serif leading-relaxed">
                    {card.line2}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border/80">
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-brand-600 font-bold text-sm tracking-wide group-hover:text-brand-700 transition-colors"
                >
                  <span>{card.linkText}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
