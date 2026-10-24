import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] w-full flex-col justify-center overflow-hidden">
      {/* Background image + overlay */}
      <Image
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80"
        alt="Aerial view of a turquoise bay surrounded by lush green hills"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60"
      />

      {/* Centered hero content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-24 pb-48 text-center sm:px-6">
        <h1 className="text-5xl leading-[1.05] font-light tracking-tight text-white sm:text-6xl lg:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-md bg-brand px-7 text-sm font-semibold tracking-wide text-white uppercase hover:bg-brand/85"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-md border-white/40 bg-white/10 px-7 text-sm font-semibold tracking-wide text-white uppercase backdrop-blur-sm hover:bg-white/20 hover:text-white"
          >
            View Destination
          </Button>
        </div>
      </div>

      {/* Bottom search strip */}
      <div className="relative z-10 w-full bg-black/30 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col divide-y divide-white/20 sm:flex-row sm:divide-x sm:divide-y-0">
          {searchFields.map((field) => (
            <div
              key={field.label}
              className="flex-1 px-6 py-4 text-left sm:px-8"
            >
              <p className="text-sm font-semibold text-white">{field.label}</p>
              <p className="mt-0.5 text-sm text-white/70">
                {field.placeholder}
              </p>
            </div>
          ))}
          <button
            type="button"
            className="bg-brand px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-brand/85 sm:py-0"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
