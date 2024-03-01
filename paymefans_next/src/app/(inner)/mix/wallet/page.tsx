import { AuthUserProps } from "@/app/types/user";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
    const { user }: AuthUserProps = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/retrieve`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies().get("token")?.value}`
        },
    }).then(res => res.json()) as AuthUserProps

    const { points } = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/auth/points`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies().get("token")?.value}`
        }
    }).then(res => res.json()) as { points: number }

    const { wallet } = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/auth/wallet`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies().get("token")?.value}`
        }
    }).then(res => res.json()) as { wallet: number }


    return (
        <div className="p-4 py-8">
            <div className="flex flex-wrap gap-5 items-center justify-between pb-6">
                <div className="flex align-middle gap-5">
                    <Image src={user.profile_image} width={50} height={50} alt="" priority className="object-cover w-12 h-12 border-2 rounded-full sm:-top-12  -top-12" />
                    <div className="self-center">
                        <h2 className="font-bold">{user.name}</h2>
                        <p>{user.username}</p>
                    </div>
                </div>
                <div>
                    <Link href="/mix/points" className="p-3 px-8 text-xs font-semibold text-white bg-black rounded">
                        Add Funds
                    </Link>
                </div>
            </div>
            <div className="mb-5 flex align-middle justify-between bg-primary-dark-pink text-white p-5 rounded-xl">
                <div className="grid gap-3">
                    <small className="text-md">Your Ballance</small>
                    <h1 className="text-xl md:text-3xl font-bold">₦ {wallet ? wallet.toLocaleString('en-US') : 0}</h1>
                </div>
                <div className="flex self-center">
                    <div className="bg-coins-card-top md:px-5 md:py-3 p-2 px-4 rounded-md">
                        <div className="opacity-100 flex gap-1">
                            <span>{points ? points.toLocaleString() : 0}</span>
                            <Image width={20} height={20} className="w-auto h-5 aspect-square" src="/site/coin.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className=" bg-black text-white p-5 rounded-xl">
                <small className="text-md">Your Ballance</small>
                <h1 className="text-xl md:text-3xl font-bold mb-4">₦ {wallet ? wallet.toLocaleString() : 0}</h1>
                <button className="block text-sm text-center bg-coins-card-bottom px-6 py-3 rounded-md w-full text-primary-dark-pink font-semibold">WITHDRAW</button>
            </div>
            <div>
                <Link href="/mix/wallet/add" className="block text-center bg-coins-card-bottom px-6 py-3 rounded-md w-full text-primary-dark-pink font-semibold my-5 text-sm md:text-base">SET WITHDRAWAL BANK ACCOUNT</Link>
            </div>
        </div>
    );
}

export default page;