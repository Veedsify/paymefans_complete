type MessageBubbleProps = {
    message?: string;
    attachment?: {
        type: 'image' | 'video' | 'audio' | 'file';
        url: string;
    };
    sender: 'sender' | 'receiver';
}
const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, message }) => {
    return (
        <div className="flex items-center">
            {message && sender === 'sender' ? (
                <div className="ml-auto max-w-[85%] md:max-w-[60%]">
                    <div className="bg-gray-100 p-4 rounded-2xl font-medium rounded-br-3xl">
                        <p className="leading-relaxed">{message}</p>
                    </div>
                    <small className="text-xs pt-1 float-right">8:43 PM Seen</small>
                </div>
            ) : message && sender === 'receiver' ? (
                <div className="max-w-[85%] md:max-w-[60%]">
                    <div className="bg-primary-dark-pink text-white font-medium p-4 rounded-2xl rounded-bl-3xl">
                            <p className="leading-relaxed">{message}</p>
                        </div>
                        <small className="text-xs">8:43 PM Seen</small>
                </div>
            ): ""}
        </div>
    );
}

export default MessageBubble;