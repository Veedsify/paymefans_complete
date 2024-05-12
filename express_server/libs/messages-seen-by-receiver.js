const prismaQuery = require("../utils/prisma");

module.exports = async (data) => {
    const { conversationId, lastMessageId = null } = data;
    if (!conversationId || !lastMessageId) {
        return;
    }

    if (lastMessageId) {
        const updateMessages = await prismaQuery.conversations.update({
            where: {
                conversation_id: conversationId,
            },
            data: {
                messages: {
                    update: {
                        where: {
                            message_id: String(lastMessageId),
                        },
                        data: {
                            seen: true,
                        }
                    },
                },
            },
            select: {
                messages: {
                    where: {
                        message_id: String(lastMessageId),
                    },
                    select: {
                        message_id: true,
                        seen: true,
                    },
                    take: 1,
                }
            }
        })

        prismaQuery.$disconnect();
        return { success: true, data: updateMessages.messages[0] };
    }

}
