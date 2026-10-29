"use client";

import { useRef, useState } from "react";
import { Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { getTokenServer } from "@/lib/getToken";


const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];


export default function AddDestinationPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const getFormData = Object.fromEntries(formData.entries()) as unknown;

    const response = await fetch('http://localhost:5000/add-destination',{
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        authorization: `Bearer ${await getTokenServer()}`,
      },
      body: JSON.stringify(getFormData)
    });

    const data = await response.json();

    console.log(data);
  }

  function handleCancel() {
    formRef.current?.reset();
    setCategory(null);
  }

  return (
    <div className="relative">

      <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">
          Add New Travel Package
        </h1>

        <Card className="rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-black/5 [--card-spacing:--spacing(6)]">
          <CardContent>
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
                  placeholder="Bali Paradise"
                  className="border-transparent bg-muted focus-visible:bg-background"
                />
              </div>

              {/* Country | Category */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="Indonesia"
                    className="border-transparent bg-muted focus-visible:bg-background"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="category-trigger">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger
                      id="category-trigger"
                      className="w-full border-transparent bg-muted"
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
                    placeholder="e.g., 1299"
                    className="border-transparent bg-muted focus-visible:bg-background"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g., 7 Days/6 Nights"
                    className="border-transparent bg-muted focus-visible:bg-background"
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
                  className="border-transparent bg-muted focus-visible:bg-background"
                />
              </div>

              {/* Image URL */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="border-transparent bg-muted focus-visible:bg-background"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe the travel experience..."
                  className="min-h-28 resize-y border-transparent bg-muted py-2 focus-visible:bg-background"
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
                  <Send />
                  Add Travel Package
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
