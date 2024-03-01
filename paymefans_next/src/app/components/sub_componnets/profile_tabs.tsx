"use client"
import { Suspense, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PostPanel from "./postpanel";
import MediaPanel from "./mediapanel";
import LoadingPost from "./loading_post";
const ProfileTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className="px-2 md:px-5">
      <Tabs
        selectedIndex={selectedTab}
        onSelect={(index) => setSelectedTab(index)}
      >
        <TabList className="flex items-center text-center border-b">
          <Tab className="flex-1 outline-none cursor-pointer">
            <span className="block mb-2 text-sm font-medium">Post</span>
            <span
              className={` block h-[2px] w-full rounded-lg ${selectedTab === 0 ? "bg-primary-dark-pink" : ""
                }`}
            ></span>
          </Tab>
          <Tab className="flex-1 text-center outline-none cursor-pointer">
            <span className="block mb-2 text-sm font-medium">Media</span>
            <span
              className={` block h-[2px] w-full rounded-lg ${selectedTab === 1 ? "bg-primary-dark-pink" : ""
                }`}
            ></span>
          </Tab>
          <Tab className="flex-1 text-center outline-none cursor-pointer">
            <span className="block mb-2 text-sm font-medium">Reposts</span>
            <span
              className={` block h-[2px] w-full rounded-lg ${selectedTab === 2 ? "bg-primary-dark-pink" : ""
                }`}
            ></span>
          </Tab>
          <Tab className="flex-1 outline-none cursor-pointer">
            <span className="block mb-2 text-sm font-medium whitespace-nowrap">
              Locked Media
            </span>
            <span
              className={` block h-[2px] w-full rounded-lg ${selectedTab === 3 ? "bg-primary-dark-pink" : ""
                }`}
            ></span>
          </Tab>
        </TabList>

        <TabPanel>
          <PostPanel />
        </TabPanel>
        <TabPanel>
          <MediaPanel />
        </TabPanel>
        <TabPanel>
          <div className="py-8">
            <p>three!</p>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="py-8">
            <p>four!</p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
