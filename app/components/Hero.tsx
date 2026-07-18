"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Locale, contentByLocale } from "../data/content";

export function Hero({ locale }: { locale: Locale }) {
  const content = contentByLocale[locale].hero;
  const statement = contentByLocale[locale].statement;
  const wordsLength = content.words.length;
  const [wordIdx, setWordIdx] = useState(0);
  const [wordState, setWordState] = useState<"idle" | "exit" | "enter">("idle");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let exitT: ReturnType<typeof setTimeout>;
    let enterT: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setWordState("exit");
      exitT = setTimeout(() => {
        setWordIdx((i) => (i + 1) % wordsLength);
        setWordState("enter");
        enterT = setTimeout(() => setWordState("idle"), 320);
      }, 220);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(exitT);
      clearTimeout(enterT);
    };
  }, [wordsLength]);

  useEffect(() => {
    const section = sectionRef.current;
    const el = contentRef.current;
    if (!section || !el) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      const fadeP = Math.max(0, Math.min(1, p / 0.18));
      const zoomP = Math.max(0, Math.min(1, p / 0.5));
      const easedZoom = 1 - Math.pow(1 - zoomP, 3);
      section.style.setProperty("--hero-fade", fadeP.toFixed(4));
      el.style.transform = `scale(${1 - p * 0.08})`;
      el.style.opacity = String(Math.max(0, 1 - fadeP));

      if (revealRef.current) {
        revealRef.current.style.opacity = "1";
        revealRef.current.style.setProperty("--zoom-progress", easedZoom.toFixed(4));
      }

      if (marqueeRef.current) {
        marqueeRef.current.style.opacity = String(0.24 + zoomP * 0.76);
        marqueeRef.current.style.transform = `scale(${0.98 + zoomP * 0.02})`;
      }

      if (portraitRef.current) {
        const endScale = window.innerWidth <= 900 ? 0.38 : 0.38;
        const scale = 1 - easedZoom * (1 - endScale);
        const radius = easedZoom * 22;
        portraitRef.current.style.transform = `scale(${scale.toFixed(4)})`;
        portraitRef.current.style.borderRadius = `${radius}px`;
      }

      if (signatureRef.current) {
        const signatureP = Math.max(0, Math.min(1, (p - 0.4) / 0.6));
        signatureRef.current.style.opacity = String(signatureP);
        signatureRef.current.style.transform = `rotate(-8deg) scale(${0.82 + signatureP * 1.3})`;
        signatureRef.current.style.clipPath = `inset(0 ${Math.max(0, 100 - signatureP * 100)}% 0 0)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const wordClass = wordState === "exit" ? "word-exit" : wordState === "enter" ? "word-enter" : "";

  return (
    <section ref={sectionRef} className="hero" id="top">
      <div className="hero-sticky">
        <div ref={revealRef} className="hero-zoom-reveal" aria-hidden="true">
          <div ref={marqueeRef} className="hero-marquee-layer">
            <div className="hero-bg-marquee hero-bg-marquee-top">
              {[...statement.ticker, ...statement.ticker].map((item, i) => (
                <span key={`top-${item}-${i}`}>{item}</span>
              ))}
            </div>
            <div className="hero-bg-marquee hero-bg-marquee-bottom">
              {[...["ideas", "producto", "frontend", "diseño", "apps", "IA"], ...["ideas", "producto", "frontend", "diseño", "apps", "IA"]].map((item, i) => (
                <span key={`bottom-${item}-${i}`}>{item}</span>
              ))}
            </div>
          </div>
          <div ref={portraitRef} className="hero-zoom-card">
            <Image
              src="/fotofondo4.png"
              alt=""
              width={648}
              height={1152}
              priority
              className="hero-zoom-image"
            />
          </div>
          <div ref={signatureRef} className="hero-zoom-signature-wrap">
            <div className="hero-zoom-signature" />
          </div>
        </div>
        <div ref={contentRef} className="hero-content-wrap">
          <div className="hero-bottom">
            <div>
              <h1 className="hero-wordmark" aria-label="jgarcia3199 portfolio">
                <span className="hero-prefix">jgarcia3199/</span>
                <span key={wordIdx} className={`hero-word-slot ${wordClass}`.trim()}>
                  {content.words[wordIdx]}
                </span>
              </h1>
              <p className="hero-subline">{content.subline}</p>
              <div className="hero-chip-row">
                {content.chips.map((chip) => (
                  <span key={chip} className="hero-chip">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-scroll-hint" aria-hidden="true">
              <div className="hero-scroll-line" />
              <span>{content.scroll}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
