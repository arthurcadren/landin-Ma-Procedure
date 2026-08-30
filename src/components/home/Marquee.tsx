
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
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      style={{
        // styles keyframes are defined globally to avoid hydration diff caused by inline JSX style injection
      }}
    >
      <div
        className="flex gap-4 w-max hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speedSeconds}s linear infinite`,
        }}
      >
        {children}
        {children /* dupliqué pour une boucle parfaitement continue */}
      </div>
    </div>
  );
}
