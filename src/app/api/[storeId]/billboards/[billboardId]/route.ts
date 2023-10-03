
import { NextResponse } from 'next/server'

import { auth } from '@clerk/nextjs'
import prismadb from '@/lib/prismadb';


export async function GET(
    req: Request,
    {params} : {params: {billboardId: string}}
) {
    const { userId } = auth();
    try {
        
        if (!params.billboardId){
            return new NextResponse("Billboard ID Required", {status: 400})
        }

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_GET]', error)
        return new NextResponse("Internal Error", {status:500})
    }
}

export async function PATCH(
    req: Request,
    //Params is always available in this route function
    {params} : {params: {storeId: string, billboardId: string}}
) {
    try {

        const { userId } = auth();
        const body = await req.json()
        const { label, imageUrl } = body

        if (!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

         
        if (!label){
            return new NextResponse("Label is Required", {status: 400})
        }
        
        if (!imageUrl){
            return new NextResponse("ImageURL is Required", {status: 400})
        }

        if (!params.billboardId){
            return new NextResponse("Billboard ID Required", {status: 400})
        }

        //This layer protects unauthorized users from updating stores that don't belong to them
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status: 404})
        }
        // =================================================================================

        const billboard = await prismadb.billboard.updateMany( {
            where: {
                id: params.billboardId,
                storeId: params.storeId
            },
            data: {
                label,
                imageUrl
            }
        })


        return NextResponse.json(billboard)
        
    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error)
        return new NextResponse("Internal Error", {status:500})
    }
}

export async function DELETE(
    req: Request,
    {params} : {params: {storeId: string, billboardId: string}}
) {
    const { userId } = auth();
    try {

        if (!userId){
            return new NextResponse("Unauthenticated", {status: 401})
        }
        
        if (!params.billboardId){
            return new NextResponse("Billboard ID Required", {status: 400})
        }


        //This layer protects unauthorized users from updating stores that don't belong to them
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Unauthorized", {status: 404})
        }
        // =================================================================================
        
        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId
            }
        })

        return NextResponse.json(billboard)
    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error)
        return new NextResponse("Internal Error", {status:500})
    }

}

