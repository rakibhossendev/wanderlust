
"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { CommonDataType } from "@/Ts/Type";
import { useRouter } from "next/navigation";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

interface DestinationProps{
    destination: CommonDataType;
}

/** Normalizes a stored date string into `yyyy-mm-dd` for `<input type="date">`. */
function toDateInputValue(value?: string) {
    if (!value) return "";
    return /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : "";
}

export default function EditDestination({destination}: DestinationProps) {
    const router = useRouter();

    const formRef = useRef<HTMLFormElement>(null);
    const initialCategory = destination.category ?? null;
    const [category, setCategory] = useState<string | null>(initialCategory);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const getFormData = Object.fromEntries(formData.entries()) as unknown as CommonDataType;
        const {_id,...updateData } = getFormData
        const response = await fetch(`http://localhost:5000/edit-destination/${destination._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateData)
        });

        const data = await response.json();
        if(data.acknowledged){
            alert("Data Edited Successfully")
            router.refresh();
        }
    }

    function handleCancel() {
        formRef.current?.reset();
        setCategory(initialCategory);
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger render={<Button
                    type="button"
                    variant="outline"
                    className="h-9 gap-2 border-neutral-300 px-4 text-neutral-800"
                >
                    <Pencil />
                    Edit
                </Button>
                } />


                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Update Travel Package</DialogTitle>
                        <DialogDescription>
                            Make changes to the travel package details below
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >
                        {/* Destination Name */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="destination-name">Destination Name</Label>
                            <Input
                                id="destination-name"
                                name="destinationName"
                                defaultValue={destination.destinationName}
                                placeholder="Bali Paradise"
                            />
                        </div>

                        {/* Country | Category */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    name="country"
                                    defaultValue={destination.country}
                                    placeholder="Indonesia"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="category-trigger">Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger
                                        id="category-trigger"
                                        className="w-full"
                                    >
                                        <SelectValue
                                            placeholder={
                                                <span className="text-muted-foreground">Beach</span>
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Price | Duration */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="price">Price (USD)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    defaultValue={destination.price}
                                    placeholder="e.g., 1299"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    name="duration"
                                    defaultValue={destination.duration}
                                    placeholder="e.g., 7 Days/6 Nights"
                                />
                            </div>
                        </div>

                        {/* Departure Date */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="departure-date">Departure Date</Label>
                            <Input
                                id="departure-date"
                                name="departureDate"
                                type="date"
                                defaultValue={toDateInputValue(destination.departureDate)}
                            />
                        </div>

                        {/* Image URL */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="image-url">Image URL</Label>
                            <Input
                                id="image-url"
                                name="imageUrl"
                                type="url"
                                defaultValue={destination.imageUrl}
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                rows={4}
                                defaultValue={destination.description}
                                placeholder="Describe the travel experience..."
                                className="min-h-28 resize-y py-2"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                className="border-destructive/30 px-4 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                                <Trash2 />
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-brand px-4 text-white hover:bg-brand/90"
                            >
                                <Save />
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    )
}
