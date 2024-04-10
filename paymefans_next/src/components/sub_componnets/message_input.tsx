import { LucidePlus, LucideCamera, LucideSendHorizonal } from "lucide-react";
const MessageInput = () => {
    return (
        <div className="position-fixed bottom-0 
        
        lg:mx-4">
            <div className="flex items-center gap-5 px-6 bg-gray-100 lg:py-2 py-4 lg:rounded-xl">
                <textarea placeholder="Type your message...." className="bg-transparent outline-none w-full p-2 font-semibold resize-none"></textarea>
                <LucidePlus fill="#fff" stroke="#CC0DF8" size={35}/>
                <LucideCamera fill="#fff" stroke="#CC0DF8" size={35}/>
                <LucideSendHorizonal fill="#fff" stroke="#CC0DF8" size={35} />
            </div>
        </div>
    );
}

export default MessageInput;