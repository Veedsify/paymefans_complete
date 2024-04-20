const allModels = require("../../services/allmodels.service");
const newPayment = require("../../utils/createRandomPayments");
const prismaQuery = require("../../utils/prisma");

class modelController {
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
                    verification_status: false
                }
            });

            if (!signUpUserAsModel) {
                return res
                    .status(200)
                    .json({ message: "An error occurred while signing you up", status: false });
            }

            // New Initial Payments
            const modelSignupPayment = await newPayment(process.env.SIGNUP_PRICE, req.user.email,
                process.env.SERVER_ORIGINAL_URL + "/api/callback/model/signup"
            );


            if (!modelSignupPayment) {
                return res
                    .status(200)
                    .json({ message: "An error occurred while setting up payments", status: false });
            }

             req.session.lastPaymentReference = modelSignupPayment.data.reference;

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

    static async ValidateModelPayment(req, res) {
        const { reference, trxref } = req.query;
        console.log(req.session.lastPaymentReference);
        res.status(200).json({ message: "Payment validated", status: true });
    }

}

module.exports = modelController;
