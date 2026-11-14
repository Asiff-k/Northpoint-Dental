"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

/**
 * Drag slider. One portrait is shown twice: the "before" layer is muted with
 * a CSS filter and clipped to the left of the handle. A full-size range input
 * handles pointer drag and keyboard, so it is accessible without extra code.
 */
export function BeforeAfterSlider({
  image,
  alt,
  label,
}: {
  image: string;
  alt: string;
  label: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative aspect-square touch-pan-y sm:aspect-[4/5] overflow-hidden rounded-3xl bg-muted select-none">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover brightness-90 contrast-[0.85] grayscale-[0.85] sepia-[0.25]"
          draggable={false}
        />
      </div>

      <span className="absolute top-3 left-3 rounded-full bg-primary/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
        Before
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
        After
      </span>
      <span className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white px-2.5 py-1 text-[0.6875rem] font-semibold tracking-wide whitespace-nowrap text-primary uppercase backdrop-blur">
        Illustrative images
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(15_61_62/0.15)]"
        style={{ left: `${position}%` }}
        aria-hidden
      >
        <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lift">
          <ChevronsLeftRight className="size-5" />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`${label}: drag to compare before and after`}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
