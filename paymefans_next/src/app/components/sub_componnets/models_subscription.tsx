import { AllModelsProps } from "@/app/types/user";
import Image from "next/image";
import Link from "next/link";

const ModelsSubscription = ({ model }: { model: AllModelsProps }) => {
    return (
        <div className="flex flex-col items-center gap-2 select-none ">
            <Link href={`/mix/profile/${model?.username}`}>
                <Image
                    width={100}
                    height={100}
                    priority
                    src={model?.profile_image} alt={model ? model.name : ""} className="object-cover w-20 h-20 rounded-full lg:w-24 lg:h-24 aspect-square" />
            </Link>
            <p className="text-sm font-bold text-center">{model?.username}</p>
            <div className="text-sm text-center">
                <span className="block text-xs text-center text-slate-400 ">Monthly</span>
            </div>
            <button className="block w-full px-3 py-1 text-xs font-semibold text-white rounded-md bg-primary-dark-pink">Subscribe</button>
        </div>
    );
}

export default ModelsSubscription;