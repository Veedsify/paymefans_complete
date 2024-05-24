const passwordHasher = require("../../utils/passwordHasher");
const prismaQuery = require("../../utils/prisma");
const bcrypt = require("bcrypt");
const { passwordStrength } = require('check-password-strength')


class SettingsController {
    static async changePassword(req, res) {
        try {
            const user = req.user
            const { oldPassword, newPassword } = req.body;

            const userPassword = await prismaQuery.user.findFirst({
                where: {
                    user_id: user.user_id
                },
                select: {
                    password: true
                }
            })

            const passwordStrengthResult = passwordStrength(newPassword).value

            const match = await bcrypt.compare(oldPassword, userPassword.password);
            if (!match) {
                return res.status(200).json({ message: "Old password is incorrect", status: false });
            }

            if (passwordStrengthResult === "Weak") {
                return res.status(200).json({ message: "Password is weak, please use a stronger password", status: false });
            }

            const hashPass = await passwordHasher(newPassword);
            await prismaQuery.user.update({
                where: {
                    user_id: user.user_id
                },
                data: {
                    password: hashPass
                }
            })
            res.status(200).json({ message: "Password changed successfully", status: true });
        } catch (error) {
            res.status(500).json({ message: "An error occurred", status: false });
        }
    }
}

module.exports = SettingsController