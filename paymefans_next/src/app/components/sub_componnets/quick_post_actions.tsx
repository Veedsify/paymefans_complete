import { LucideEye, LucideMoreVertical, LucidePen, LucideTrash } from "lucide-react";
import { RefObject, useEffect, useRef, useState } from "react";
import Link from "next/link";

const QuickPostActions = () => {
    const [open, setOpen] = useState(false);
    const quickMenuRef = useRef(null) as RefObject<HTMLDivElement>;

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
                    <li className="py-2 hover:bg-gray-50 border-b">
                        <Link href="/edit-post" className="font-medium text-black flex items-center text-sm py-1 px-3">
                            <LucidePen className="mr-2" size={16} />
                            Edit
                        </Link>
                    </li>
                    <li className="py-2 hover:bg-gray-50 border-b">
                        <Link href="/edit-post" className="font-medium text-black flex items-center text-sm py-1 px-3">
                            <LucideEye className="mr-2" size={16} />
                            Set visibility
                        </Link>
                    </li>
                    <li className="py-2 hover:bg-gray-50">
                        <Link href="/edit-post" className="font-medium text-black flex items-center text-sm py-1 px-3">
                            <LucideTrash className="mr-2" size={16} />
                            Delete
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default QuickPostActions;