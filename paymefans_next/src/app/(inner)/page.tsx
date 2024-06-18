import PostComponent from "@/components/route_component/post_component";
import StatusComponent from "@/components/route_component/status";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Paymefans",
    description: "This is the home page",
    keywords: "home, page, website",
}

export default function Home() {
    return (
        <>
            <StatusComponent />
            <div className="p-4">

            </div>
        </>
    );
}
