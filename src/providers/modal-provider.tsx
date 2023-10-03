"use client"
// Global import
import { useEffect, useState } from "react"

import { StoreModal } from "@/components/modals/store-modal"


// Is a client Component
// We are going to wrap the Layout.tsx in app with it. although, there should be a way in order for them to be compatible with each other
export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // This is used to prevent hydration errors
    if (!isMounted) return null

    return (
        <>
            <StoreModal />
        </>
    )
}