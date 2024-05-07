const prismaQuery = require("../utils/prisma");
const sanitizeHtml = require('sanitize-html');

class SaveMessageToDb {

    static async saveMessage(data) {
        // Get the data from the message
        const { message_id, sender_id, receiver_id, conversationId, message, attachment = [] } = data;

        // Remove points from user
        const pointsRemoved = await this.reMovePointsFromUser(sender_id, receiver_id)

        // If points are not removed return an error
        if (pointsRemoved === false) return console.log("Error removing points from user");

        // Get the receiver id
        const receiverId = await prismaQuery.conversations.findFirst({
            where: {
                conversation_id: conversationId
            },
            select: {
                participants: true
            }
        });

        // Sanitize the message
        const sanitizedHtml = sanitizeHtml(message);
        const receiver = receiverId.participants[0].user_1 === sender_id ? receiverId.participants[0].user_2 : receiverId.participants[0].user_1

        // Save the message to the database
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
        // Return the data
        return data
    }


    // Remove points from user
    static async reMovePointsFromUser(sender_id, receiver_id) {
        const sender = await prismaQuery.user.findFirst({
            where: {
                user_id: sender_id
            },
            select: {
                UserPoints: true,
            }
        });

        const receiver = await prismaQuery.user.findFirst({
            where: {
                user_id: receiver_id
            },
            select: {
                Settings: true
            }
        });

        const receiverPrice = receiver?.Settings?.price_per_message !== null ? receiver.Settings.price_per_message : 0;

        if (sender.UserPoints.points < receiverPrice) return false;

        await prismaQuery.user.update({
            where: {
                user_id: sender_id
            },
            data: {
                UserPoints: {
                    update: {
                        points: {
                            decrement: receiverPrice
                        }
                    }
                }
            }
        });

        await prismaQuery.user.update({
            where: {
                user_id: receiver_id
            },
            data: {
                UserPoints: {
                    update: {
                        points: {
                            increment: receiverPrice
                        }
                    }
                }
            }
        });

        return true;

    }

}

module.exports = SaveMessageToDb;