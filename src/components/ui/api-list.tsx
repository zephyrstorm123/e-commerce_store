"use client"

import { useOrigin } from "@/hooks/use-origin"
import { useParams } from "next/navigation"

interface ApiListProps {
    entityName: string,
    entityIdName: string,
}

export const ApiList: React.FC<ApiListProps> = ({
    entityName,
    entityIdName
}) => {

    const params = useParams()
    const origin = useOrigin()

    const baseUrl = `${origin}/api/${params.storeId}/${entityName}`

    return (
        <div>
            ApiList
        </div>
    )
}