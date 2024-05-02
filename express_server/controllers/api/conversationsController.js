const prismaQuery = require("../../utils/prisma");
const { v4: uuid } = require("uuid");

class ConversationsController {
    static async allConversations(req, res) {
        const conversation = req.params.conversation
        const user = req.user
        const validateUserConversation = await prismaQuery.conversations.findFirst({
            where: {
                conversation_id: conversation,
                OR: [
                    {
                        participants: {
                            every: {
                                user_1: user.user_id,
                            }
                        }
                    },
                    {
                        participants: {
                            every: {
                                user_2: user.user_id
                            }
                        }
                    }
                ]
            },
            select: {
                id: true,
                conversation_id: true,
            }
        })

        if (!validateUserConversation && validateUserConversation === null) {
            return res.json({ message: "Invalid conversation", status: false, invalid_conversation: true });
        }

        const data = await prismaQuery.conversations.findFirst({
            where: {
                conversation_id: conversation
            },
            select: {
                messages: true,
                participants: true
            }
        });

        if (data) {
            let participants = data.participants.find(user => user.user_1 === req.user.user_id ? user.user_2 : user.user_1);
            const receiver = participants.user_1 === req.user.user_id ? participants.user_2 : participants.user_1;
            const receiverData = await prismaQuery.user.findFirst({
                where: {
                    user_id: receiver
                },
                select: {
                    id: true,
                    user_id: true,
                    name: true,
                    username: true,
                    profile_image: true,
                    Settings: true
                }
            });
            console.log(receiverData)
            return res.json({ messages: data.messages, receiver: receiverData });
        };

        return res.json({ message: [] });
    }

    static async createConversation(req, res) {
        try {
            const { userId, profileId } = req.body;
            const conversationId = uuid().split("-").join("");
            // Check if user has a conversation already
            const getConversation = await prismaQuery.conversations.findFirst({
                where: {
                    OR: [
                        {
                            participants: {
                                every: {
                                    user_1: userId,
                                    user_2: profileId
                                }
                            }
                        },
                        {
                            participants: {
                                every: {
                                    user_1: profileId,
                                    user_2: userId
                                }
                            }
                        }
                    ]
                },
                select: {
                    id: true,
                    conversation_id: true,
                }
            })

            if (getConversation) {
                return res.json({ message: "Conversation already exists", status: true, conversation_id: getConversation.conversation_id });
            }

            // Create a new conversation
            const createConversation = await prismaQuery.conversations.create({
                data: {
                    conversation_id: conversationId,
                    participants: {
                        create: {
                            user_1: userId,
                            user_2: profileId
                        }
                    }
                }
            })

            if (createConversation) {
                return res.json({ message: "Conversation created", status: true, conversation_id: conversationId });
            }
            prismaQuery.$disconnect();
        } catch (error) {
            console.log(error);
            return res.json({ message: "An error occured", status: false });
        }
    }
}

module.exports = ConversationsController;
