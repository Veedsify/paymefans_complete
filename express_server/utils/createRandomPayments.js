// Initiate random payments for a user
const {v4: uuid} = require("uuid");

const newPayment = async (amount, email, user_id, callback_url) => {
    try {
        const referenceId = "points" + uuid().split("-").join("");
        const CreateOrder = await fetch(
            "https://api.paystack.co/transaction/initialize",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
                body: JSON.stringify({
                    amount: amount * 100,
                    email: email,
                    reference: referenceId,
                    callback_url: callback_url,
                }),
            }
        );
        const data = await CreateOrder.json();
        return data.url
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = newPayment;