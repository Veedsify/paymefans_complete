"use client"
import { useState } from "react";
import SetSubscription from "./setsubscription";

const SubscriptionState = () => {
    const [subscription, setSubscriptionState] = useState(false);
    return (
        <div>
            <button onClick={() => setSubscriptionState(!subscription)}
                className="text-center bg-[#FAE2FF] my-2 text-primary-dark-pink w-full p-4 rounded-xl block cursor-pointer font-bold">
                SET SUBSCRIPTION PRICE
            </button>

            {subscription && (<SetSubscription />)}

        </div>
    );
}

export default SubscriptionState;