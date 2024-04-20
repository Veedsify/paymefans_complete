"use client"
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextValue {
    user: any;
    updateUser: (newUserData: any) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export const useUserAuthContext = () => {
    const context = useContext(UserContext);
    if (!context || !context.user) {
        throw new Error("useUserAuthContext must be used within a UserContextProvider or user is undefined");
    }
    return context;
}


interface UserContextProviderProps {
    user: any;
    children: ReactNode;
}

export const UserContextProvider = ({ user, children }: UserContextProviderProps) => {
    const [thisUser, setUser] = useState(user);

    const updateUser = (newUserData: any) => {
        setUser(newUserData);
    }

    return (
        <UserContext.Provider value={{ user: thisUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}
