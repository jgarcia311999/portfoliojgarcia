"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`race-loader${hidden ? " is-hidden" : ""}`} aria-hidden="true">
      <div className="race-loader-copy">
        <span>Load</span>
        <strong>Jesus</strong>
      </div>
      <div className="race-loader-telemetry">
        <span>mode 2026</span>
        <span>frontend / design / ai</span>
        <span>00.3199</span>
      </div>
      <div className="race-loader-line">
        <span />
      </div>
    </div>
  );
}
