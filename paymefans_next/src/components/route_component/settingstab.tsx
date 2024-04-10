"use client"

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProfileSettings from "../sub_componnets/profilesettings";
import Settingsbilling from "../sub_componnets/settingsbilling";
import SettingSecurity from "../sub_componnets/settingsecurity";
import { AuthUserProps } from "@/types/user";

const SettingsTab = ({ user }: { user: AuthUserProps | null }) => {
    return (
        <div>
            <Tabs
                selectedTabClassName="border-b-4 border-primary-dark-pink"
            >
                <TabList className="flex gap-9 mb-4 border-b">
                    <Tab>
                        <button className="text-black font-bold py-2">Profile</button>
                    </Tab>
                    <Tab>
                        <button className="text-black font-bold py-2">Security</button>
                    </Tab>
                    <Tab>
                        <button className="text-black font-bold py-2">Billing</button>
                    </Tab>
                </TabList>
                <TabPanel>
                    <ProfileSettings user={user} />
                </TabPanel>
                <TabPanel>
                    <SettingSecurity />
                </TabPanel>
                <TabPanel>
                    <Settingsbilling />
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default SettingsTab;