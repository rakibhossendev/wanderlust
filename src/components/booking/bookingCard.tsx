import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CircleCheck, Clock, Eye, ReceiptText } from "lucide-react";
import type { BookingDataType } from "@/Ts/Type";
import { Button } from "@/components/ui/button";
import CancelBooking from "@/components/booking/cancel-booking";

interface BookingCardProps {
    booking: BookingDataType;
}

function formatDepartureDate(departureDate: string) {
    const date = new Date(departureDate);
    if (Number.isNaN(date.getTime())) return departureDate;

    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function StatusBadge({ status }: { status?: string }) {
    if (status === "Pending") {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                <Clock className="size-3.5" />
                Pending
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            <CircleCheck className="size-3.5" />
            Confirmed
        </span>
    );
}

export default function BookingCard({ booking }: BookingCardProps) {
    const {
        _id,
        destinationName,
        price,
        departureDate,
        imageUrl,
        status,
        destinationId,
    } = booking;

    return (
        <article className="group flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-md sm:flex-row sm:gap-6">
            {/* Image */}
            <div className="overflow-hidden rounded-lg sm:w-64 sm:shrink-0">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={destinationName}
                        width={640}
                        height={400}
                        unoptimized
                        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                )}
            </div>

            {/* Details */}
            <div className="flex min-w-0 flex-1 flex-col">
                <StatusBadge status={status} />

                <h2 className="mt-2 text-2xl font-bold text-neutral-900 transition-colors duration-300 group-hover:text-brand">
                    {destinationName}
                </h2>

                <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                    <CalendarDays className="size-4" />
                    Departure: {formatDepartureDate(departureDate)}
                </p>

                <p className="mt-1 flex items-center gap-2 text-sm text-neutral-500">
                    <ReceiptText className="size-4" />
                    Booking ID: {_id}
                </p>

                <p className="mt-3 text-2xl font-bold text-brand">${price}</p>

                {/* Actions */}
                <div className="mt-4 flex justify-end gap-2">
                    <CancelBooking bookingId={_id} />
                    <Button
                        render={<Link href={`/all-destinations/${destinationId ?? _id}`} />}
                        nativeButton={false}
                        className="h-9 gap-2 bg-brand px-4 text-white transition-colors duration-300 hover:bg-brand/90"
                    >
                        <Eye />
                        View
                    </Button>
                </div>
            </div>
        </article>
    );
}
