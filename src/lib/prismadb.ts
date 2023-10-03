// initializing a new prisma

import {PrismaClient} from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined
};

const prismadb = globalThis.prisma || new PrismaClient();

//Makes sure that when in development, the application will not be doubled by nextjs. causing errors
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prismadb;
}

export default prismadb;