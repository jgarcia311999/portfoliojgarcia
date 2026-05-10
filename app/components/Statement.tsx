"use client";

import { useEffect, useRef } from "react";
import { Locale, contentByLocale } from "../data/content";

export function Statement({ locale }: { locale: Locale }) {
  const content = contentByLocale[locale].statement;
  const lines = content.lines;
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const logosRef = useRef<HTMLDivElement>(null);
  const logosTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));

      lines.forEach((_, i) => {
        const lineProgress = Math.max(0, Math.min(1, progress * 5 - i * 0.75));
        const el = lineRefs.current[i];
        if (el) {
          const opacity = 0.18 + lineProgress * 0.82;
          el.style.color = `rgba(255,255,255,${opacity.toFixed(3)})`;
        }
      });

      if (logosRef.current) {
        logosRef.current.style.opacity = progress > 0.35 ? "1" : "0";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [lines]);

  useEffect(() => {
    const track = logosTrackRef.current;
    if (!track) return;

    let frame = 0;
    let offset = 0;
    let lastTime = 0;

    const tick = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      offset -= delta * 0.045;
      const resetPoint = track.scrollWidth / 3;
      if (Math.abs(offset) >= resetPoint) {
        offset += resetPoint;
      }

      track.style.transform = `translateX(${offset}px)`;
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section ref={sectionRef} id="services-intro" className="statement-section">
      <div className="statement-sticky">
        <div className="statement-text">
          {content.lines.map((line, i) => (
            <span
              key={line.text}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className={["statement-line", line.className].filter(Boolean).join(" ")}
            >
              {line.text.startsWith("/") ? <><b>/</b>{line.text.slice(1)}</> : line.text}
            </span>
          ))}

          <div ref={logosRef} className="clients-inner">
            <p className="clients-kicker">{content.kicker}</p>
            <div ref={logosTrackRef} className="clients-logos-row">
              {[...content.ticker, ...content.ticker, ...content.ticker].map((client, i) => (
                <span key={`${client}-${i}`} className="client-slot">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
