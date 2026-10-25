'use client'
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
import { redirect } from "next/navigation"

interface DeleteDestinationProps{
    destinationId: string
}

export default function DeleteDestination({destinationId}: DeleteDestinationProps) {
    const handleDeleteDestination = async () => {
        const response = await fetch(`http://localhost:5000/delete-destination/${destinationId}`,{
            method: "DELETE"
        })

        const data = await response.json();
        redirect("/all-destinations");


    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger render={<Button onClick={handleDeleteDestination}
                    type="button"
                    variant="outline"
                    className="h-9 gap-2 border-destructive/30 px-4 text-destructive hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
                >
                    <Trash2 />
                    Delete Destination
                </Button>}>

                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your destination
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}