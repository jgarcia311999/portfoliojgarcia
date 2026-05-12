"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Locale, ProjectItem, contentByLocale } from "../data/content";

function ProjectPreview({
  src,
  image,
  featured,
  label,
}: {
  src: string;
  image?: string;
  featured?: boolean;
  label: string;
}) {
  const scale = featured ? 0.34 : 0.265;
  const [showImage, setShowImage] = useState(Boolean(image));

  return (
    <div className="project-thumb">
      <div className="project-thumb-badge">{label}</div>
      {showImage && image ? (
        <Image
          src={image}
          alt=""
          fill
          unoptimized
          className="project-thumb-image"
          onError={() => setShowImage(false)}
        />
      ) : (
        <iframe
          src={src}
          title={`Preview ${src}`}
          loading="lazy"
          style={{ transform: `translateX(-50%) scale(${scale})` }}
        />
      )}
      <div className="project-thumb-overlay" />
    </div>
  );
}

export function Portfolio({ locale }: { locale: Locale }) {
  const content = contentByLocale[locale].projects;
  const projects = content.items;
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndexFloat, setActiveIndexFloat] = useState(0);
  const [current, setCurrent] = useState(1);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const applyTransform = (activeFloat: number) => {
      const firstCard = track.firstElementChild as HTMLElement | null;
      const cardWidth = firstCard ? firstCard.offsetWidth : 460;
      const gap = 24;
      const cardSpan = cardWidth + gap;
      const centerOffset = viewport.clientWidth / 2 - cardWidth / 2;
      track.style.transform = `translateX(${centerOffset - activeFloat * cardSpan}px)`;
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const nextFloat = progress * (projects.length - 1);

      applyTransform(nextFloat);
      setActiveIndexFloat(nextFloat);
      setCurrent(Math.round(nextFloat) + 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [projects.length]);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  const jumpTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const clamped = Math.max(0, Math.min(projects.length - 1, index));
    const scrollable = section.scrollHeight - window.innerHeight;
    const progress = projects.length > 1 ? clamped / (projects.length - 1) : 0;
    window.scrollTo({ top: section.offsetTop + scrollable * progress, behavior: "smooth" });
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const delta = Math.abs(index - activeIndexFloat);
    const scale = Math.max(0.82, 1 - delta * 0.14);
    const opacity = Math.max(0.38, 1 - delta * 0.3);
    return {
      transform: `scale(${scale})`,
      opacity,
      zIndex: Math.max(1, projects.length - Math.round(delta * 2)),
    };
  };

  return (
    <>
      <section ref={sectionRef} id="work" className="portfolio-section">
        <div className="portfolio-sticky">
          <div className="portfolio-header">
            <div className="portfolio-kicker">
              <span>{content.headingTop}</span>
              <span>{content.headingBottom}</span>
            </div>

            <div className="portfolio-side">
              <span className="portfolio-count">
                {current} / {projects.length}
              </span>
              <div className="portfolio-arrows">
                <button type="button" className="portfolio-arrow" aria-label={content.previous} onClick={() => jumpTo(current - 2)}>
                  ←
                </button>
                <button type="button" className="portfolio-arrow" aria-label={content.next} onClick={() => jumpTo(current)}>
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="portfolio-progress">
            <div
              className="portfolio-progress-fill"
              style={{ width: `${((current - 1) / (projects.length - 1)) * 100}%` }}
            />
          </div>

          <div ref={viewportRef} className="portfolio-track-wrap">
            <div ref={trackRef} className="portfolio-track">
              {projects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  className={`project-card${Math.abs(index - activeIndexFloat) < 0.55 ? " is-active" : ""}`}
                  style={getCardStyle(index)}
                  onClick={() => setActiveProject(project)}
                >
                  <ProjectPreview
                    src={project.preview}
                    image={project.image}
                    featured={Math.abs(index - activeIndexFloat) < 0.55}
                    label={content.preview}
                  />
                  <div className="project-info">
                    <p className="project-tags">
                      / {project.category} - {project.year}
                    </p>
                    <h3 className="project-name">{project.title}</h3>
                    <p className="project-desc">{project.shortDescription}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeProject ? (
        <div className="project-modal-backdrop" onClick={() => setActiveProject(null)}>
          <div className="project-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="project-modal-close" onClick={() => setActiveProject(null)}>
              {content.close}
            </button>
            <p className="section-kicker">
              / {activeProject.category} - {activeProject.year}
            </p>
            <h3 className="project-modal-title">{activeProject.title}</h3>
            <div className="project-modal-preview">
              <ProjectPreview
                src={activeProject.preview}
                image={activeProject.image}
                featured
                label={content.preview}
              />
            </div>
            <p className="project-modal-body">{activeProject.summary}</p>

            <div className="project-modal-section">
              <p className="project-modal-label">{content.problemLabel}</p>
              <p className="project-modal-body">{activeProject.problem}</p>
            </div>

            <div className="project-modal-section">
              <p className="project-modal-label">{content.roleLabel}</p>
              <p className="project-modal-body">{activeProject.role}</p>
            </div>

            <div className="project-modal-section">
              <p className="project-modal-label">{content.stackLabel}</p>
              <div className="project-modal-tech">
                {activeProject.technologies.map((item) => (
                  <span key={item} className="project-modal-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <a href={activeProject.href} target="_blank" rel="noreferrer" className="project-modal-link">
              {content.openProject}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
