import ModelsSubscription from "@/app/components/sub_componnets/models_subscription";
import { AllModelsProps, AuthUserProps } from "@/app/types/user";
import getSideModels from "@/app/utils/dataFetch/getsidemodels";
import getUserData from "@/app/utils/dataFetch/userdata";
import { LucideSearch } from "lucide-react";

const ModelsPage = async () => {
    const models: AllModelsProps[] = await getSideModels({ limit: 4 })
    const user: AuthUserProps | undefined = await getUserData()
    return (
        <>
            <div className="block p-4 md:p-8" >
                <div className="flex items-center mb-7  lg:hidden">
                    <span className="font-bold text-xl flex-shrink-0">Models/Creators</span>
                </div>
                <div className="relative overflow-auto pb-7">
                    <label className="flex justify-between pr-5 overflow-hidden border border-gray-400 rounded-md">
                        <input type="search" name="Search" id="search" className="w-full p-4 outline-none" placeholder="Search" />
                        <LucideSearch className="self-center pr-2 cursor-pointer" size={30} />
                    </label>

                </div>
                <div className="py-6">
                    <div className="grid grid-cols-3 gap-4 lg:gap-6">
                        {models.map((model, index) => {
                            if (user?.user.id !== model.id) {
                                return <ModelsSubscription model={model} key={model.id} />
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModelsPage;