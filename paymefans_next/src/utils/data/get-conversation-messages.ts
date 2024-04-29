import { cookies } from "next/headers";
import axiosInstance from "../axios";

export default async function GetConversationMessages(conversationId:string) {
    const response = axiosInstance.get(`/conversation/get-messages/${conversationId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookies().get("token")?.value}`
        }
    })
    if (response) {
        return response
    }
    return null
}