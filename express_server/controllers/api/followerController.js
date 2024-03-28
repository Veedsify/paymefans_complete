class followerController {
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
    console.log(userId, followerId);
    res.json({ status: true, message: "Follower found" });
  }
}

module.exports = followerController;
