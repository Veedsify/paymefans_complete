const prismaQuery = require("../../utils/prisma");
const buyPointsService = require("../../services/buypoints.service");

class pointsController {
  static async GetGlobalPoints(req, res) {
    const allPoints = await prismaQuery.globalPointsBuy.findMany();
    res.status(200).json({
      message: "Global points retrieved successfully",
      allPoints,
      status: true,
    });
  }

  // BuyPoints
  static async BuyPoints(req, res) {
    const { data } = await buyPointsService(req.body, req);
    if (data && Object.keys(data).length > 0) {
      data.status = true;
      res.status(200).json({ ...data });
    } else {
      res
        .status(400)
        .json({ message: "Sorry you cant buy this package", status: false });
    }
  }

  // Callback
  static async Callback(req, res) {
    const { reference } = req.query;
    // Verify Payment on Paystack
    const getUser = await prismaQuery.userPointsPurchase.findFirst({
      where: { purchase_id: reference },
    });

    const checkIfUpdated = await prismaQuery.userPointsPurchase.findFirst({
      where: { purchase_id: reference },
    });

    if (checkIfUpdated.success) {
      return res.status(200).json({ status: false, message: "These points are already updated" });
    }

    async function verifyPayment(reference) {
      const response = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        }
      )

      if (response.status === 200) {
        return response.json()
      } else {
        return null
      }
    }

    if (getUser && verifyPayment(reference)) {
      await prismaQuery.userPointsPurchase.update({
        where: { purchase_id: reference },
        data: { success: true },
      });

      await prismaQuery.userPoints.update({
        where: { user_id: getUser.user_id },
        data: {
          points: {
            increment: getUser.points,
          },
        },
      });

      res.redirect(process.env.APP_URL + "/wallet/");
    } else {
      res.status(400).json({ status: false });
    }
  }

  static async GetUserPoints(req, res) {
    const { id } = req.user;
    const userPoints = await prismaQuery.userPoints.findFirst({
      where: { user_id: id },
    });

    if (userPoints) {
      res.status(200).json({
        message: "User points retrieved successfully",
        userPoints,
        status: true,
      });
    } else {
      res.status(400).json({
        message: "User points not found",
        status: false,
      });
    }
  }
}
module.exports = pointsController;
