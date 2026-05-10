"use client";

import { useEffect, useRef } from "react";
import { Locale, contentByLocale } from "../data/content";

export function Services({ locale }: { locale: Locale }) {
  const services = contentByLocale[locale].services.items;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const cards = cardRefs.current;
      cards.forEach((card, i) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const stickyTop = Number(card.dataset.stickyTop || 92);
        const overlap = Math.max(0, stickyTop - rect.top) / stickyTop;
        const remaining = cards.length - 1 - i;
        if (remaining > 0) {
          const scale = Math.max(0.9, 1 - overlap * 0.04 * remaining);
          const opacity = Math.max(0.62, 1 - overlap * 0.22);
          card.style.transform = `scale(${scale})`;
          card.style.opacity = String(opacity);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="services" className="services-section">
      <div className="shell">
        <div className="services-stack">
          {services.map((service, i) => (
            <div
              key={service.num}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="service-card"
              data-sticky-top={96 + i * 16}
              style={{ top: `${96 + i * 16}px` }}
            >
              <div className="service-card-inner">
                <span className="service-ghost-num" aria-hidden>
                  {service.num}
                </span>
                <div>
                  <h3 className="service-title">
                    <span className="slash">/</span>
                    {service.title}
                  </h3>
                  <p className="service-desc">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
