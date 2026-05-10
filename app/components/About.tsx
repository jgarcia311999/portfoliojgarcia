"use client";

import Image from "next/image";

import { Locale, contentByLocale } from "../data/content";

export function About({ locale }: { locale: Locale }) {
  const content = contentByLocale[locale].about;

  return (
    <section id="about" className="about-section">
      <div className="shell about-grid">
        <div className="fade-up">
          <p className="section-kicker">{content.kicker}</p>
          <h2 className="section-title">{content.title}</h2>
          <p className="about-intro">{content.intro}</p>
          <p className="about-meta">{content.meta}</p>
          <p className="about-note">{content.note}</p>
          <div className="about-highlights">
            {content.highlights.map((item) => (
              <article key={item.title} className="about-highlight-card">
                <p className="about-highlight-label">{item.label}</p>
                <h3 className="about-highlight-title">{item.title}</h3>
                <p className="about-highlight-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="fade-up about-side" data-delay="150">
          <div className="about-visual">
            <Image
              src="/about-placeholder.svg"
              alt="Placeholder visual del perfil"
              fill
              className="about-visual-image"
            />
            <div className="about-visual-copy">
              <p className="about-visual-kicker">jgarcia3199</p>
              <h3 className="about-visual-title">{content.panelTitle}</h3>
              <p className="about-visual-body">{content.panelBody}</p>
            </div>
          </div>

          <div className="about-links">
            {content.links.map((link) => (
              <a key={link.title} href="#" className="about-link">
                <div>
                  <p className="about-link-tag">
                    {link.label} - {link.type}
                  </p>
                  <p className="about-link-label">{link.title}</p>
                </div>
                <span className="about-link-arrow" aria-hidden>
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
