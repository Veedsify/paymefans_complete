const prismaQuery = require("../utils/prisma");
const sanitizeHtml = require('sanitize-html');
const { v4: uuidv4 } = require('uuid');

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
        const newMessage = await prismaQuery.messages.create({
            data: {
                message_id: String(message_id),
                sender_id: sender_id,
                conversationsId: conversationId,
                message: sanitizedHtml,
                seen: false,
                receiver_id: receiver,
                attachment: attachment,
            },
            select: {
                message_id: true
            }
        })

        // Return the data
        return newMessage;
    }


    // Remove points from user
    static async reMovePointsFromUser(sender_id, receiver_id) {
        const sender = await prismaQuery.user.findFirst({
            where: {
                user_id: sender_id
            },
            select: {
                name: true,
                id: true,
                username: true,
                UserPoints: true,
            }
        });

        const receiver = await prismaQuery.user.findFirst({
            where: {
                user_id: receiver_id
            },
            select: {
                name: true,
                id: true,
                username: true,
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

        const purchase_id = uuidv4();
        const purchase_id2 = uuidv4();

        // add to recent transactions
        await prismaQuery.userPointsPurchase.create({
            data: {
                user_id: receiver.id,
                points: receiverPrice,
                amount: receiverPrice,
                message: `You have recevied a message from ${receiver.username} for ${receiverPrice} points`,
                purchase_id,
                success: true
            }
        })

        await prismaQuery.userPointsPurchase.create({
            data: {
                user_id: sender.id,
                points: receiverPrice,
                amount: receiverPrice,
                message: `You have sent a message to ${sender.username} for ${receiverPrice} points`,
                purchase_id: purchase_id2,
                success: false
            }
        })

        return true;

    }

}

module.exports = SaveMessageToDb;