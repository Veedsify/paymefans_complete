const { Server } = require("socket.io");
const messagesSeenByReceiver = require("../libs/messages-seen-by-receiver");
const getUserConversations = require("../libs/get-user-conversations");
const { checkUserFollowing, followUser } = require("../libs/check-user-following");
const SaveMessageToDb = require("../libs/save-message-db");

const serverSocket = (http) => {

    // Socket
    const io = new Server(http, {
        cors: {
            origin: process.env.APP_URL, // Allow this origin
            methods: ["GET", "POST"], // Allow these methods
        },
    });

    // Outside of any function/component
    io.on("connection", (socket) => {
        let room = "";
        const users = {};
        const interval = setInterval(() => {
            getUserConversations(users.userId).then((data) => {
                socket.emit("conversations", data);
            });
        }, 200);

        // Event handler for receiving new messages
        const handleMessage = async (data) => {
            // Save messages here if needed
            const message = await SaveMessageToDb.saveMessage(data);
            socket.to(room).emit("message", {
                ...data,
                message_id: message.message_id,
            });
        };

        // Event handler for marking messages as seen
        const handleSeen = async (data) => {
            const lastMessageSeen = await messagesSeenByReceiver(data);
            if (lastMessageSeen.success) {
                socket
                    .to(room)
                    .emit("message-seen-updated", {
                        messageId: lastMessageSeen.data.message_id,
                        seen: true,
                    });
            }
        };

        // Event handler for typing indication
        const handleTyping = (data) => {
            socket.to(room).emit("sender-typing", { value: data.value, sender_id: data.sender_id });
        };

        const checkFollowing = (data) => {
            checkUserFollowing(data.user_id, data.thisuser_id).then((response) => {
                socket.emit("isFollowing", {
                    status: response.status,
                    followID: response.followId ? response.followId : null,
                });
            });
        }

        const followThisUser = (data) => {
            followUser(data.user_id, data.profile_id, data.status, data.followId).then((response) => {
                socket.emit("followed", { status: response.action == 'followed' ? true : false, followID: response.followUuid });
            });
        }

        // Event handler to check if user is following
        socket.on("checkUserIsFollowing", checkFollowing);

        // Event to follow a user
        socket.on("followUser", followThisUser);

        // Event handler for joining a room
        socket.on("join", (data) => {
            room = data;
            socket.join(data);
            socket.to(room).emit("joined", { message: "User Joined Room" });
        });

        // Event handler for joining a room
        socket.on("user-connected", (data) => {
            users.socketId = socket.id;
            users.userId = data.userId;
        });

        // Listen for new messages
        socket.on("new-message", handleMessage);

        // Listen for messages seen
        socket.on("message-seen", handleSeen);

        // Listen for typing indication
        socket.on("typing", handleTyping);

        // Event handler for user disconnection
        socket.on("disconnect", () => {
            clearInterval(interval);
        });
    });

    return io;

}

module.exports = serverSocket;
