const items = [
  "Free shipping over $55",
  "New drop live",
  "Limited edition",
  "Easy 30-day returns",
  "Crafted to last",
];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-blush py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center">
            {items.map((t) => (
              <li key={t} className="flex items-center whitespace-nowrap font-display text-2xl md:text-3xl">
                <span className="px-6">{t}</span>
                <span className="text-plum">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}