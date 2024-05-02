const prismaQuery = require("../utils/prisma");
const sanitizeHtml = require('sanitize-html');

class SaveMessageToDb {

    static async saveMessage(data) {
        const { message_id, sender_id, conversationId, message, attachment = [] } = data;

        const receiverId = await prismaQuery.conversations.findFirst({
            where: {
                conversation_id: conversationId
            },
            select: {
                participants: true
            }
        })

        const receiver = receiverId.participants[0].user_1 === sender_id ? receiverId.participants[0].user_2 : receiverId.participants[0].user_1
        const sanitizedHtml = sanitizeHtml(message);

        await prismaQuery.messages.create({
            data: {
                message_id: String(message_id),
                sender_id: sender_id,
                conversationsId: conversationId,
                message: sanitizedHtml,
                seen: false,
                receiver_id: receiver,
                attachment: attachment,
            }
        })
        return data
    }

}

module.exports = SaveMessageToDb;