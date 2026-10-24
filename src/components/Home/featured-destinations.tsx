"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DestinationCard } from "@/components/all-destinations/destination-card";
import type { CommonDataType } from "@/Ts/Type";

interface FeaturedDestinationsProps {
  destinations: CommonDataType[];
}

export function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);

  const total = destinations.length;

  function updateCurrent() {
    const scroller = scrollerRef.current;
    if (!scroller || total === 0) return;

    const slides = Array.from(
      scroller.querySelectorAll<HTMLElement>("[data-slide]"),
    );
    if (slides.length === 0) return;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.offsetLeft - scroller.scrollLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrent(closestIndex + 1);
  }

  function scrollBy(direction: "prev" | "next") {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const slide = scroller.querySelector<HTMLElement>("[data-slide]");
    const offset = slide ? slide.offsetWidth + 24 : scroller.clientWidth;

    scroller.scrollBy({
      left: direction === "prev" ? -offset : offset,
      behavior: "smooth",
    });
  }

  const atStart = current <= 1;
  const atEnd = current >= total;
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <section className="mx-auto my-12 w-full max-w-7xl px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
            Featured Destinations
          </h2>
          <p className="mt-3 text-neutral-500">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>
        <Link
          href="/all-destinations"
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-brand px-5 py-3 text-xs font-semibold tracking-widest text-brand uppercase transition-colors hover:bg-brand hover:text-white"
        >
          All Destinations
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Carousel */}
      <div
        ref={scrollerRef}
        onScroll={updateCurrent}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {destinations.map((destination) => (
          <div
            key={destination._id}
            data-slide
            className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[31%]"
          >
            <DestinationCard destination={destination} />
          </div>
        ))}
      </div>

      {/* Counter + controls */}
      <div className="mt-6 flex items-center gap-6">
        <p className="shrink-0 text-sm text-neutral-700">
          {total > 0 ? current : 0}/{total}
        </p>

        <div className="h-px flex-1 bg-neutral-200">
          <div
            className="h-px bg-brand transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Previous destinations"
            disabled={atStart}
            onClick={() => scrollBy("prev")}
            className="inline-flex size-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next destinations"
            disabled={atEnd}
            onClick={() => scrollBy("next")}
            className="inline-flex size-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

    </section>
  );
}
