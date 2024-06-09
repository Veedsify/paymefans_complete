const prismaQuery = require("../../utils/prisma");

class subscriberController {
  static async chekcSubscriber(req, res) {
    try {
      const data = req.body;
      if (!data) {
        return res.status(400).json({ status: false, message: "Invalid request" });
      }

      const { main_user_id, user_id } = data;

      if (main_user_id === user_id) {
        return res.status(200).json({ status: true, isSubscriber: true });
      }

      const subscriberData = await prismaQuery.user.findFirst({
        where: {
          user_id: main_user_id,
          Subscribers: {
            some: {
              subscriber_id: user_id
            }
          }
        }
      });

      if (!subscriberData) {
        return res.status(200).json({ status: true, isSubscriber: false });
      }

      res.status(200).json({ status: true, isSubscriber: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "An error occured" });
    }

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
