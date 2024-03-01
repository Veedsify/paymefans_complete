const registerService = require("../../services/register.service");
const loginService = require("../../services/login.service");
const prismaQuery = require("../../utils/prisma");
const jwt = require("jsonwebtoken");
class authController {
  // GET /auth
  static async Register(req, res) {
    const createAccount = await registerService(req.body);

    if (createAccount.error) {
      return res
        .status(200)
        .json({ message: createAccount.error, status: false });
    }

    return res
      .status(200)
      .json({ message: "Account created successfully", status: true });
  }

  static async Username(req, res) {
    const { username } = req.body;
    const user = await prismaQuery.user.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      return res
        .status(200)
        .json({ message: "Username already exists", status: false });
    }

    return res
      .status(200)
      .json({ message: "Username is available", status: true });
  }

  static async Login(req, res) {
    const signinUser = await loginService(req.body);

    if (signinUser.error) {
      return res.status(200).json({ message: signinUser.error, status: false });
    }

    req.session.user = signinUser.user;
    return res.status(200).json({
      message: "Login successful",
      token: signinUser.token,
      status: true,
    });
  }

  static async Retrieve(req, res) {
    const user = await prismaQuery.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    if (user) {
      const { password, ...rest } = user;
      return res.status(200).json({ user: rest, status: true });
    }
    return res.status(200).json({ message: "No user found", status: false });
  }

  static async Points(req, res) {
    const { points } = await prismaQuery.userPoints.findFirst({
      where: {
        user_id: req.user.user_id,
      },
      select: {
        points: true,
      },
    });
    if (points) {
      return res.status(200).json({ points: points, status: true });
    }
    return res.status(200).json({ message: "No Data found", status: false });
  }

  static async Wallet(req, res) {
    const { balance } = await prismaQuery.userWallet.findFirst({
      where: {
        user_id: req.user.user_id,
      },
      select: {
        balance: true,
      },
    });
    if (balance) {
      return res.status(200).json({ wallet: balance, status: true });
    }
    return res.status(200).json({ message: "No Data found", status: false });
  }
}
module.exports = authController;
