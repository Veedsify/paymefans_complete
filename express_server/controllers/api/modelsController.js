const allModels = require("../../services/allmodels.service");
const newPayment = require("../../utils/createRandomPayments");

class modelController {
    static async GetModels(req, res) {
        const {limit} = req.body;
        const getmodels = await allModels(limit, req.user);
        if (!getmodels) {
            return res
                .status(200)
                .json({message: "No models found", status: false});
        }
        return res
            .status(200)
            .json({message: "Models found", status: true, models: getmodels});
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

            const {id} = req.user;

            console.log(req.body)

            let signUpUserAsModel = await prismaQuery.models.create({
                data: {
                    user_id: id,
                    firstname,
                    lastname,
                    dob: new Date(dob),
                    gender: gender,
                    country,
                    hookup: available !== "yes" ? false : true,
                    audience,
                    verification_status: false
                }
            });

            if (!signUpUserAsModel) {
                return res
                    .status(200)
                    .json({message: "An error occurred while signing you up", status: false});
            }

            // New Initial Payments
            const modelSignupPayment = await newPayment(process.env.SIGNUP_PRICE, req.user.email, req.user.id, "http://google.com");

            if (!modelSignupPayment) {
                return res
                    .status(200)
                    .json({message: "An error occurred while signing you up", status: false});
            }

            console.log("PaymentLink:", modelSignupPayment);

            return res
                .status(200)
                .json({message: "You have been signed up as a model", status: true, url: modelSignupPayment});

        } catch (e) {
            console.log(e)
            return res
                .status(500)
                .json({message: "An error occurred while signing you up", status: false});
        }
    }

}

module.exports = modelController;
