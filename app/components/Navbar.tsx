"use client";

import { useEffect, useRef, useState } from "react";
import { Locale, contentByLocale } from "../data/content";

const THEMES = [
  {
    id: "neo-mint",
    name: "Neo Mint",
    note: "M\u00e1s tech y m\u00e1s propia.",
    swatches: ["#1f7a6b", "#c7f36b", "#e6fff7"],
  },
  {
    id: "lapreviapp",
    name: "La Previapp",
    note: "Inspirada en la app: violeta, rosa y amarillo.",
    swatches: ["#5e1de6", "#f4b7d1", "#ffef96"],
  },
];

const STORAGE_KEY = "jgarcia3199-theme";

export function Navbar({
  locale,
  onLocaleChange,
}: {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}) {
  const navRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "neo-mint";
    return window.localStorage.getItem(STORAGE_KEY) || "neo-mint";
  });
  const copy = contentByLocale[locale];
  const links = [
    { href: "#services", label: copy.nav.services },
    { href: "#work", label: copy.nav.projects },
    { href: "#about", label: copy.nav.about },
  ];

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      const y = window.scrollY;
      nav.style.transform = y > lastY.current && y > 80 ? "translateY(-110%)" : "translateY(0)";
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const applyTheme = (nextTheme: string) => {
    setTheme(nextTheme);
  };

  return (
    <>
      <nav ref={navRef} className="site-nav">
        <a href="#top" className="site-nav-logo">
          jgarcia3199/
        </a>
        <button type="button" className="burger" aria-label={copy.nav.openMenu} onClick={() => setOpen(true)}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`menu-overlay${open ? " is-open" : ""}`}>
        <button type="button" className="menu-close" aria-label={copy.nav.closeMenu} onClick={() => setOpen(false)}>
          <span>{copy.nav.closeMenu}</span>
        </button>

        <ul className="menu-nav">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="menu-link" onClick={() => setOpen(false)}>
                <span className="slash">/</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="mailto:hola@jgarcia3199.dev" className="menu-cta" onClick={() => setOpen(false)}>
          <span>{copy.nav.talk}</span>
          <span aria-hidden>→</span>
        </a>

        <div className="menu-tools">
          <p className="menu-tools-label">{copy.nav.paletteLabel}</p>
          <div className="palette-grid">
            {THEMES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`palette-option${theme === item.id ? " is-active" : ""}`}
                onClick={() => applyTheme(item.id)}
              >
                <div className="palette-swatches" aria-hidden>
                  {item.swatches.map((swatch) => (
                    <span key={swatch} className="palette-swatch" style={{ background: swatch }} />
                  ))}
                </div>
                <div>
                  <div className="palette-name">{item.name}</div>
                  <div className="palette-note">{item.note}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="locale-switch">
            <p className="menu-tools-label">{copy.nav.languageLabel}</p>
            <div className="locale-buttons">
              <button
                type="button"
                className={`locale-button${locale === "es" ? " is-active" : ""}`}
                onClick={() => onLocaleChange("es")}
              >
                ES
              </button>
              <button
                type="button"
                className={`locale-button${locale === "va" ? " is-active" : ""}`}
                onClick={() => onLocaleChange("va")}
              >
                VA
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
