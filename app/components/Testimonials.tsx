"use client";

import { useEffect, useRef } from "react";
import { Locale, contentByLocale } from "../data/content";

export function Testimonials({ locale }: { locale: Locale }) {
  const content = contentByLocale[locale].stack;
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let frame = 0;
    let velocity = 0;
    let lastTime = 0;
    let hovering = false;

    const baseSpeed = 0.08;

    const normalize = () => {
      const oneSetHeight = marquee.scrollHeight / 3;
      if (marquee.scrollTop >= oneSetHeight * 2) {
        marquee.scrollTop -= oneSetHeight;
      } else if (marquee.scrollTop <= 0) {
        marquee.scrollTop += oneSetHeight;
      }
    };

    marquee.scrollTop = marquee.scrollHeight / 3;

    const tick = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      velocity *= 0.92;
      const autoSpeed = hovering ? 0 : baseSpeed;
      marquee.scrollTop += delta * autoSpeed + velocity;
      normalize();

      frame = window.requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (!hovering) return;
      event.preventDefault();
      event.stopPropagation();
      velocity += event.deltaY * 0.06;
      marquee.scrollTop += event.deltaY * 0.35;
      normalize();
    };

    const onEnter = () => {
      hovering = true;
      velocity = 0;
    };

    const onLeave = () => {
      hovering = false;
    };

    marquee.addEventListener("wheel", onWheel, { passive: false });
    marquee.addEventListener("mouseenter", onEnter);
    marquee.addEventListener("mouseleave", onLeave);
    frame = window.requestAnimationFrame(tick);

    return () => {
      marquee.removeEventListener("wheel", onWheel);
      marquee.removeEventListener("mouseenter", onEnter);
      marquee.removeEventListener("mouseleave", onLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const repeated = [...content.items, ...content.items, ...content.items];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="shell testimonials-grid">
        <div className="testi-left fade-up">
          <p className="section-kicker">{content.kicker}</p>
          <h2 className="section-title section-title-accent">{content.title}</h2>
          <p className="section-body">{content.body}</p>
        </div>

        <div ref={marqueeRef} className="testi-marquee">
          <div className="testi-fade top" />
          <div className="testi-fade bottom" />

          <div className="testi-track">
            {repeated.map((card, i) => (
              <article key={`${card.title}-${i}`} className="testi-card">
                <div className="testi-avatar" aria-hidden>
                  {card.initials}
                </div>
                <div>
                  <p className="testi-quote">{card.body}</p>
                  <p className="testi-name">{card.title}</p>
                  <p className="testi-role">{card.meta}</p>
                  <div className="testi-tools">
                    {card.tools.map((tool) => (
                      <span key={tool} className="testi-tool-chip">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
