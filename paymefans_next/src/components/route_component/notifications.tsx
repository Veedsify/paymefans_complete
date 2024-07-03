import { Bitcoin, BitcoinIcon, LucideCoins, LucideHeart, LucideUser, UserPlus } from "lucide-react";
import { HiCurrencyDollar, HiHeart, HiUser } from "react-icons/hi";

function Notify() {
    return (
        <div>
            Enter
        </div>
    );
}

export function NotificationHeader({ children, notifications }: { children: string; notifications: number; }) {
    return (
        <div>
            <div className="flex items-center mb-7">
                <span className="font-bold text-xl flex-shrink-0">{children}</span>
                <div className="flex items-center justify-center w-8 h-8 aspect-square flex-shrink-0 ml-auto text-white md:py-3 md:px-3 py-1 px-1  bg-primary-text-dark-pink rounded-full font-bold">{
                    notifications > 100 ? "99+" : notifications
                }</div>
            </div>
        </div >
    );
}


export function NotificationBody({ notifications }: { notifications: any[] }) {
    const types = [
        {
            type: 1,
            icon: <HiHeart size={40} fill="#f20" stroke="0" />,
            color: "bg-primary-light-pink"
        },
        {
            type: 2,
            icon: <UserPlus size={40} fill="blue" stroke="0" />,
            color: "bg-primary-light-pink"
        },
        {
            type: 3,
            icon: <HiCurrencyDollar size={40} fill="gold" stroke="0" />,
            color: "bg-primary-light-pink"
        }
    ]
    return (
        <div>
            {notifications.map((notification, index) => (
                <div key={index}>
                    <div className={`w-full border-t ${index + 1 === notifications.length && "border-b"} border-gray-50 p-3 bg-white rounded flex items-center hover:bg-gray-100 cursor-pointer`}>
                        <div aria-label="heart icon" role="img" className="focus:outline-none w-20 h-20 rounded-full border-gray-200 flex items-center justify-center">
                            {
                                notification.type && types.find((type) => type.type === notification.type)?.icon
                            }
                        </div>
                        <div className="pl-7 space-y-3">
                            <p className="focus:outline-none leading-none">
                                You have a new message from a user
                            </p>
                            <p className="focus:outline-none leading-none"><span className="text-primary-dark-pink font-bold" dangerouslySetInnerHTML={{ __html: `James Doe` }}></span> liked your video
                            </p>
                            <p className="focus:outline-none text-sm leading-3 pt-1 text-gray-500">2 hours ago</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}



export default Notify;