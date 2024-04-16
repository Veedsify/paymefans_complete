import type {Metadata} from "next";
// import { Inter } from "next/font/google";
import {GeistSans} from 'geist/font/sans';
import "../globals.css";
import MenuButtons from "@/components/route_component/menu_buttons";
import ModalComponent from "@/components/route_component/modalComponent";
import SideModels from "@/components/route_component/side_models";
import Header from "@/components/route_component/header";
import SideBar from "@/components/route_component/sidebar";
import {Toaster} from "react-hot-toast";
import QueryProvider from "@/providers/query-provider";
import getUserData from "@/utils/data/user-data";
import {use} from 'react';
import PostComponentPreview from "@/components/post/full-component-preview";
import UserSessionProvider from "@/providers/user-session-provider";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getUserData();
    return (
        <html lang="en">
        <UserSessionProvider user={user}>
            <QueryProvider>
                <body className={GeistSans.className}>
                <Toaster/>
                <div className="relative grid min-h-screen lg:grid-cols-9">
                    <div className="col-span-2">
                        <SideBar/>
                    </div>
                    <div className="col-span-7 overflow-auto border-r">
                        <Header/>
                        <div className="grid min-h-screen lg:grid-cols-7 ">
                            <div className="col-span-4 md:border-r">
                                {children}
                            </div>
                            <SideModels/>
                        </div>
                    </div>
                    <MenuButtons/>
                    <ModalComponent/>
                    <PostComponentPreview/>
                </div>
                </body>
            </QueryProvider>
        </UserSessionProvider>
        </html>
    );
}
