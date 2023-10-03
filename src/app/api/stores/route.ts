import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: NextRequest,
)   {
    try {
        const prisma = await prismadb.store.findMany({})

        if(!prisma){
            return NextResponse.json({})
        }

        return NextResponse.json(prisma)
    }   catch (error) {
        console.log('[Stores_GET]', error)
        return new NextResponse("Internal Error", {status:500})
    }
}


export async function POST(
    req: Request
) {
    try{
        const { userId }= auth();
        const body = await req.json()

        const { name} = body

        if (!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!name){
            return new NextResponse("Missing name", {status: 400})
        }

        const store  = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[Stores_POST]', error)
        return new NextResponse("Internal Error", {status:500})
    } finally {
        await prismadb.$disconnect()
    }
}