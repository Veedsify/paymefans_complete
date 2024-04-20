const registerService = require("../../services/register.service");
const loginService = require("../../services/login.service");
const prismaQuery = require("../../utils/prisma");
const jwt = require("jsonwebtoken");

/**
 * Controller class for handling authentication-related API endpoints.
 */
class authController {
    /**
     * Register a new user account.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Object} The response containing the status and message.
     */
    static async Register(req, res) {
        const createAccount = await registerService(req.body);

        if (createAccount.error) {
            return res
                .status(200)
                .json({message: createAccount.error, status: false});
        }

        return res
            .status(200)
            .json({message: "Account created successfully", status: true});
    }

    /**
     * Check if a username is already taken.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Object} The response containing the status and message.
     */
    static async Username(req, res) {
        const {username} = req.body;
        const user = await prismaQuery.user.findUnique({
            where: {
                username,
            },
        });

        if (user) {
            return res
                .status(200)
                .json({message: "Username already exists", status: false});
        }

        return res
            .status(200)
            .json({message: "Username is available", status: true});
    }

    /**
     * Login a user.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Object} The response containing the status, message, and token.
     */
    static async Login(req, res) {
        const signinUser = await loginService(req.body);

        if (signinUser.error) {
            return res.status(200).json({message: signinUser.error, status: false});
        }

        req.session.user = signinUser.user;
        return res.status(200).json({
            message: "Login successful",
            token: signinUser.token,
            status: true,
        });
    }

    /**
     * Retrieve user information.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Object} The response containing the user information.
     */
    static async Retrieve(req, res) {
        const user = await prismaQuery.user.findUnique({
            where: {
                id: req.user.id,
            },
            include: {
                UserPoints: true,
                UserWallet: true,
            }
        });
        if (user) {
            const {password, ...rest} = user;
            return res.status(200).json({user: rest, status: true});
        }
        return res.status(401).json({message: "No user found", status: false});
    }

    /**
     * Get user points.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Object} The response containing the user points.
     */
    static async Points(req, res) {
        const {points} = await prismaQuery.userPoints.findFirst({
            where: {
                user_id: req.user.id,
            },
            select: {
                points: true,
            },
        });
        return res.status(200).json({points: points, status: true});
    }

    /**
     * Get user wallet balance.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Object} The response containing the user wallet balance.
     */
    static async Wallet(req, res) {
        const {balance} = await prismaQuery.userWallet.findFirst({
            where: {
                user_id: req.user.id,
            },
            select: {
                balance: true,
            },
        });
        if (balance) {
            return res.status(200).json({wallet: balance, status: true});
        }
        return res.status(200).json({message: "No Data found", status: false});
    }
}

module.exports = authController;
