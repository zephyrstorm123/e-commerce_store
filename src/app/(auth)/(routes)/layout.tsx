// This will serve as the layout of the whole auth routes

export default function AuthLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <div className="flex items-center justify-center h-screen">
            {children}
        </div>
    )
}