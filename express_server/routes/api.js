const express = require("express");
const router = express.Router();
const authController = require("../controllers/api/authController");
const checkUserIsAuthenticated = require("../middlewares/checkUserIsAuthenticated.middleware");
const profileController = require("../controllers/api/profileController");
const modelController = require("../controllers/api/modelsController");
const multerImageMiddleware = require("../middlewares/multerImageMiddleware.middleware");
const pointsController = require("../controllers/api/pointsController");
const followerController = require("../controllers/api/followerController");
const ConversationsController = require("../controllers/api/conversationsController");
const { changePassword } = require("../controllers/api/settingsController");
const uploadAttachmentMulterMiddleware = require("../middlewares/uploadAttachmentMulter.middleware");
const uploadMediaController = require("../controllers/api/mediaUploadController");
const { GetTransactions } = require("../controllers/api/transactionsController");

// Authentication
router.post("/auth/signup", authController.Register);
router.post("/auth/signup/username", authController.Username);
router.post("/auth/login", authController.Login);
router.post("/auth/points", checkUserIsAuthenticated, authController.Points);
router.post("/auth/wallet", checkUserIsAuthenticated, authController.Wallet);
router.get("/retrieve", checkUserIsAuthenticated, authController.Retrieve);

// Profile
router.post("/profile/user", profileController.Profile);
router.post("/profile/banner/change", checkUserIsAuthenticated, multerImageMiddleware("banner"), profileController.BannerChange);
router.post("/profile/image/change", checkUserIsAuthenticated, multerImageMiddleware("profile_image"), profileController.ProfileChange);
// router.post("/profile/settings/update/password", checkUserIsAuthenticated, profileController.SettingsPasswordChange);


// Settngs and Configs
router.post("/profile/settings/update", checkUserIsAuthenticated, profileController.SettingsProfileChange);
router.post("/profile/settings/update/hookup-status", checkUserIsAuthenticated, profileController.HookupStatusChange);
router.patch("/settings/update/password", checkUserIsAuthenticated, changePassword)

// Models
router.post("/models/all", checkUserIsAuthenticated, modelController.GetModels);
router.post("/models/hookups", checkUserIsAuthenticated, modelController.GetModelAvailableForHookup);
router.post("/models/signup", checkUserIsAuthenticated, modelController.SignupModel);
router.get("/callback/model/signup", modelController.ValidateModelPayment);

// Points
router.post("/points/buy", checkUserIsAuthenticated, pointsController.BuyPoints);
router.get("/points/callback", pointsController.Callback);
router.post("/user/get-points", checkUserIsAuthenticated, pointsController.GetUserPoints);
router.get("/global/points", pointsController.GetGlobalPoints);

// Wallet & Transactions
router.get("/wallet/transactions", checkUserIsAuthenticated, GetTransactions);

// Followers
router.post("/follow/check", checkUserIsAuthenticated, followerController.CheckFollower);
router.post("/get/followers", checkUserIsAuthenticated, followerController.GetFollowers);

// Conversations
router.get("/conversation/get-messages/:conversation", checkUserIsAuthenticated, ConversationsController.allConversations);
router.post("/conversation/create-new", checkUserIsAuthenticated, ConversationsController.createConversation);
router.get("/conversations/my-conversations", checkUserIsAuthenticated, ConversationsController.myConversations);
router.post("/upload/attachments", checkUserIsAuthenticated, uploadAttachmentMulterMiddleware.array("attachments[]"), uploadMediaController.attachments);


module.exports = router;
