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
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div
        className={`flex gap-3 w-max ${reverse ? "animate-marquee-rtl" : "animate-marquee-ltr"}`}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
