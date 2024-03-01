import { ImageVerification } from "@/app/components/sub_componnets/imageVerification";
import VideoVerification from "@/app/components/sub_componnets/videoverification";
import { LucideInfo } from "lucide-react";
import Image from "next/image";

const Verification = () => {
    return (
        <div className="min-h-screen p-5 md:p-7">
            <div className="max-w-screen-xl pt-12 mx-auto mb-24 md:mt-16">
                <h1 className="mt-auto mb-16 text-2xl font-bold text-center">Public Verification</h1>
                <div className="grid grid-cols-3 max-w-96 mx-auto mb-12">
                    <div>
                        <Image width={20} height={20} src="/site/front_verification.svg" alt="" className="block text-center mx-auto mb-4 aspect-square rounded-xl" />
                        <p className="text-center font-medium">FRONT</p>
                    </div>
                    <div>
                        <Image width={20} height={20} src="/site/back_verification.svg" alt="" className="block text-center mx-auto mb-4 aspect-square rounded-xl" />
                        <p className="text-center font-medium">BACK</p>
                    </div>
                    <div>
                        <Image width={20} height={20} src="/site/side_verification.svg" alt="" className="block text-center mx-auto mb-4 aspect-square rounded-xl" />
                        <p className="text-center font-medium">SIDE</p>
                    </div>
                </div>
                <p className="text-sm text-center max-w-96 mx-auto mb-6">
                    Use the guide above. We’ll compare them and if they match your profile will be verified.
                </p>
                <p className="text-sm text-center max-w-96 mx-auto mb-12">
                    You can verify with a face mask if you want.
                </p>
                <form className="flex items-center justify-center gap-6 max-w-96 mx-auto mb-12">
                    <ImageVerification />
                    <VideoVerification />
                </form>
                <div className="bg-coins-card-bottom max-w-96 mx-auto p-4 py-4 rounded-xl flex items-center gap-4" >
                    <span>
                        <LucideInfo className="text-primary-text-dark-pink" size={30} />
                    </span>
                    <p className="text-sm font-medium text-primary-text-dark-pink">
                        Note that these photos will appear on your profile for others to see so make them nice.
                    </p>
                </div>
                <div className="mt-12 flex flex-col justify-center items-center">
                    <form action="">
                        <div>
                            <button className="block w-60 md:w-96 px-3 py-3 text-sm font-bold text-white rounded-lg bg-primary-dark-pink md:max-w-96 disabled:bg-gray-600">CONTINUE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Verification;