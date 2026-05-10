"use client";
import { useEffect, useState } from "react";
import Lenis from "lenis";

import { Locale } from "./data/content";
import { Cursor }       from "./components/Cursor";
import { Navbar }       from "./components/Navbar";
import { Hero }         from "./components/Hero";
import { Statement }    from "./components/Statement";
import { Services }     from "./components/Services";
import { Portfolio }    from "./components/Portfolio";
import { Testimonials } from "./components/Testimonials";
import { About }        from "./components/About";
import { Footer }       from "./components/Footer";

export default function Home() {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return "es";
    const saved = window.localStorage.getItem("jgarcia3199-locale");
    return saved === "va" ? "va" : "es";
  });

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  /* ── Fade-up on scroll (IntersectionObserver) ── */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".fade-up");
    const io  = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el    = entry.target as HTMLElement;
          const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
          setTimeout(() => el.classList.add("is-visible"), delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: "-60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("jgarcia3199-locale", locale);
  }, [locale]);

  return (
    <>
      <Cursor />
      <Navbar locale={locale} onLocaleChange={setLocale} />
      <main>
        <Hero locale={locale} />
        <Statement locale={locale} />
        <Services locale={locale} />
        <Portfolio locale={locale} />
        <Testimonials locale={locale} />
        <About locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
