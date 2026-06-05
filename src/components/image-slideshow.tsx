"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  url: string;
  alt: string;
};

export function ImageSlideshow({
  images,
  altFallback,
  priority = false,
}: {
  images: Slide[];
  altFallback: string;
  priority?: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [images.length]);

  const activeImage = images[activeIndex] ?? images[0];

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  return (
    <div className="relative h-full w-full">
      <Image
        src={activeImage.url}
        alt={activeImage.alt || altFallback}
        fill
        className="object-cover transition-opacity duration-500"
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority={priority}
      />
      {images.length > 1 ? (
        <>
          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? "bg-white" : "bg-white/45"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur"
          >
            <ChevronRight size={18} />
          </button>
        </>
      ) : null}
    </div>
  );
}
