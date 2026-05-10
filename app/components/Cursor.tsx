"use client";
import { useEffect, useRef } from "react";

export function Cursor() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    let gx = 0, gy = 0, tx = 0, ty = 0, raf = 0;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };

    const tick = () => {
      gx += (tx - gx) * 0.06;
      gy += (ty - gy) * 0.06;
      el.style.transform = `translate(${gx}px, ${gy}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="cursor-glow"
    />
  );
}
