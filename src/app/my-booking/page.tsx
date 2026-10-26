import { auth } from "@/lib/auth";
import { BookingDataType } from "@/Ts/Type";
import { headers } from "next/headers";
import BookingCard from "@/components/booking/bookingCard";

export default async function MyBooking() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const response = await fetch(
        `http://localhost:5000/booking/${session?.user.email}`
    );
    const bookingData: BookingDataType[] = await response.json();

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
            <h1 className="text-4xl font-light tracking-tight text-neutral-900">
                My Bookings
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
                Manage and view your upcoming travel plans
            </p>

            {bookingData.length === 0 ? (
                <p className="mt-10 text-neutral-500">No bookings yet.</p>
            ) : (
                <div className="mt-8 space-y-6">
                    {bookingData.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} />
                    ))}
                </div>
            )}
        </main>
    );
}
