"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

import { Locale } from "../data/content";
import { LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY } from "../lib/preferences";
import { Cursor } from "./Cursor";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Statement } from "./Statement";
import { Services } from "./Services";
import { Portfolio } from "./Portfolio";
import { GraphicDesign } from "./GraphicDesign";
import { Testimonials } from "./Testimonials";
import { About } from "./About";
import { Footer } from "./Footer";

export function HomeClient({
  initialLocale,
}: {
  initialLocale: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (t: number) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".fade-up");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0;
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
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.cookie = `${LOCALE_COOKIE_KEY}=${locale}; path=/; max-age=31536000; samesite=lax`;
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
        <GraphicDesign locale={locale} />
        <Testimonials locale={locale} />
        <About locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
