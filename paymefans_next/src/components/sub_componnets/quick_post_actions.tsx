"use client"
import { LucideEye, LucideEyeOff, LucideMoreVertical, LucidePen, LucideTrash } from "lucide-react";
import { RefObject, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useUserAuthContext } from "@/lib/userUseContext";

type QuickPostActionsProps = {
    options: {
        post_id: string;
        username: string;
    }
}

const QuickPostActions = ({ options }: QuickPostActionsProps) => {
    const [open, setOpen] = useState(false);
    const quickMenuRef = useRef(null) as RefObject<HTMLDivElement>;
    const { user } = useUserAuthContext();

    const ownerOptions = [
        {
            name: "Edit",
            icon: <LucidePen className="mr-2" size={16} />,
            link: "/edit-post"
        },
        {
            name: "Set visibility",
            icon: <LucideEye className="mr-2" size={16} />,
            link: "/edit-post"
        },
        {
            name: "Delete",
            icon: <LucideTrash className="mr-2" size={16} />,
            link: "/edit-post"
        }
    ]

    const publicOptions = [
        {
            name: "Report",
            icon: <LucideTrash className="mr-2" size={16} />,
            link: "/edit-post"
        },
        {
            name: "Hide",
            icon: <LucideEyeOff className="mr-2" size={16} />,
            link: "/edit-post"
        }
    ]

    useEffect(() => {
        if (open) {
            const handleClickOutside = (event: MouseEvent) => {
                if (quickMenuRef.current && !quickMenuRef.current.contains(event.target as Node)) {
                    setOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [open, quickMenuRef]);


    return (
        <div className="relative" id="quick_menu" ref={quickMenuRef}>
            <span onClick={() => setOpen(true)}>
                <LucideMoreVertical className="cursor-pointer" size={20} />
            </span>
            <div className={`absolute right-0 py-3 z-20 duration-300 transition-all ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                <ul className="bg-white border shadow-2xl overflow-hidden rounded-lg w-52 py-1">
                    {user?.username === options.username ? (
                        ownerOptions.map((option, index) => (
                            <li key={index} className="py-2 hover:bg-gray-50 border-b">
                                <Link href={option.link} className="font-medium text-black flex items-center text-sm py-1 px-3">
                                    {option.icon}
                                    {option.name}
                                </Link>
                            </li>
                        ))
                    ) : (
                        publicOptions.map((option, index) => (
                            <li key={index} className="py-2 hover:bg-gray-50 border-b">
                                <Link href={option.link} className="font-medium text-black flex items-center text-sm py-1 px-3">
                                    {option.icon}
                                    {option.name}
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default QuickPostActions;