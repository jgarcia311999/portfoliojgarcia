"use client";

import { useEffect, useRef, useState } from "react";
import { Locale, contentByLocale } from "../data/content";

export function Hero({ locale }: { locale: Locale }) {
  const content = contentByLocale[locale].hero;
  const wordsLength = content.words.length;
  const [wordIdx, setWordIdx] = useState(0);
  const [wordState, setWordState] = useState<"idle" | "exit" | "enter">("idle");
  const contentRef = useRef<HTMLDivElement>(null);

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
    const el = contentRef.current;
    if (!el) return;

    const onScroll = () => {
      const p = Math.min(1, window.scrollY / window.innerHeight);
      el.style.transform = `scale(${1 - p * 0.03})`;
      el.style.opacity = String(Math.max(0, 1 - p * 1.25));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wordClass = wordState === "exit" ? "word-exit" : wordState === "enter" ? "word-enter" : "";

  return (
    <section className="hero" id="top">
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
    </section>
  );
}
