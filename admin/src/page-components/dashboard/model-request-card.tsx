"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LucideArrowDownToDot, LucideArrowRightFromLine, LucideArrowUpRight } from "lucide-react";
import Link from "next/link";

const ModelRequestCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="mb-2">Model Signup Request</CardTitle>
                <CardDescription>
                    Heiti Paves is requesting to signup as a model
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Avatar className="inline-block mb-2">
                    <AvatarImage src="/images/canada.jpg" className="rounded-full border w-24 h-24 object-cover" />
                    <AvatarFallback>HP</AvatarFallback>
                </Avatar>
                <p className="font-bold text-lg flex gap-1 items-center">
                    Heiti Paves
                    <Link href="/users/1">
                        <LucideArrowUpRight />
                    </Link>
                </p>
                <p className="text-sm leading-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum voluptate cum delectus quia doloribus cupiditate illum aperiam repellendus qui accusamus!
                </p>
            </CardContent>
            <CardFooter>
                <div className="flex gap-4 items-center">
                    <Button className="font-semibold">Decline</Button>
                    <Button className="bg-primary-dark-pink font-semibold">Approve</Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default ModelRequestCard;