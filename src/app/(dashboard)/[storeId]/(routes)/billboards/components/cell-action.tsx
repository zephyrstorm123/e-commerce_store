"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import axios from "axios"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BillboardColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Copy, Trash } from "lucide-react"
import { AlertModal } from "@/components/modals/alert-modal"

import toast from "react-hot-toast"

interface CellActionProps {
    data: BillboardColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    //Used if directing to another site using the ids
    const router = useRouter()
    const params = useParams()

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success('Copied to clipboard')
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
            router.refresh()
            toast.success('Billboard deleted successfully')
        } catch (error) {
            toast.error('Make sure you remove all products first')
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }



    return (
        //Use fragment to be able to wrap the whole thing in the alert model
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
                <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open options</span>
                                <MoreHorizontal className="w-4 h-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem onClick = {() => router.push(`/${params.storeId}/billboards/${data.id}`)}>
                                <Edit 
                                    className="mr-2 h-4 w-4"
                                    /> Update
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onCopy(data.id)}>
                                <Copy 
                                    className="mr-2 h-4 w-4"
                                    /> Copy Id
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpen(true)}>
                                <Trash 
                                    className="mr-2 h-4 w-4"
                                    /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
        </>
      
    )

}