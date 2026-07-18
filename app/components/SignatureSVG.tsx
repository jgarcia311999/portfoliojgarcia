"use client";

import { FIRMA_PATHS } from "../data/firmaPaths";

export function SignatureSVG() {
  return (
    <svg
      viewBox="0 0 1376 768"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
      aria-hidden="true"
    >
      <g fill="currentColor" fillRule="evenodd">
        {FIRMA_PATHS.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}
