'use client'

import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface CancelBookingProps {
    bookingId: string
}

export default function CancelBooking({ bookingId }: CancelBookingProps) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isCancelling, setIsCancelling] = useState(false)

    const handleCancelBooking = async () => {
        setIsCancelling(true)
        try {
            await fetch(`http://localhost:5000/delete-booking/${bookingId}`, {
                method: "DELETE",
            })
            router.refresh()
        } finally {
            setIsCancelling(false)
            setOpen(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isCancelling}
                        className="h-9 gap-2 border-destructive/30 px-4 text-destructive hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
                    >
                        <Trash2 />
                        {isCancelling ? "Cancelling..." : "Cancel"}
                    </Button>
                }
            />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will cancel your booking
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancelBooking}>
                        Cancel Booking
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
