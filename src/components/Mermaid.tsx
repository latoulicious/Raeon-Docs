import { useEffect, useRef, useState } from "react";

// Mermaid is heavy (~0.5 MB), so it is dynamically imported the first time a
// diagram actually renders — Vite splits it into its own chunk and the docs
// pages without diagrams never pay for it. Initialized once, dark-themed to
// match the site. On a parse error we fall back to the raw fenced source.

type MermaidApi = typeof import("mermaid").default;

let mermaidPromise: Promise<MermaidApi> | null = null;

function loadMermaid(): Promise<MermaidApi> {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then(({ default: mermaid }) => {
      // htmlLabels:false renders labels as native SVG <text>, which mermaid
      // sizes from real glyph metrics — the foreignObject path miscalculates
      // width and clips node text. No fontFamily override for the same reason.
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "strict",
        htmlLabels: false,
        flowchart: { htmlLabels: false, useMaxWidth: true },
      });
      return mermaid;
    });
  }
  return mermaidPromise;
}

// Unique, deterministic ids for mermaid.render (avoids collisions on a page
// with several diagrams).
let counter = 0;

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const id = `mermaid-${counter++}`;

    loadMermaid()
      .then((mermaid) => mermaid.render(id, chart))
      .then(({ svg }) => {
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (failed) {
    return (
      <pre>
        <code>{chart}</code>
      </pre>
    );
  }

  return <div className="mermaid" ref={ref} role="img" aria-label="diagram" />;
}
