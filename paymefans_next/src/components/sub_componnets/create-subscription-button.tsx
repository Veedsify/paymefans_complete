"use client"

import Link from "next/link"

type CreateSubscriptionButtonProps = {
    user_id: string
}
const CreateSubscriptionButton = ({ user_id }: CreateSubscriptionButtonProps) => {
    return (
        <Link href={`/subscribe/${user_id}`} className="sm:px-4 py-1 px-2 text-sm font-semibold text-white bg-black border border-black rounded text-color">
            Subscribe
        </Link >
    )
}

export default CreateSubscriptionButton