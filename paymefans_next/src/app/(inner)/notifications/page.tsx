import { NotificationBody, NotificationHeader } from "@/components/route_component/notifications";
import { Metadata } from "next";

interface Notification {
    title: string;
    description: string;
    date: string;
    type: number;
}

export const metadata: Metadata = {
    title: "Notifications",
    description: "Notifications",
}

const Notifications = () => {
    const notifications: Notification[] = [
        {
            title: "New Message",
            description: "You have a new message from a user",
            date: "2 hours ago",
            type: 1
        },
        {
            title: "New Message",
            description: "You have a new message from a user",
            date: "2 hours ago",
            type: 2
        },
        {
            title: "New Message",
            description: "You have a new message from a user",
            date: "2 hours ago",
            type: 3
        },
    ]
    return (
        <div>
            <div className="md:py-5 md:px-8 p-3">
                <NotificationHeader notifications={290}>
                    Notifications
                </NotificationHeader>
            </div>
            <NotificationBody
                notifications={notifications}
            />
        </div>
    );
}

export default Notifications;