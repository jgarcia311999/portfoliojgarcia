"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Locale, contentByLocale } from "../data/content";

const GRAPHIC_BACKDROPS: Record<string, [string, string, string]> = {
  "/projects/matet-graphics/cartel_bebidas.png": ["#f4e8c9", "#d9aa98", "#9d1e2b"],
  "/projects/matet-graphics/cartel_chupinazo.png": ["#fff9f4", "#eae5e1", "#d9d4d0"],
  "/projects/matet-graphics/cartel_chupitos.png": ["#ffffff", "#fb93d1", "#f45055"],
  "/projects/matet-graphics/cartel_comidas.png": ["#f4e8c9", "#d9aa98", "#e8ccb3"],
  "/projects/matet-graphics/cartel_cubatas.png": ["#f4e8c9", "#d9aa98", "#9d1e2b"],
  "/projects/matet-graphics/cartel_eclipsesolar.png": ["#312e86", "#b5b2f4", "#fff9f4"],
  "/projects/matet-graphics/cartel_fiestaibicenca.png": ["#eae7e0", "#fbefc5", "#d5d8d0"],
  "/projects/matet-graphics/cartel_fiestaochentera.png": ["#003b2d", "#d34a24", "#fff9f4"],
  "/projects/matet-graphics/cartel_fiestasnins.png": ["#1d9fa6", "#c1fcff", "#ffffff"],
  "/projects/matet-graphics/cartel_gasfaseclipsesolar.png": ["#1c503c", "#5b7168", "#fff9f4"],
  "/projects/matet-graphics/cartel_horafelizdelante.png": ["#ffffff", "#fb93d1", "#fa575b"],
  "/projects/matet-graphics/cartel_horafelizdetras.png": ["#f1e9ea", "#6f8b84", "#e95f00"],
  "/projects/matet-graphics/cartel_resumenfiestas.png": ["#003b2d", "#fff9f4", "#fbe8d7"],
  "/projects/matet-graphics/cartel_resumentoros.png": ["#fff9f4", "#e4e5df", "#c9d1ca"],
};

function getGraphicStyle(image?: string) {
  const [a, b, c] = image ? GRAPHIC_BACKDROPS[image] ?? ["#f7f7fb", "#ebeef8", "#ffffff"] : ["#f7f7fb", "#ebeef8", "#ffffff"];
  return {
    "--graphic-bg-a": a,
    "--graphic-bg-b": b,
    "--graphic-bg-c": c,
  } as React.CSSProperties;
}

export function GraphicDesign({ locale }: { locale: Locale }) {
  const content = contentByLocale[locale].graphicDesign;
  const gallery = content.items;
  const [open, setOpen] = useState(false);
  const openLabel = locale === "es" ? "Abrir archivo" : "Obrir arxiu";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <section id="graphic-design" className="graphic-section">
        <div className="shell graphic-shell">
          <p className="section-kicker fade-up">{content.kicker}</p>

          <div className="graphic-compact-panel fade-up" data-delay="100">
            <div className="graphic-compact-copy">
              <h2 className="graphic-title-main">{content.title}</h2>
              <p className="graphic-intro">{content.body}</p>
            </div>

            <div className="graphic-preview-area">
              <button
                type="button"
                className="graphic-preview-strip"
                onClick={() => setOpen(true)}
                aria-label={openLabel}
              >
                {gallery.map((item) => (
                  <article
                    key={item.title}
                    className={`graphic-preview-card${item.orientation === "landscape" ? " is-landscape" : " is-portrait"}`}
                    style={getGraphicStyle(item.image)}
                  >
                    <div className="graphic-preview-frame">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          unoptimized
                          className="graphic-preview-image"
                        />
                      ) : null}
                    </div>
                  </article>
                ))}
              </button>

              <button type="button" className="graphic-open-chip" onClick={() => setOpen(true)}>
                <p>{openLabel}</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {open ? (
        <div className="graphic-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="graphic-modal" onClick={(event) => event.stopPropagation()}>
            <div className="graphic-modal-header">
              <div>
                <p className="section-kicker">{content.kicker}</p>
                <h3 className="graphic-modal-title">{content.title}</h3>
              </div>
              <button type="button" className="graphic-modal-close" onClick={() => setOpen(false)}>
                {locale === "es" ? "cerrar" : "tancar"}
              </button>
            </div>

            <div className="graphic-modal-gallery">
              {gallery.map((item) => (
                <article
                  key={item.title}
                  className={`graphic-gallery-card graphic-modal-card${item.orientation === "landscape" ? " is-landscape" : " is-portrait"}`}
                  style={getGraphicStyle(item.image)}
                >
                  <div className="graphic-gallery-media">
                    <div className="graphic-gallery-frame">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          unoptimized
                          className="graphic-gallery-image"
                        />
                      ) : null}
                    </div>
                  </div>

                  <div className="graphic-gallery-copy">
                    <p className="graphic-mini-meta">
                      <span>{item.type}</span>
                      <span>{item.year}</span>
                    </p>
                    <h3 className="graphic-mini-title">{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
