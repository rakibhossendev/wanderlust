import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CommonDataType } from "@/Ts/Type";

interface PlanCardProps {
    destination: CommonDataType;
    includes?: string[];
}

const defaultIncludes = [
    "Free cancellation up to 7 days",
    "Travel insurance included",
    "24/7 customer support",
];

export function PlanCard({
    destination,
    includes = defaultIncludes,
}: PlanCardProps) {
    const { destinationName, price, departureDate } = destination;

    return (
        <aside className="lg:sticky lg:top-20">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                {/* Price */}
                <p className="text-xs text-neutral-500">Starting from</p>
                <p className="mt-1 text-4xl font-bold tracking-tight text-brand">
                    ${price}
                </p>
                <p className="mt-1 text-xs text-neutral-500">per person</p>

                <div className="my-5 h-px bg-neutral-200" />

                {/* Departure date */}
                <label htmlFor="departure-date" className="sr-only">
                    Departure date for {destinationName}
                </label>
                <Input
                    id="departure-date"
                    type="date"
                    defaultValue={departureDate}
                    className="h-11 w-full rounded-lg border-neutral-200 bg-white px-3 text-sm text-neutral-800"
                />

                {/* Book now */}
                <Button
                    type="button"
                    className="mt-3 h-11 w-full gap-2 bg-brand text-sm font-semibold text-white hover:bg-brand/90"
                >
                    Book Now
                    <ArrowRight />
                </Button>

                {/* Included perks */}
                <ul className="mt-5 flex flex-col gap-2.5">
                    {includes.map((item) => (
                        <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-neutral-600"
                        >
                            <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
