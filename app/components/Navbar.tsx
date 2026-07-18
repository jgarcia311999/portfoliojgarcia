"use client";

import { useEffect, useRef, useState } from "react";
import { Locale, contentByLocale } from "../data/content";
import { DEFAULT_THEME, THEME_COOKIE_KEY, THEME_STORAGE_KEY } from "../lib/preferences";

const PALETTE_CARD = {
  name: "Electric Blue",
  labelEs: "Sistema de color",
  labelVa: "Sistema de colors",
  compactEs: "Electric Blue",
  compactVa: "Electric Blue",
  titleEs: "Electric Blue",
  titleVa: "Electric Blue",
  noteEs: "Paleta activa del portfolio.",
  noteVa: "Paleta activa del portfolio.",
  swatches: [
    { color: "#2F51FE", useEs: "Titulos de seccion y focos principales", useVa: "Titols de seccio i focus principals" },
    { color: "#1537FF", useEs: "Marca, fondos intensos y footer", useVa: "Marca, fons intensos i footer" },
    { color: "#8EA2FF", useEs: "Capas suaves, luces y detalles de apoyo", useVa: "Capes suaus, llums i detalls de suport" },
    { color: "#EEF2FF", useEs: "Fondos claros y respiracion del layout", useVa: "Fons clars i respiracio del layout" },
  ],
};

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
  const [paletteOpen, setPaletteOpen] = useState(false);
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
    document.documentElement.setAttribute("data-theme", DEFAULT_THEME);
    window.localStorage.setItem(THEME_STORAGE_KEY, DEFAULT_THEME);
    document.cookie = `${THEME_COOKIE_KEY}=${DEFAULT_THEME}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const paletteLabel = locale === "es" ? PALETTE_CARD.labelEs : PALETTE_CARD.labelVa;
  const paletteCompact = locale === "es" ? PALETTE_CARD.compactEs : PALETTE_CARD.compactVa;
  const closeMenu = () => {
    setOpen(false);
    setPaletteOpen(false);
  };

  return (
    <>
      <nav ref={navRef} className="site-nav">
        <a href="#top" className="site-nav-logo">
          JesúsGarcíaAlemany/
        </a>
        <button type="button" className="burger" aria-label={copy.nav.openMenu} onClick={() => setOpen(true)}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`menu-overlay${open ? " is-open" : ""}`}>
        <button type="button" className="menu-close" aria-label={copy.nav.closeMenu} onClick={closeMenu}>
          <span>{copy.nav.closeMenu}</span>
        </button>

        <div className="menu-tools menu-tools-right" onMouseLeave={() => setPaletteOpen(false)}>
          <p className="menu-tools-label">{paletteLabel}</p>
          <div
            className={`palette-card${paletteOpen ? " is-open" : ""}`}
            onMouseEnter={() => setPaletteOpen(true)}
            onFocus={() => setPaletteOpen(true)}
            onBlur={() => setPaletteOpen(false)}
          >
            <button
              type="button"
              className="palette-trigger"
              aria-expanded={paletteOpen}
              onClick={() => setPaletteOpen((value) => !value)}
            >
              <span className="palette-trigger-label">{paletteCompact}</span>
              <div className="palette-swatches" aria-hidden>
                {PALETTE_CARD.swatches.map((item) => (
                  <span key={item.color} className="palette-swatch" style={{ background: item.color }} />
                ))}
              </div>
            </button>

            <div className="palette-panel">
              <div className="palette-panel-inner">
                <div className="palette-panel-list">
                  {PALETTE_CARD.swatches.map((item, index) => (
                    <article
                      key={item.color}
                      className="palette-detail-row"
                      style={{ transitionDelay: `${index * 55}ms` }}
                    >
                      <span className="palette-detail-chip" style={{ background: item.color }} />
                      <div>
                        <p className="palette-detail-hex">{item.color}</p>
                        <p className="palette-detail-use">{locale === "es" ? item.useEs : item.useVa}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
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

        <div className="menu-main menu-main-right">
          <ul className="menu-nav">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="menu-link" onClick={closeMenu}>
                  <span className="slash">/</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="mailto:hola@jgarcia3199.dev" className="menu-cta" onClick={closeMenu}>
            <span>{copy.nav.talk}</span>
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </>
  );
}
