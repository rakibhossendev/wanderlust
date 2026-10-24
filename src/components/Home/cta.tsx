import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BannerImage from "@/assets/CTA.png"

export function Cta() {
  return (
    <section className="relative flex min-h-[24rem] w-full items-center justify-center overflow-hidden">
      {/* Background image + overlay */}
      <Image
        src={BannerImage}
        alt="Airplane wing flying over a tropical island and turquoise sea"
        fill
        sizes="100vw"
        loading="eager"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-black/60" />

      {/* Centered content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <h2 className="text-4xl font-light tracking-tight text-white sm:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-base text-white/80">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button
          size="lg"
          className="mt-8 rounded-md bg-white px-8 text-sm font-semibold tracking-wide text-neutral-900 uppercase hover:bg-white/90"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
