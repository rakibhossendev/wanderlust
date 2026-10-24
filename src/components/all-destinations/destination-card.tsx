import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import type { CommonDataType } from "@/Ts/Type";

interface DestinationCardProps {
    destination: CommonDataType;
    rating?: number;
}

export function DestinationCard({
    destination,
    rating = 4.5,
}: DestinationCardProps) {
    const { destinationName, country, price, duration, imageUrl } =
        destination;

    return (
        <article className="group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-md">
            {/* Image + rating badge */}
            <div className="relative overflow-hidden rounded-lg">
                <Image
                    src={imageUrl}
                    alt={destinationName}
                    width={640}
                    height={400}
                    unoptimized
                    className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-sm font-medium text-neutral-900 backdrop-blur-sm">
                    {rating.toFixed(1)}
                    <Star className="size-3.5 fill-neutral-900 text-neutral-900" />
                </span>
            </div>

            {/* Country */}
            <p className="flex items-center gap-1.5 text-sm text-neutral-500">
                <MapPin className="size-4" />
                {country}
            </p>

            {/* Name + price */}
            <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-neutral-900">
                    {destinationName}
                </h3>
                <p className="shrink-0 whitespace-nowrap">
                    <span className="text-lg font-semibold text-neutral-900">
                        ${price}
                    </span>
                    <span className="text-xs text-neutral-500">/Person</span>
                </p>
            </div>

            {/* Duration */}
            <p className="flex items-center gap-1.5 text-sm text-neutral-500">
                <CalendarDays className="size-4" />
                {duration}
            </p>

            {/* Book now */}
            <Link
                href="/add-destination"
                className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-semibold tracking-widest text-brand uppercase transition-colors hover:text-brand/80"
            >
                Book Now
                <ArrowUpRight className="size-3.5" />
            </Link>
        </article>
    );
}
