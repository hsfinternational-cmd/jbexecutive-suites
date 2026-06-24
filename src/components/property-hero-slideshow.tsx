"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PropertySlide = {
  title: string;
  image: string;
  alt: string;
};

export function PropertyHeroSlideshow({ images }: { images: PropertySlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  useEffect(() => {
    if (images.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [images.length]);

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  if (!activeImage) return null;

  return (
    <div className="space-y-4 lg:pl-6">
      <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[linear-gradient(135deg,rgba(0,77,43,0.96),rgba(5,104,57,0.72))] shadow-[var(--shadow-soft)]">
        <div className="relative flex min-h-[380px] items-center justify-center p-3 sm:min-h-[480px] lg:min-h-[550px]">
          <Image
            src={activeImage.image}
            alt={activeImage.alt}
            fill
            priority
            className="object-contain p-3"
            sizes="(max-width: 1024px) 100vw, 52vw"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[rgba(0,77,43,0.92)] via-[rgba(0,77,43,0.56)] to-transparent p-4 text-white">
          <div>
            <p className="text-sm font-semibold">{activeImage.title}</p>
            <p className="mt-1 text-xs text-white/72">Full frame property showcase</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous property image"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next property image"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/15 bg-[rgba(0,77,43,0.5)] p-3 backdrop-blur">
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${image.title}`}
              className={`relative h-24 w-36 shrink-0 overflow-hidden rounded-2xl border bg-[var(--brand-green-dark)] transition ${
                index === activeIndex ? "border-[var(--brand-orange)]" : "border-white/18 opacity-78 hover:opacity-100"
              }`}
            >
              <Image src={image.image} alt="" fill className="object-contain p-1" sizes="144px" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
