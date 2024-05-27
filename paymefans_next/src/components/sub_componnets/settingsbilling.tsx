"use client"
import Image from "next/image";
import Toggle from "./checked";
import SubscriptionState from "./subscriptionState";
import { useUserAuthContext } from "@/lib/userUseContext";
import { useSettingsBillingContext } from "@/contexts/settings-billing-context";
import { useState } from "react";
import toast from "react-hot-toast";

const Settingsbilling = () => {
    const { user } = useUserAuthContext()
    const [price, setPrice] = useState<number>(0)
    const { settings, setSubscription } = useSettingsBillingContext()

    const handlePriceSet = (e: any) => {
        setPrice(Number(e.target.value))
    }

    const handleSave = async () => {
        const setPrice = price === 0 ? settings.price_per_message : price
        setSubscription({ ...settings, price_per_message: setPrice, enable_free_message: settings.enable_free_message })
    }

    const handleToggle = (value: boolean) => {
        setSubscription({ ...settings, enable_free_message: value })
    }

    return (
        <div className="py-5">
            <h1 className="font-bold mb-5">Set your message amount</h1>
            <div className="w-full border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl flex gap-2 ">
                <div className="flex gap-2 w-full">
                    <Image width={30} height={30} src="/site/coin.svg" alt="" />
                    <input
                        type="number"
                        onChange={handlePriceSet}
                        defaultValue={settings?.price_per_message}
                        placeholder="Price"
                        className="w-full outline-none font-bold text-gray-700"
                    />
                </div>
                <h2 className="text-primary-dark-pink font-bold">₦{Number(settings?.price_per_message).toLocaleString()}</h2>
            </div>

            <span className="inline-flex gap-2 my-4">
                <Toggle
                    set={handleToggle}
                    state={settings?.enable_free_message} />
                Free message enabled
            </span>

            {user?.is_model && <SubscriptionState />}
            <button
                onClick={handleSave}
                className="text-center text-white bg-primary-dark-pink w-full p-4 rounded-xl">
                SAVE
            </button>
        </div>
    );
}

export default Settingsbilling;