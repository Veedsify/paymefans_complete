"use client"

import { ActiveProfileTagProps, handleActiveUsersProps } from "@/types/components";
import { useEffect, useState } from "react";
import { socket } from "./socket";

const ActiveProfileTag = ({ userid, withText, scale }: ActiveProfileTagProps) => {
     const [active, setActive] = useState(false);
     const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());

     useEffect(() => {
          if (!socket.active) {
               setActive(false);
               return;
          }

          const handleActiveUsers = (users: handleActiveUsersProps[]) => {
               const isActive = users.some(user => user.userid === userid);
               setActive(isActive);
               if (isActive) {
                    setLastActivityTime(Date.now());
               }
          };

          socket.on('active_users', handleActiveUsers);

          return () => {
               socket.off('active_users', handleActiveUsers);
          };
     }, [userid]);

     useEffect(() => {
          const checkForInactivity = () => {
               if (Date.now() - lastActivityTime > 10000) { // 10 seconds of inactivity
                    setActive(false);
               }
          };

          const intervalId = setInterval(checkForInactivity, 1000);

          return () => clearInterval(intervalId);
     }, [lastActivityTime]);

     return (
          <div className="flex items-center gap-2">
               <span
                    style={{ scale: scale ? scale : 1 }}
                    className={`p-1 ${active ? "bg-green-500" : "bg-gray-300"} inline-block w-1 h-1 rounded-full`}></span>
               {withText && <p>{active ? "Online" : "Offline"}</p>}
          </div>
     );
};

export default ActiveProfileTag;
