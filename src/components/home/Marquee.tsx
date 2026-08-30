
"use client";

export function Marquee({
  children,
  speedSeconds = 30,
  reverse = false,
}: {
  children: React.ReactNode;
  speedSeconds?: number;
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div
        className="flex gap-4 w-max hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speedSeconds}s linear infinite`,
        }}
      >
        {children}
        {children /* dupliqué pour une boucle parfaitement continue */}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
