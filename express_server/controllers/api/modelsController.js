const allModels = require("../../services/allmodels.service");
class modelController {
  static async GetModels(req, res) {
    const { limit } = req.body;
    const getmodels = await allModels(limit);
    if (!getmodels) {
      return res
        .status(200)
        .json({ message: "No models found", status: false });
    }
    return res
      .status(200)
      .json({ message: "Models found", status: true, models: getmodels });
  }
}

module.exports = modelController;
