    
import prismadb from "@/lib/prismadb"
import { BillboardForm } from "./components/billboard-form"
const BillboardsPage = async ({
        //We use params because it is a server component
        params
}:{
        params: {billboardId: string}
}
) => {
        
    const billboard = await prismadb.billboard.findUnique({
        where:{
            id: params.billboardId
        }
    })
        
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardForm 
                    initialData={billboard}
                />
            </div>
        </div>    
        )
}

export default BillboardsPage