"use client"
import { SelectMoreProps } from "@/types/components";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { HiCamera } from "react-icons/hi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

function StoryComponent() {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [openMore, setOpenMore] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!videoRef.current) return
        if (videoRef.current) {
            navigator.mediaDevices.getUserMedia({
                video: true,
            }).then((stream) => {
                videoRef.current!.srcObject = stream;
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [videoRef])

    const handleOpenMore = () => {
        setOpenMore(!openMore)
    }

    return (
        <React.Fragment>
            <div className="w-full">
                <div className="max-w-[550px] h-[90vh] mx-auto relative overflow-hidden shadow-lg">
                    <video ref={videoRef}
                        onClick={e => setOpenMore(false)}
                        playsInline autoPlay muted loop className="w-full object-cover h-full rounded block mx-auto">
                        <source src="" />
                    </video>

                    <button className="bg-white shadow-lg w-16 h-16 md:w-24 md:h-24 inline-block absolute bottom-24 md:bottom-36 z-10 p-2 rounded-full left-1/2 -translate-x-1/2 cursor-pointer active:scale-95 origin-center">
                    </button>

                    <Image src="https://images.pexels.com/photos/19276913/pexels-photo-19276913/free-photo-of-young-brunette-on-balcony-against-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="choose image" width={60} height={60} className="md:border-4 border-2 border-white shadow-2xl aspect-square object-cover h-10 md:h-16 w-10 md:w-16 block absolute bottom-3 z-10 rounded-lg left-3 cursor-pointer active:scale-95 origin-center"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleOpenMore()
                        }}
                    />
                    <SelectMore openMore={openMore} handleOpenMore={handleOpenMore} />
                </div>
            </div>
        </React.Fragment>
    );
}


export const SelectMore = ({ openMore, handleOpenMore }: SelectMoreProps) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <div className={`absolute bottom-0 left-0 z-20 bg-white w-full ${openMore ? "h-[60%]" : "h-[0%]"} transition-all duration-300 ease-in-out shadow-lg rounded-br rounded-bl`}>
            <div className="flex justify-between items-center pb-6 p-3 md:p-5">
                <h1 className="font-semibold md:text-lg">Select More</h1>
                <button onClick={handleOpenMore}>
                    <X size={30} strokeWidth={2} />
                </button>
            </div>
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)} className="flex flex-col h-full" selectedTabClassName="bg-coins-card-bottom">
                <TabList className="flex items-center text-center border-bx">
                    <Tab className="flex-1 outline-none cursor-pointer duration-300 transition-all">
                        <span className="block p-1 md:p-2 text-sm font-medium">New</span>
                    </Tab>
                    <Tab className="flex-1 text-center outline-none cursor-pointer duration-300 transition-all">
                        <span className="block p-1 md:p-2 text-sm font-medium">My Media</span>
                    </Tab>
                </TabList>
                <TabPanel className={`flex flex-col ${tabIndex === 0 && "flex-1"} overflow-y-auto`}>
                    <form className="flex-1">
                        <label htmlFor="image" className="text-sm font-semibold w-full h-full flex flex-1 gap-3 flex-col items-center justify-center p-5 hover:bg-gray-100 duration-300 ease-in-out">
                            <HiCamera size={40} />
                            <span>Select a photo or video</span>
                            <input type="file" id="image" className="p-2 border-2 rounded-lg hidden" />
                        </label>
                    </form>
                </TabPanel>
                <TabPanel className={`flex flex-col ${tabIndex === 1 && "flex-1"} overflow-y-auto`}>
                    <div className="p-3 md:p-5 md:pb-0 pb-0 flex items-center gap-3">
                        <input type="checkbox" name="check" id="check" className="h-6 w-6 rounded-lg accent-primary-dark-pink" />
                        <label htmlFor="check" className="font-semibold select-none cursor-pointer">
                            Select Multiple
                        </label>
                    </div>
                    <div className="flex-1">
                        <div className="grid grid-cols-3 gap-2 p-3 md:p-5 h-full overflow-y-auto">
                            <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
                            <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
                            <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
                            <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
                            <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
                            <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
                            <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
                            <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
                            <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
                            <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
                            <div className="bg-gray-200 w-full aspect-square rounded-lg"></div>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default StoryComponent;