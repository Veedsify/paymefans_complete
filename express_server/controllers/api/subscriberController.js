const prismaQuery = require("../../utils/prisma");

class subscriberController {
  static async follow(req, res) {
    const { userId, followerId } = req.body;
    const result = await this.followerService.follow(userId, followerId);
    res.json(result);
  }

  static async unfollow(req, res) {
    const { userId, followerId } = req.body;
    const result = await this.followerService.unfollow(userId, followerId);
    res.json(result);
  }

  static async CheckFollower(req, res) {
    const { userId, followerId } = req.body;
    res.json({ status: true, message: "Follower found" });
  }

  static async GetSubscriptionData(req, res) {
    try {
      const user_id = req.params.userid;

      const subscribeerData = await prismaQuery.user.findFirst({
        where: {
          user_id: user_id
        },
        select: {
          id: true,
          username: true,
          name: true,
          user_id: true,
          profile_image: true,
          Model: {
            select: {
              gender: true,
            }
          },
          Settings: {
            select: {
              subscription_price: true,
              subscription_duration: true
            }
          }
        }
      });

      if (!subscribeerData) {
        return res.status(404).json({ status: false, message: "User not found" });
      }

      res.status(200).json({
        status: true,
        data: subscribeerData
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "An error occured" });
    }
  }
}

module.exports = subscriberController;
