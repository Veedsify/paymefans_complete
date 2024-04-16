"use client"
import Link from "next/link"
import { LucideMenu } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()
    return (
        <>
            <span className="cursor-pointer md:hidden block">
                <LucideMenu />
            </span>
            <nav
                className={cn("items-center space-x-4 lg:space-x-6 md:flex hidden", className)}
                {...props}
            >
                <Link
                    href="/"
                    className={`text-sm transition-colors ${pathname == "/" ? "text-primary-dark-pink font-bold" : ""} `}
                >
                    Overview
                </Link>
                <Link
                    href="/users/"
                    className={`text-sm text-muted-foreground transition-colors ${pathname == "/users" ? "text-primary-dark-pink font-bold" : ""}`}
                >
                    Users
                </Link>
                <Link
                    href="/examples/dashboard"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Payments
                </Link>
                <Link
                    href="/examples/dashboard"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Settings
                </Link>
            </nav>
        </>
    )
}