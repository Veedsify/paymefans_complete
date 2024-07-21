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

    static async ModelsSearch(req, res) {
        const { page, limit, q } = req.query
        // Parse limit to an integer or default to 5 if not provided
        const parsedLimit = limit ? parseInt(limit, 10) : 6;
        const validLimit = Number.isNaN(parsedLimit) || parsedLimit <= 0 ? 5 : parsedLimit;

        // Parse page to an integer or default to 1 if not provided
        const parsedPage = page ? parseInt(page, 10) : 1;
        const validPage = Number.isNaN(parsedPage) || parsedPage <= 0 ? 1 : parsedPage;
        try {

            const getmodels = await prismaQuery.user.findMany({
                where: {
                    is_model: true,
                    // Model: {
                    //     verification_status: true,
                    // }
                    // OR: [
                    //     {
                    //         firstname: {
                    //             contains: q,
                    //         }
                    //     },
                    //     {
                    //         lastname: {
                    //             contains: q,
                    //         }
                    //     },
                    //     {
                    //         user: {
                    //             fullname: {
                    //                 contains: q,
                    //             },
                    //         }
                    //     },
                    //     {
                    //         user: {
                    //             username: {
                    //                 contains: q,
                    //             },
                    //         }
                    //     }
                    // ]
                },
                select: {
                    profile_image: true,
                    username: true,
                    id: true,
                    fullname: true,
                    Subscribers: {
                        select: {
                            id: true,
                            subscriber_id: true
                        }
                    }
                },
                skip: (validPage - 1) * validLimit,
                take: validLimit,
            })

            return res
                .status(200)
                .json({ message: "Models found", status: true, models: getmodels });
        } catch (error) {
            console.log(error)
            return res
                .status(500)
                .json({ message: "An error occurred while fetching models", status: false });
        }
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

            let dateOfBirth = new Date(dob);
            let currentDate = new Date();

            if (dateOfBirth >= currentDate) {
                return res
                    .status(200)
                    .json({ message: "Invalid date of birth", status: false });
            }

            if ((currentDate.getFullYear() - dateOfBirth.getFullYear()) < 18) {
                return res.status(200).json({ message: "You must be 18 years and above", status: false });
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

            await prismaQuery.user.update({
                where: {
                    id
                },
                data: {
                    is_model: true,
                }
            })

            if (!signUpUserAsModel) {
                return res
                    .status(200)
                    .json({ message: "An error occurred while signing you up", status: false });
            }

            // // New Initial Payments
            // const modelSignupPayment = await newPayment(process.env.SIGNUP_PRICE, req.user.email,
            //     process.env.SERVER_ORIGINAL_URL + "/api/callback/model/signup", referenceId
            // );


            // if (!modelSignupPayment) {
            //     return res
            //         .status(200)
            //         .json({ message: "An error occurred while setting up payments", status: false });
            // }

            // req.session.lastPaymentReference = modelSignupPayment.data.reference;

            prismaQuery.$disconnect();

            return res
                .status(200)
                .json({ message: "You have been signed up as a model", status: true });

        } catch (e) {
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
