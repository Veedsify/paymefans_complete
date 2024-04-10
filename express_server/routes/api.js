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

// Check if username is available
router.post("/auth/signup/username", authController.Username);

// Login
router.post("/auth/login", authController.Login);

// Get user points
router.post("/auth/points", checkUserIsAuthenticated, authController.Points);

// Get user wallet balance
router.post("/auth/wallet", checkUserIsAuthenticated, authController.Wallet);

// Retrieve User Data
router.get("/retrieve", checkUserIsAuthenticated, authController.Retrieve);

// get a random user profile by username
router.post("/profile/user", profileController.Profile);

// Change Profile Banner
router.post(
  "/profile/banner/change",
  checkUserIsAuthenticated,
  multerImageMiddleware("banner"),
  profileController.BannerChange
);

// Change Profile Image
router.post(
  "/profile/image/change",
  checkUserIsAuthenticated,
  multerImageMiddleware("profile_image"),
  profileController.ProfileChange
);


// Update Profile without image
router.post(
  "/profile/settings/update",
  checkUserIsAuthenticated,
  profileController.SettingsProfileChange
);

// View all models
router.post("/models/all", checkUserIsAuthenticated, modelController.GetModels);

// Model Signup Endpoint
router.post("/models/signup", checkUserIsAuthenticated, modelController.SignupModel);


//Buy Points Returns the paystack checkout url
router.post(
  "/points/buy",
  checkUserIsAuthenticated,
  pointsController.BuyPoints
);
router.get("/points/callback", pointsController.Callback);

//GetGlogalPoints
router.get("/global/points", pointsController.GetGlobalPoints);

//CheckFollower
router.post(
  "/follow/check",
  checkUserIsAuthenticated,
  followerController.CheckFollower
);

module.exports = router;
