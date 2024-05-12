const allhookupmodelsService = require("../../services/allhookupmodels.service");
const allModels = require("../../services/allmodels.service");
const newPayment = require("../../utils/createRandomPayments");
const prismaQuery = require("../../utils/prisma");
const { v4: uuid } = require("uuid");

class modelController {

    // Get Models
    static async GetModels(req, res) {
        const { limit } = req.body;
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

    // Signup Model
    static async SignupModel(req, res) {
        try {
            const {
                firstname,
                lastname,
                dob,
                country,
                available,
                gender,
                audience,
            } = req.body

            const { id } = req.user;
            console.log(req.body)

            const checkUserIsModel = await prismaQuery.model.findFirst({
                where: {
                    user_id: id
                }
            })

            if (checkUserIsModel) {
                return res
                    .status(200)
                    .json({ message: "You're already a model", status: false });
            }

            const referenceId = "models" + uuid().split("-").join("");

            let signUpUserAsModel = await prismaQuery.model.create({
                data: {
                    user_id: id,
                    firstname,
                    lastname,
                    dob: new Date(dob),
                    gender: gender,
                    country,
                    hookup: available === "yes",
                    audience,
                    verification_status: false,
                    payment_reference: referenceId
                }
            });

            if (!signUpUserAsModel) {
                return res
                    .status(200)
                    .json({ message: "An error occurred while signing you up", status: false });
            }

            // New Initial Payments
            const modelSignupPayment = await newPayment(process.env.SIGNUP_PRICE, req.user.email,
                process.env.SERVER_ORIGINAL_URL + "/api/callback/model/signup", referenceId
            );


            if (!modelSignupPayment) {
                return res
                    .status(200)
                    .json({ message: "An error occurred while setting up payments", status: false });
            }

            req.session.lastPaymentReference = modelSignupPayment.data.reference;

            prismaQuery.$disconnect();

            return res
                .status(200)
                .json({ message: "You have been signed up as a model", status: true, url: modelSignupPayment.data.authorization_url });

        } catch (e) {
            console.log(e)
            return res
                .status(500)
                .json({ message: "An error occurred while signing you up", status: false });
        }
    }

    // Validate Model Payment
    static async ValidateModelPayment(req, res) {
        const { reference, trxref } = req.query;
        const getUserWithRef = await prismaQuery.model.findFirst({
            where: {
                payment_reference: reference
            },
            select: {
                user_id: true
            }
        });
        if (!getUserWithRef.user_id) {
            return res.status(200).json({ message: "Invalid payment", status: false });
        }
        const updateUserAsModel = await prismaQuery.model.update({
            where: {
                user_id: getUserWithRef.user_id
            },
            data: {
                verification_status: true
            }
        });

        if (updateUserAsModel) {
            await prismaQuery.user.update({
                where: {
                    id: getUserWithRef.user_id
                },
                data: {
                    is_model: true
                }
            })

            prismaQuery.$disconnect();
        }
        res.status(200).redirect(process.env.APP_URL)
    }


    // Get Models Available for Hookup
    static async GetModelAvailableForHookup(req, res) {
        const { limit } = req.body;
        const getHookups = await allhookupmodelsService(limit, req.user, true);
        if (getHookups === null || getHookups === undefined) {
            return res
                .status(200)
                .json({ message: "No models found", status: false });
        }
        return res
            .status(200)
            .json({ message: "Models found", status: true, hookups: getHookups });
    }
}

module.exports = modelController;
