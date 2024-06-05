import { AuthUserProps } from "@/types/user";
import axiosInstance from "@/utils/axios";
import getTransactionsData from "@/utils/data/transactions";
import getUserData from "@/utils/data/user-data";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Wallet",
    description: "Profile page",
};

const page = async () => {
    const user = await getUserData() as AuthUserProps
    const { data: transactions } = await getTransactionsData()
    const { wallet } = await axiosInstance.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/auth/wallet`, {
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies().get("token")?.value}`
        }
    }).then(res => res.data as { wallet: number })

    const { points } = await axiosInstance.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/auth/points`, {
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies().get("token")?.value}`
        }
    }).then(res => res.data as { points: number })


    return (
        <div className="p-4 py-8">
            <div className="flex flex-wrap gap-5 items-center justify-between pb-6">
                <div className="flex align-middle gap-5">
                    <Image src={user.profile_image} width={50} height={50} alt="" priority
                        className="object-cover w-12 h-12 border-2 rounded-full sm:-top-12  -top-12" />
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
                            <Image width={20} height={20} className="w-auto h-5 aspect-square" src="/site/coin.svg"
                                alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {user?.is_model && user?.Model?.verification_status && (
                <>
                    <div className=" bg-black text-white p-5 rounded-xl">
                        <small className="text-md">Your Ballance</small>
                        <h1 className="text-xl md:text-3xl font-bold mb-4">₦ {wallet ? wallet.toLocaleString() : 0}</h1>
                        <button
                            className="block text-sm text-center bg-coins-card-bottom px-6 py-3 rounded-md w-full text-primary-dark-pink font-semibold">WITHDRAW
                        </button>
                    </div>
                    <div>
                        <Link href="/mix/wallet/add"
                            className="block text-center bg-coins-card-bottom px-6 py-3 rounded-md w-full text-primary-dark-pink font-semibold my-5 text-sm md:text-base">SET
                            WITHDRAWAL BANK ACCOUNT</Link>
                    </div>
                </>
            )}
            <div>
                <h2 className="text-xl font-semibold mt-10 mb-10">Transactions</h2>
                <div className="grid gap-4">
                    {transactions.map((transaction: any, i: number) => (
                        <div key={i} className="bg-white rounded-xl">
                            <div className="flex justify-between items-center py-2">
                                <div>
                                    <p className={`text-sm font-semibold ${transaction.success ? "text-green-600" : "text-red-500"}`}>{transaction.success ? "Transaction Successful" : "Transaction Failed"}</p>
                                    <div className="flex items-center gap-3">
                                        <small className="text-xs">{new Date(transaction.created_at).toLocaleDateString("en-US", {
                                            hour: "numeric",
                                            minute: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}</small>
                                    </div>
                                </div>
                                <p className={`text-sm font-semibold flex items-center gap-3 ${transaction.success ? "text-green-600" : "text-red-500"}`}>+{transaction.points}
                                    <Image width={20} height={20} className="w-auto h-5 aspect-square" src="/site/coin.svg"
                                        alt="" />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default page;