import { CommonDataType } from "@/Ts/Type";
import { DestinationCard } from "@/components/all-destinations/destination-card";

export default async function AllDestinations() {
    const response = await fetch("http://localhost:5000/all-destinations");
    const allDestinations: CommonDataType[] = await response.json();

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
            <p className="mb-6 text-sm text-neutral-500">
                Showing {allDestinations.length} destinations
            </p>

            {allDestinations.length === 0 ? (
                <p className="text-neutral-500">No destinations found.</p>
            ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {allDestinations.map((destination) => (
                        <DestinationCard
                            key={destination._id}
                            destination={destination}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
