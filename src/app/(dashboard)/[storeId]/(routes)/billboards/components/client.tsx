"use client"

import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { useParams, useRouter } from "next/navigation"

import {Plus} from "lucide-react"
import { Separator } from "@/components/ui/separator"

import { BillboardColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface BillboardClientProps {
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    
    const router = useRouter()
    const params = useParams()  
    
    return (
    
        <>
            <div className="flex items-center justify-between">
                <Heading 
                    title={`Billboards (${data.length})`}
                    description="Manage Billboards for your store"  
                />
                <Button
                    //This syntax is to path to billboard/[billboardId] the thing is new is not a billboardId soo it is just used to trigger a create a new billboard page
                    onClick={() => router.push(`/${params.storeId}/billboards/new`)}
                >
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable 
                columns={columns}
                data={data}
                searchKey={"label" && "createdAt"}
            />
        </>
    )
}
