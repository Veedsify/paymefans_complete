"use client"
import CoinUsedUp from "@/app/components/sub_componnets/coinpurchase/cancelled";
import CoinProcessing from "@/app/components/sub_componnets/coinpurchase/processing";
import CoinPurchaseSuccessful from "@/app/components/sub_componnets/coinpurchase/successful";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";

const PageCallBack = () => {
    const router = useRouter()
    const reference = useSearchParams().get("reference")
    const [successful, setSuccessful] = useState<boolean | null>(null);
    useEffect(() => {
        const verifyBuy = async () => {
            const verifyPurchaseFunction = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/points/callback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${document.cookie.split("token=")[1].split(";")[0]}`,
                },
                body: JSON.stringify({
                    reference: reference
                })
            })
            if (verifyPurchaseFunction.ok) {
                const data = await verifyPurchaseFunction.json();
                if (data.status === true) {
                    setSuccessful(true)
                    router.refresh()
                } else {
                    setSuccessful(false)
                    router.refresh()
                }
            }
        }
        verifyBuy()

    }, [reference, router])

    return (
        <div>
            {successful === null ? (
                <CoinProcessing />
            ) : successful === true ? (
                <CoinPurchaseSuccessful />
            ) : (
                <CoinUsedUp />
            )}
        </div>
    );
}

export default PageCallBack;