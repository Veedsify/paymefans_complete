"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Bitcoin } from "lucide-react"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
    id: string
    name: string
    username: string
    email: string
    balance: number
}

export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <button
                    className="text-primary-dark-pink px-3 py-5 uppercase font-bold flex"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => <div className="px-3 py-5">
            {row.getValue("name")}
        </div>
    },
    {
        accessorKey: "username",
        header: () => <div className="text-primary-dark-pink px-3 py-5 uppercase font-bold">Username</div>,
        cell: ({ row }) => <div className="px-3 py-5">
            {row.getValue("username")}
        </div>
    },
    {
        accessorKey: "email",
        header: () => <div className="text-primary-dark-pink px-3 py-5 uppercase font-bold">Email</div>,
        cell: ({ row }) => {
            return <div className="font-medium px-3 py-5">{row.getValue("email")}</div>
        },
    },
    {
        accessorKey: "balance",
        header: () => <div className="text-primary-dark-pink px-3 py-5 uppercase font-bold">Balance</div>,
        cell: ({ row }) => {
            const balance = row.getValue("balance") as number
            const formatted = balance.toLocaleString("en-US", {})
            return <div className="font-medium px-3 py-5 flex justify-start items-center gap-2">
                <Bitcoin stroke="#F4900C" />
                {formatted}
            </div>
        },
    },

    {
        id: "actions",
        header: () => <div className="text-primary-dark-pink px-3 py-5 uppercase font-bold">Actions</div>,
        cell: ({ row }) => {
            const payment = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            <Link href={`/user/${payment.username}`}>View User</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Messages</DropdownMenuItem>
                        <DropdownMenuItem>Transaction History</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 font-bold">
                            Delete User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
