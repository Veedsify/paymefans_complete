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
  try {
    const uniqueUserId = Math.random().toString(36).substring(2, 15);
    const hashPass = hashPassword(registerData?.password);
    const wallet_id = uuid().split("-").join("");
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
      },
    });
    await prismaQuery.userWallet.create({
      data: {
        wallet_id: wallet_id,
        user_id: uniqueUserId,
        balance: 0,
      },
    });
    await prismaQuery.userPoints.create({
      data: {
        user_id: uniqueUserId,
        points: 0,
        conversion_rate: 0,
      },
    });
    prismaQuery.$disconnect();

    if (user) {
      return user;
    }
  } catch (error) {
    return { error: error.message, status: false };
  }
};
