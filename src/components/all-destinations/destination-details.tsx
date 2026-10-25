import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    Check,
    MapPin,
    Pencil,
    Star,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CommonDataType } from "@/Ts/Type";

interface DestinationDetailsProps {
    destination: CommonDataType;
    rating?: number;
    reviewCount?: number;
    highlights?: string[];
}

const defaultHighlights = [
    "Luxury beachfront accommodation",
    "Traditional Balinese spa treatment",
    "Sunrise trek to Mount Batur",
    "Visit Uluwatu Temple at sunset",
    "Private beach dinner experience",
];

export function DestinationDetails({
    destination,
    rating = 4.9,
    reviewCount = 234,
    highlights = defaultHighlights,
}: DestinationDetailsProps) {
    const { destinationName, country, duration, imageUrl, description } =
        destination;

    return (
        <div className="flex flex-col gap-8">
            {/* Action bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                    href="/all-destinations"
                    className="group inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
                >
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
                    Back to Destinations
                </Link>

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        className="h-9 gap-2 border-neutral-300 px-4 text-neutral-800"
                    >
                        <Pencil />
                        Edit
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        className="h-9 gap-2 border-destructive/30 px-4 text-destructive hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
                    >
                        <Trash2 />
                        Cancel
                    </Button>
                </div>
            </div>

            {/* Hero image */}
            {imageUrl ? (
                <div className="overflow-hidden rounded-xl">
                    <Image
                        src={imageUrl}
                        alt={destinationName}
                        width={1600}
                        height={700}
                        priority
                        unoptimized
                        className="aspect-[16/7] w-full object-cover"
                    />
                </div>
            ) : (
                <div className="aspect-[16/7] w-full rounded-xl bg-brand-soft" />
            )}

            {/* Title */}
            <div className="flex flex-col gap-3">
                <p className="flex items-center gap-1.5 text-sm text-neutral-500">
                    <MapPin className="size-4" />
                    {country}
                </p>

                <h1 className="text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
                    {destinationName}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <span className="inline-flex items-center gap-1.5">
                        <Star className="size-4 fill-emerald-500 text-emerald-500" />
                        <span className="font-semibold text-neutral-900">
                            {rating.toFixed(1)}
                        </span>
                        <span className="text-neutral-500">
                            ({reviewCount} reviews)
                        </span>
                    </span>

                    <span className="h-4 w-px bg-neutral-200" />

                    <span className="inline-flex items-center gap-1.5 text-neutral-700">
                        <CalendarDays className="size-4 text-neutral-500" />
                        {duration}
                    </span>
                </div>
            </div>

            {/* Overview */}
            <section className="flex flex-col gap-3">
                <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
                    Overview
                </h2>
                <p className="leading-relaxed text-neutral-600">
                    {description}
                </p>
            </section>

            {/* Highlights */}
            <section className="flex flex-col gap-3">
                <h2 className="text-2xl font-medium tracking-tight text-neutral-900">
                    Highlights
                </h2>
                <p className="leading-relaxed text-neutral-600">
                    {description}
                </p>

                <ul className="mt-2 grid gap-x-6 gap-y-3 sm:grid-flow-col sm:grid-rows-3">
                    {highlights.map((highlight) => (
                        <li
                            key={highlight}
                            className="flex items-start gap-2 text-sm text-neutral-700"
                        >
                            <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                            {highlight}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
