"use client";

import { socket } from "@/components/sub_componnets/sub/socket";
import { AuthUserProps } from "@/types/user";
import { usePathname, useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface UserContextValue {
    user: AuthUserProps | null;
    updateUser: (newUserData: AuthUserProps) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export const useUserAuthContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserAuthContext must be used within a UserContextProvider");
    }
    return context;
};


interface UserContextProviderProps {
    user: AuthUserProps | null;
    children: ReactNode;
}

export const UserContextProvider = ({ user, children }: UserContextProviderProps) => {
    const router = useRouter();
    const location = usePathname();

    const [thisUser, setUser] = useState<AuthUserProps | null>(null);

    useEffect(() => {
        if (!user) {
            router.push(`/login?redirect=${location}`);
        } else {
            setUser(user);
            socket.emit('user_active', user.user_id);
        }
    }, [user, router, location]);

    const updateUser = (newUserData: AuthUserProps) => {
        setUser(newUserData);
    };

    return (
        <UserContext.Provider value={{ user: thisUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
