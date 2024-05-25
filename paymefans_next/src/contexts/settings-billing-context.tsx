import { createContext, useContext, useEffect, useState } from "react"
interface SettingsBillingProps {
    children: React.ReactNode,
    current_data: Settings
}
export interface Settings {
    subscription: boolean,
    subscription_price: number,
    subscription_duration: number,
    price_per_message: number,
    free_message: boolean
}
export interface SettingsBillingContextProps {
    settings: Settings,
    setSubscription: (state: Settings) => void
}

const settingsBillingContext = createContext({} as SettingsBillingContextProps)

export const useSettingsBillingContext = () => {
    const context = useContext(settingsBillingContext)
    if (context === undefined) {
        throw new Error('useSettingsBillingContext must be used within a SettingsBillingProvider')
    }
    return context
}


export const SettingsBillingProvider: React.FC<SettingsBillingProps> = ({ children, current_data }) => {
    const [settings, setSettings] = useState({
        subscription: false,
        subscription_price: 0,
        subscription_duration: 0,
        price_per_message: 0,
        free_message: false
    })

    const setSubscription = (subscription: Settings) => {
        setSettings({ ...settings, ...subscription })
    }

    useEffect(() => {
        if (current_data) {
            setSettings(current_data)
        }
    }, [current_data])

    const value = {
        settings,
        setSubscription
    }

    return (
        <settingsBillingContext.Provider value={value}>
            {children}
        </settingsBillingContext.Provider>
    )
}