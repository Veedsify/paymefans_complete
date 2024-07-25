const prismaQuery = require("../utils/prisma");
const hashPassword = require("../utils/passwordHasher");
const { v4: uuid } = require("uuid");
const sendWelcomeEmail = require("../libs/send-welcome-email");
const mongo = require("../db/mongoose");
const { PostLike, User } = require("../db/db.models");
module.exports = async (body) => {
  const registerData = body;

  if (!registerData) return { error: "Invalid request", status: false };

  if (!registerData?.name || !registerData?.username || !registerData?.email || !registerData?.phone || !registerData?.password || !registerData?.location) {
    return {
      error: `Sorry ${!registerData?.name ? 'name' : !registerData?.username ? 'username' : !registerData?.email ? 'email' : !registerData?.phone ? 'phone' : !registerData?.password ? 'password' : !registerData.location ? "location" : "fullname"} feild is missing`, status: false
    };
  }

  const checkPhone = await prismaQuery.user.findUnique({
    where: { phone: registerData?.phone },
  });
  const checkEmail = await prismaQuery.user.findUnique({
    where: { email: registerData?.email },
  });
  if (checkPhone) {
    return { error: "Sorry this user already exists", status: false };
  }
  if (checkEmail) {
    return { error: "Email Address already exists", status: false };
  }
  const uniqueUserId = Math.random().toString(36).substring(2, 15);
  const hashPass = await hashPassword(registerData?.password);
  const walletId = uuid().split("-").join(""); // Generate unique wallet ID
  const pointsId = uuid().split("-").join(""); // Generate unique points ID

  try {

    const user = await prismaQuery.user.create({
      data: {
        fullname: registerData?.name,
        user_id: uniqueUserId,
        username: `@${registerData?.username}`,
        name: registerData?.name,
        email: registerData?.email,
        phone: registerData?.phone,
        location: registerData?.location,
        password: hashPass,
        UserWallet: { // Create a wallet associated with the user
          create: {
            wallet_id: walletId,
            balance: 0,
          }
        },
        UserPoints: { // Create points associated with the user
          create: {
            points: 0,
            conversion_rate: 0,
          }
        },
        Settings: {
          create: {
            price_per_message: 0,
            enable_free_message: true,
            subscription_price: 0,
            subscription_duration: "1 month",
            subscription_type: "free",
          }
        }
      },
      include: {
        UserWallet: true, // Include the wallet in the returned user object
        UserPoints: true // Include the user points in the returned user object
      }
    });

    const sendMail = sendWelcomeEmail(user.email, user.username);
    return user;

  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
