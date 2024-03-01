"use client"
import { ListOfBanksProps, listOfBanks } from "@/app/lib/banks";
import { useEffect, useState } from "react";

const WalletAddBank = () => {
    const [bank, setBank] = useState<ListOfBanksProps[]>();
    useEffect(() => {
        setBank(() => listOfBanks);
    }, [])

    const AcceptNumbersOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value;
        const regex = /^[0-9\b]+$/;
        if (value === '' || regex.test(value)) {
            return true;
        }
        return false;
    }

    return (
        <div className="p-4 py-8">
            <div className="flex items-center mb-7 lg:hidden">
                <span className="font-bold text-xl flex-shrink-0 ">Add Withdrawal Bank</span>
            </div>
            <div>
                <input type="text" placeholder="Account Number" onChange={AcceptNumbersOnly} className="border p-4 mt-4 w-full rounded-lg pl-5 outline-none" maxLength={10} />
                <input
                    placeholder="Bank Name"
                    type="text"
                    className="border p-4 mt-4 w-full rounded-lg pl-5 outline-none text-black cursor-pointer" />
                <div className="mt-2 rounded-xl p-2 flex flex-col w-full max-h-80 overflow-auto border border-primary-dark-pink">
                    {bank?.map((bank, index) => (
                        <button className="font-bold text-sm block mb-1 text-left p-3 rounded border hover:bg-messages-unread bg-coins-card-bottom text-gray-700" key={index}>
                            {bank.Name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WalletAddBank;