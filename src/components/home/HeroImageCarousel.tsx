"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import v1 from "../../../v1.png";
import v2 from "../../../v2.png";
import v3 from "../../../v3.png";
import v4 from "../../../v4.png";

const images: StaticImageData[] = [v1, v2, v3, v4];

export default function HeroImageCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full">
      {images.map((image, imageIndex) => (
        <Image
          key={image.src}
          src={image}
          alt=""
          fill
          priority={imageIndex === 0}
          className={`object-cover transition-opacity duration-700 ${
            imageIndex === index ? "opacity-100" : "opacity-0"
          }`}
          sizes="50vw"
        />
      ))}
    </div>
  );
}