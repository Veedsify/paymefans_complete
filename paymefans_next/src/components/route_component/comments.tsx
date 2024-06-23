import Image from "next/image";
import { LucideBarChart, LucideHeart, LucideMessageSquare, LucideRepeat2, LucideShare } from "lucide-react";

const CommentsHolder = () => {
    return (
        <div className="border-y p-0 md:p-3 py-5">
            <div className="flex gap-1 md:gap-3 items-start relative">
                <div className="absolute border-r h-full top-0 left-4 md:left-7 -z-10 -translate-1/2">
                </div>
                <Image src="/site/avatar.png" width="50" height="50" className="h-auto aspect-square rounded-full w-8 md:w-14" alt="" />
                <div>
                    <h3>
                        <span className="md:text-lg text-sm font-bold">The Rock</span>  &nbsp;<span className="md:text-lg text-sm">@thisisrock</span>  &nbsp; . &nbsp; <span className="md:text-lg text-sm">11hr</span>
                    </h3>
                    <div className="md:text-lg text-sm mb-2">
                        <div className="mb-3">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae doloribus ipsa rem corrupti eveniet omnis nostrum, repellendus maiores obcaecati vero aut quos alias enim ipsam dicta sapiente inventore repudiandae. Natus!
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <Image src="https://images.pexels.com/photos/15045083/pexels-photo-15045083/free-photo-of-woman-in-hat-posing-by-vintage-car.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" width="500" height="500" className="h-auto aspect-square rounded-lg object-cover w-auto" alt="" />
                            <Image src="https://images.pexels.com/photos/26052406/pexels-photo-26052406/free-photo-of-what-s-up.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" width="500" height="500" className="h-auto aspect-square rounded-lg object-cover w-auto" alt="" />
                        </div>
                    </div>
                    <ReplyInteractions />
                </div>
            </div>
            <div className="flex gap-1 md:gap-3 items-start relative">
                <div className="absolute border-r h-full top-0 left-4 md:left-7 -z-10 -translate-1/2">
                </div>
                <Image src="/site/avatar.png" width="50" height="50" className="h-auto aspect-square rounded-full w-8 md:w-14" alt="" />
                <div>
                    <h3>
                        <span className="md:text-lg text-sm font-bold">The Rock</span>  &nbsp;<span className="md:text-lg text-sm">@thisisrock</span>  &nbsp; . &nbsp; <span className="md:text-lg text-sm">11hr</span>
                    </h3>
                    <div className="md:text-lg text-sm mb-2">
                        <div>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae doloribus ipsa rem corrupti eveniet omnis nostrum, repellendus maiores obcaecati vero aut quos alias enim ipsam dicta sapiente inventore repudiandae. Natus!
                        </div>
                    </div>
                    <ReplyInteractions />
                </div>
            </div>
            <div className="flex gap-1 md:gap-3 items-start relative">
                <Image src="/site/avatar.png" width="50" height="50" className="h-auto aspect-square rounded-full w-8 md:w-14" alt="" />
                <div>
                    <h3>
                        <span className="md:text-lg text-sm font-bold">The Rock</span>  &nbsp;<span className="md:text-lg text-sm">@thisisrock</span>  &nbsp; . &nbsp; <span className="md:text-lg text-sm">11hr</span>
                    </h3>
                    <div className="md:text-lg text-sm mb-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae doloribus ipsa rem corrupti eveniet omnis nostrum, repellendus maiores obcaecati vero aut quos alias enim ipsam dicta sapiente inventore repudiandae. Natus!
                    </div>
                    <ReplyInteractions />
                </div>
            </div>
        </div>
    )
}

const ReplyInteractions = () => {
    return (
        <div className="flex items-center justify-between p-2 md:p-6 mb-8">
            <span className="flex items-center gap-1 text-xs cursor-pointer font-medium ">
                <LucideHeart size={18} />
                23
            </span>
            <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                <LucideMessageSquare size={18} />
                16
            </span>
            <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                <LucideRepeat2 size={18} />
                2
            </span>
            <span className="flex items-center gap-1 text-xs cursor-pointer font-medium">
                <LucideBarChart size={18} />
                20.3K
            </span>
        </div>
    )
}


export default CommentsHolder;