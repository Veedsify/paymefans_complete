"use client"
import { DataTable } from "@/data/users/data-table"
import { Users, columns } from '../../data/users/columns';
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

async function getData(): Promise<Users[]> {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            name: "Brittany Mills",
            username: "@britnney12",
            email: "m@example.com",
            balance: 24522
        },
        {
            id: "728ed52f",
            name: "Timothy Miles",
            username: "@timmy",
            email: "s@gmail.com",
            balance: 10022
        },
        {
            id: "728ed52f",
            name: "Jane Doe",
            username: "@jane",
            email: "j@manny@gmial.com",
            balance: 122
        },
        {
            id: "728ed52f",
            name: "John Doe",
            username: "@john",
            email: "j@h.com",
            balance: 12223
        },
    ]
}

export default function UsersTable() {
    const [filteredData, setFilteredData] = useState<Users[]>([])
    const [originalData, setOriginalData] = useState<Users[]>([])
    const [rowCount, setRowCount] = useState<number>(0)

    const rowCountUpdate = (value: string) => {
        setRowCount(Number(value))
        setFilteredData(originalData.slice(0, Number(
            value === "all" ? originalData.length : value
        )))
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData()
            setOriginalData(data)
            setFilteredData(data)
        }
        fetchData()
    }, [])

    const sortThisData = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value) {
            const filtered = originalData.filter((data) => {
                return data.username.toLowerCase().includes(value.toLowerCase())
            })
            setFilteredData(filtered)
        } else {
            setFilteredData(originalData)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Filter usernames..."
                    onChange={sortThisData}
                    className="max-w-sm"
                />
                <Select onValueChange={rowCountUpdate}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort By Number" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="100">11 - 100</SelectItem>
                        <SelectItem value="500">101 - 500</SelectItem>
                        <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                </Select>

            </div>
            <div className="mx-auto">
                {filteredData && <DataTable columns={columns} data={filteredData} />}
            </div>
        </>
    )
}
