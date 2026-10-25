import { notFound } from "next/navigation";
import { CommonDataType } from "@/Ts/Type";
import { DestinationDetails } from "@/components/all-destinations/destination-details";
import { PlanCard } from "@/components/all-destinations/plan-card";

export default async function DestinationDetailsPage({
    params,
}: {
    params: Promise<{ destinationId: string }>;
}) {
    const { destinationId } = await params;

    const response = await fetch(
        `http://localhost:5000/destination/${destinationId}`,
    );

    if (!response.ok) {
        notFound();
    }

    const destination: CommonDataType = await response.json();

    if (!destination?._id) {
        notFound();
    }

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_340px]">
                <DestinationDetails destination={destination} />
                <PlanCard destination={destination} />
            </div>
        </main>
    );
}
