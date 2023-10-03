import prismadb from "@/lib/prismadb";
import NavBar from "@/components/navbar";

interface DashboardPageProps {
    params: {
        storeId: string
    }
}


const DashboardPage: React.FC<DashboardPageProps> = async ({params}) => {

    const store = await prismadb.store.findFirst({
        where: {
                id: params.storeId,
            }
        })

    return (
        <div> 
            <div>Store Name: {store?.name}</div>
        </div>
    );
}

export default DashboardPage