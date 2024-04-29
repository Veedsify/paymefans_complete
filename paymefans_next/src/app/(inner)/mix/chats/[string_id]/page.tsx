import Chats from "@/components/route_component/chats";
import { Message } from "@/components/sub_componnets/message_input";
import GetConversationMessages from "@/utils/data/get-conversation-messages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chats",
  description: "Chats",
};

const ChatsPage = async ({ params }: { params: { string_id: string } }) => {
  const conversationId = params.string_id;
  const data = await GetConversationMessages(conversationId);
  const messages: Message[] = data?.data.messages
  const receiver: string = data?.data.receiver
  return <Chats receiver={receiver} allmessages={messages} conversationId={conversationId} />;
};

export default ChatsPage;
