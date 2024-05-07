const prismaQuery = require("../utils/prisma");
const hashPassword = require("../utils/passwordHasher");
const { v4: uuid } = require("uuid");
module.exports = async (body) => {
  const registerData = body;

  const checkPhone = await prismaQuery.user.findUnique({
    where: { phone: registerData?.phone },
  });
  const checkEmail = await prismaQuery.user.findUnique({
    where: { email: registerData?.email },
  });
  if (checkPhone) {
    return { error: "Phone number already exists", status: false };
  }
  if (checkEmail) {
    return { error: "Email Address already exists", status: false };
  }
  const uniqueUserId = Math.random().toString(36).substring(2, 15);
  const hashPass = hashPassword(registerData?.password);
  const walletId = uuid().split("-").join(""); // Generate unique wallet ID
  const pointsId = uuid().split("-").join(""); // Generate unique points ID

  try {
    // Create a new user
    const user = await prismaQuery.user.create({
      data: {
        fullname: registerData?.name,
        user_id: uniqueUserId,
        username: `@${registerData?.username}`,
        name: registerData?.fullname,
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

    return user;

  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
