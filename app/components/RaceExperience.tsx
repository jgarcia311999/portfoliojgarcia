"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function RaceExperience() {
  const signatureRef = useRef<SVGPathElement>(null);
  const signatureSectionRef = useRef<HTMLElement>(null);
  const [hovering, setHovering] = useState(false);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty("--cursor-x", `${x}%`);
    event.currentTarget.style.setProperty("--cursor-y", `${y}%`);
  };

  useEffect(() => {
    const path = signatureRef.current;
    const section = signatureSectionRef.current;
    if (!path || !section) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const eased = 1 - Math.pow(1 - progress, 3);
      path.style.strokeDashoffset = `${length * (1 - eased)}`;
      section.style.setProperty("--signature-progress", `${progress}`);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="race-page">
      <section
        className={`race-hero${hovering ? " is-hovering" : ""}`}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <header className="race-topbar">
          <a href="#top" className="race-logo">JGA/3199</a>
          <nav className="race-nav" aria-label="Principal">
            <a href="#message">Message</a>
            <a href="#track">On Track</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="race-hero-meta">
          <span>2026 frontend / product design / AI</span>
          <span>Valencia / remote</span>
        </div>

        <div className="race-hero-media" aria-hidden>
          <Image
            src="/imgportada.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="race-hero-image race-hero-image-main"
          />
          <Image
            src="/imgportada2.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="race-hero-image race-hero-image-hover"
          />
        </div>

        <div className="race-hero-copy">
          <p className="race-status">
            <span />
            Disponible para proyectos
          </p>
          <h1>
            Jesús
            <br />
            García
          </h1>
          <p className="race-subtitle">Frontend, producto digital, apps e IA aplicada con una estética de carrera.</p>
        </div>

        <a className="race-next-card" href="#message">
          <span>Next section</span>
          <strong>Message</strong>
          <small>scroll to reveal</small>
        </a>

        <div className="race-hover-hint" aria-hidden>
          Hover to switch image
        </div>
      </section>

      <section id="message" ref={signatureSectionRef} className="signature-section">
        <div className="signature-sticky">
          <div className="signature-grid">
            <div>
              <p className="section-mono">Message from Jesús</p>
              <h2>
                No importa donde empieza una idea.
                <br />
                Importa como progresa.
              </h2>
            </div>

            <div className="signature-panel">
              <p>
                Construyo experiencias digitales con ritmo, intención visual y código que aguanta cuando el proyecto deja de ser una maqueta.
              </p>
              <svg className="signature-svg" viewBox="0 0 640 220" role="img" aria-label="Firma decorativa de Jesus Garcia">
                <path
                  ref={signatureRef}
                  d="M40 145 C95 80, 130 80, 110 132 C92 184, 32 184, 78 126 C120 73, 168 58, 198 82 C226 104, 206 151, 174 148 C142 145, 146 92, 212 86 C286 80, 278 164, 222 164 C184 164, 198 115, 260 105 C332 94, 306 178, 254 176 C220 174, 236 136, 304 116 C352 102, 370 116, 354 142 C336 170, 286 174, 304 132 C326 82, 398 80, 430 112 C458 140, 420 178, 386 154 C360 136, 372 98, 422 92 C488 84, 530 112, 506 146 C482 180, 438 156, 486 122 C526 94, 584 94, 606 126"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="10"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section id="track" className="track-section">
        <div className="track-heading">
          <p className="section-mono">On Track</p>
          <h2>Projects archive</h2>
        </div>
        <div className="track-list">
          {[
            ["01", "Lapreviapp", "React Native / Expo / Firebase"],
            ["02", "Fiestas Matet", "Next.js / TypeScript / Vercel"],
            ["03", "Strago Chonin", "Catalogo / ecommerce / frontend"],
          ].map(([num, title, meta]) => (
            <a key={title} className="track-row" href="#contact">
              <span>{num}</span>
              <strong>{title}</strong>
              <small>{meta}</small>
            </a>
          ))}
        </div>
      </section>

      <footer id="contact" className="race-footer">
        <p className="section-mono">Business enquiries</p>
        <h2>Always building the next lap.</h2>
        <a href="mailto:hola@jgarcia3199.dev">hola@jgarcia3199.dev</a>
      </footer>
    </main>
  );
}
