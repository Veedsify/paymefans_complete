import Chats from "@/components/route_component/chats";
import { Message } from "@/components/sub_componnets/message_input";
import GetConversationMessages from "@/utils/data/get-conversation-messages";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Chats",
  description: "Chats",
};

const ChatsPage = async ({ params }: { params: { string_id: string } }) => {
  const conversationId = params.string_id;
  const data = await GetConversationMessages(conversationId);
  if (data?.data.invalid_conversation === true && data?.data.status === false) {
    return redirect("/mix/messages")
  }
  const messages: Message[] = data?.data.messages
  const receiver: string = data?.data.receiver
  const lastMessage = messages[messages.length - 1];
  return <Chats receiver={receiver} allmessages={messages} lastMessage={lastMessage} conversationId={conversationId} />;
};

export default ChatsPage;
