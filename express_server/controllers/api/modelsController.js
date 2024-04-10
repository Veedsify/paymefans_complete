const allModels = require("../../services/allmodels.service");
class modelController {
  static async GetModels(req, res) {
    const { limit } = req.body;
    console.log("User", req.user)
    const getmodels = await allModels(limit, req.user);
    if (!getmodels) {
      return res
        .status(200)
        .json({ message: "No models found", status: false });
    }
    return res
      .status(200)
      .json({ message: "Models found", status: true, models: getmodels });
  }

  static async SignupModel(req, res) {
    const {
      firstname,
      lastname,
      dob,
      country,
      available,
      audience,
    } = req.body
    console.log(available)
  }
}

module.exports = modelController;
