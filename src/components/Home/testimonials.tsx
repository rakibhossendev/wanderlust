"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "\"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.\"",
    name: "Michael Chen",
    location: "Singapore",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote:
      "\"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!\"",
    name: "Sarah Johnson",
    location: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote:
      "\"The Kyoto Food Tour Was A Highlight Of Our Year. Every Stop Told A Story And The Local Guides Made Us Feel Like Friends, Not Tourists.\"",
    name: "Emily Rodriguez",
    location: "Toronto, Canada",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
  {
    quote:
      "\"Safari In Tanzania Was A Once-In-A-Lifetime Experience. The Lodges Were Stunning And We Saw The Big Five On Our Very First Drive.\"",
    name: "David Okafor",
    location: "London, UK",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
];

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-card]");
    const offset = card ? card.offsetWidth + 24 : scroller.clientWidth;
    scroller.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header + carousel controls */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
              What Travelers Say
            </h2>
            <p className="mt-3 text-neutral-500">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="hidden shrink-0 gap-3 sm:flex">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => scroll("left")}
              className="inline-flex size-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-brand hover:text-brand"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => scroll("right")}
              className="inline-flex size-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-brand hover:text-brand"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((item) => (
            <figure
              key={item.name}
              data-card
              className="flex w-full shrink-0 snap-start flex-col gap-6 rounded-lg border border-neutral-200 bg-white p-6 sm:w-[calc(50%-0.75rem)] sm:flex-row sm:items-stretch"
            >
              <div className="flex flex-1 flex-col">
                <blockquote className="text-lg leading-snug font-normal text-neutral-900">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-auto pt-8">
                  <p className="text-sm text-brand">— {item.name}</p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {item.location}
                  </p>
                </figcaption>
              </div>
              <Image
                src={item.image}
                alt={`Portrait of ${item.name}`}
                width={160}
                height={160}
                className="aspect-square h-auto w-full rounded-md object-cover sm:w-40"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
