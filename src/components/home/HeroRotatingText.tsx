
"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface RotatingItem {
  title: string;
  subtitle: string;
}

export default function HeroRotatingText() {
  const t = useTranslations("hero");
  const items = t.raw("rotating") as RotatingItem[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [items]);

  const current = items?.[index] ?? { title: t("title"), subtitle: t("subtitle") };

  return (
    <div key={index} className="animate-hero-fade">
      <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.15] tracking-tight text-on-surface mb-5 text-balance">
        {current.title}
      </h1>
      <p className="text-base md:text-lg text-on-surface-variant leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
        {current.subtitle}
      </p>
    </div>
  );
}