// The green scrolling strip of store promises.
// No state, no clicks -> a plain server component (no "use client" needed).

const PROMISES = [
  "Natural fibres only",
  "Made in Portugal",
  "Free alterations",
  "Carbon-neutral shipping",
  "60-day returns",
  "Full-canvas tailoring",
];

export default function Marquee() {
  // We render the list TWICE so the loop has no visible gap (see globals.css).
  const doubled = [...PROMISES, ...PROMISES];

  return (
    <div className="mt-10 overflow-hidden bg-forest py-3 text-cream">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-sm italic">
        {doubled.map((text, i) => (
          <span key={i} className="flex items-center gap-10">
            {text}
            <span className="text-lime">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
