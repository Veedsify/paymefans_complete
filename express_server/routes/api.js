var express = require("express");
var router = express.Router();
let authController = require("../controllers/api/authController");
let checkUserIsAuthenticated = require("../middlewares/checkUserIsAuthenticated.middleware");
const profileController = require("../controllers/api/profileController");
const modelController = require("../controllers/api/modelsController");
const multerImageMiddleware = require("../middlewares/multerImageMiddleware.middleware");
const pointsController = require("../controllers/api/pointsController");
const followerController = require("../controllers/api/followerController");

// AUTH
router.post("/auth/signup", authController.Register);
router.post("/auth/signup/username", authController.Username);
router.post("/auth/login", authController.Login);
router.post("/auth/points", checkUserIsAuthenticated, authController.Points);
router.post("/auth/wallet", checkUserIsAuthenticated, authController.Wallet);
router.get("/retrieve", checkUserIsAuthenticated, authController.Retrieve);

// PROFILE
router.post("/profile/user", profileController.Profile);
router.post(
  "/profile/banner/change",
  checkUserIsAuthenticated,
  multerImageMiddleware("banner"),
  profileController.BannerChange
);

router.post(
  "/profile/image/change",
  checkUserIsAuthenticated,
  multerImageMiddleware("profile_image"),
  profileController.ProfileChange
);

router.post(
  "/profile/settings/update",
  checkUserIsAuthenticated,
  profileController.SettingsProfileChange
);

// MODELS
router.post("/models/all", modelController.GetModels);
router.post("/models/signup", checkUserIsAuthenticated, modelController.SignupModel);

//Points
router.post(
  "/points/buy",
  checkUserIsAuthenticated,
  pointsController.BuyPoints
);
router.post("/points/callback", pointsController.Callback);

//GetGlogalPoints
router.get("/global/points", pointsController.GetGlobalPoints);

//CheckFollower
router.post(
  "/follow/check",
  checkUserIsAuthenticated,
  followerController.CheckFollower
);

module.exports = router;
