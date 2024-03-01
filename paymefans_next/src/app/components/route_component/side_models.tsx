"use client"
import { LucideSearch, } from "lucide-react";
import ModelsSubscription from "../sub_componnets/models_subscription";
import HookupSubscription from "../sub_componnets/hookup_subscription";
import Link from "next/link";
import { AllModelsProps, AuthUserProps } from "@/app/types/user";
import { useEffect, useState } from "react";
import ModelLoader from "@/app/components/loaders.tsx/modelloader";
import { delay } from "@/app/utils/delay";

const SideModels = () => {
  const [models, setModels] = useState<AllModelsProps[] | undefined>([])
  const [user, setUser] = useState<AuthUserProps | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      const user: AuthUserProps | undefined = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/retrieve`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("token=")[1].split(";")[0]}`,
          },
        }).then(res => res.json())
      setUser(user)
      const models = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/models/all`,
        {
          method: "POST",
          body: JSON.stringify({
            limit: 4,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("token=")[1].split(";")[0]}`,
          },
        })
      if (models.ok) {
        const data = await models.json();
        delay(1500)
        setModels(() => {
          return data.models.filter((model: AllModelsProps) => user?.user.id !== model.id) as AllModelsProps[];
        });
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-4 lg:block hidden lg:col-span-3">
      <div className="max-w-[450px]">
        <div className="relative overflow-auto mb-8">
          <label className="flex justify-between border border-gray-400 rounded-md pr-5 overflow-hidden">
            <input type="search" name="Search" id="search" className="p-4 w-full outline-none" placeholder="Search" />
            <LucideSearch className="self-center pr-2 cursor-pointer" size={30} />
          </label>
        </div>
        <div className="flex align-middle justify-between pb-6">
          <span className="font-bold">Models/Creators</span>
          <span>
            <Link href="/mix/models" className="bg-primary-dark-pink text-white px-3 text-sm py-1 font-semibold rounded-md">View All</Link>
          </span>
        </div>
        <div className="py-6 mb-6">
          {!models || models.length === 0 && <ModelLoader />}
          {models && (
            <div className="grid gap-4 lg:gap-6 grid-cols-3">
              {models?.map((model, index) => {
                return <ModelsSubscription model={model} key={model.id} />
              })}
            </div>
          )}
        </div>
        <hr className="" />
        <div className="flex align-middle justify-between  my-8">
          <span className="font-bold">Hookup</span>
          <span>
            <Link href="/hookup" className="bg-primary-dark-pink text-white px-3 text-sm py-1 font-semibold rounded-md">View All</Link>
          </span>
        </div>
        <div className="grid gap-4 lg:gap-6 grid-cols-3 ">
          <HookupSubscription />
          <HookupSubscription />
          <HookupSubscription />
          <HookupSubscription />
        </div>
      </div>
    </div>
  );
}

export default SideModels;