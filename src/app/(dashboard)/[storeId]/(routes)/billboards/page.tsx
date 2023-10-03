import prismadb from "@/lib/prismadb"
import { BillboardClient } from "./components/client"
import { BillboardColumn } from "./components/columns"

import {format} from "date-fns"

const BillboardsPage = async ({
    params 
}:{
    params: {storeId: string}
}
) => {

    const billboard = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedBillboard: BillboardColumn[] = billboard.map((billboard) => ({
        id: billboard.id,
        label: billboard.label,
        createdAt: format(billboard.createdAt, "MMMM do, yyyy")
    })) 

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient data = {formattedBillboard} />
            </div>
        </div>    
    )
}

export default BillboardsPage