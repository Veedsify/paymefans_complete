import { getToken } from "@/utils/cookie.get";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SettingsBillingProps {
    children: React.ReactNode;
    current_data: Settings;
}

export interface Settings {
    subscription: boolean;
    subscription_price: number;
    subscription_duration: number;
    price_per_message: number;
    enable_free_message: boolean;
}

export interface SettingsBillingContextProps {
    settings: Settings;
    saveSettings: () => void;
    setSubscription: (state: Settings) => void;
}

const settingsBillingContext = createContext({} as SettingsBillingContextProps);

export const useSettingsBillingContext = () => {
    const context = useContext(settingsBillingContext);
    if (context === undefined) {
        throw new Error('useSettingsBillingContext must be used within a SettingsBillingProvider');
    }
    return context;
}

export const SettingsBillingProvider: React.FC<SettingsBillingProps> = ({ children, current_data }) => {
    const router = useRouter();
    const [settings, setSettings] = useState<Settings>(current_data);

    const token = getToken();

    const setSubscription = async (subscription: Settings) => {
        setSettings(subscription);
    };

    const saveSettings = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/settings/billings/message-price`, {
                method: "POST",
                body: JSON.stringify(settings),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                toast.success("Settings saved successfully")
            } else {
                console.log("Error: ", res.status, res.statusText);
            }
        } catch (error) {
            console.error("Error setting subscription: ", error);
        }
    }

    useEffect(() => {
        if (current_data) {
            setSettings(current_data);
        }

        return () => {
            setSettings({
                subscription: false,
                subscription_price: 0,
                subscription_duration: 0,
                price_per_message: 0,
                enable_free_message: false
            });
        }
    }, [current_data]);

    const value = {
        settings,
        saveSettings,
        setSubscription
    };

    return (
        <settingsBillingContext.Provider value={value}>
            {children}
        </settingsBillingContext.Provider>
    );
};
