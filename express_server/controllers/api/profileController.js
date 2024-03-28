const sharp = require("sharp");
const prismaQuery = require("../../utils/prisma");
const updateBannerService = require("../../services/updatebanner.service");
const updateProfileService = require("../../services/updateprofile.service");
const updateProfileInfo = require("../../services/updateProfileInfo.service");
const {log} = require("debug");

const {SERVER_ORIGINAL_URL} = process.env;

class profileController {
    static async Profile(req, res) {
        const {username} = req.body;
        const id = username.replace(/%40/g, "@");
        const user = await prismaQuery.user.findFirst({
            where: {
                username: id,
            },
        });
        if (!user) {
            return res.status(200).json({message: "User not found", status: false});
        }
        const {password, ...rest} = user;
        return res
            .status(200)
            .json({message: "User found", status: true, user: rest});
    }

    static async BannerChange(req, res) {
        try {
            const file = req.file;
            const fileUrl = file.path.replace("public", "");
            if (!file) {
                return res
                    .status(500)
                    .json({message: "No file uploaded", status: false});
            }
            //convert image
            console.log(file.filename);
            const convert = await sharp(file.path)
                .resize(943, 270)
                .webp({quality: 75})
                .toFile(`public/images/converted/${file.filename}`);

            const updateUser = await updateBannerService(convert ? `${SERVER_ORIGINAL_URL}/images/converted/${file.filename}` : `${SERVER_ORIGINAL_URL}/images/uploads/${file.filename}`, req);

            if (!updateUser) {
                return res
                    .status(500)
                    .json({message: "Error updating banner", status: false});
            }

            return res.status(200).json({
                message: "File uploaded", status: true, image: "/images/converted/" + file.filename,
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({message: "Error uploading file", status: false});
        }
    }

    static async ProfileChange(req, res) {
        try {
            const file = req.file;
            if (file) {
                const convert = await sharp(file.path)
                    .resize(200, 200)
                    .webp({quality: 75})
                    .toFile(`public/images/converted/${file.filename}`);

                let updateUserProfile = await updateProfileService(convert ? `${SERVER_ORIGINAL_URL}/images/converted/${file.filename}` : `${SERVER_ORIGINAL_URL}/images/uploads/${file.filename}`, req);
                await updateProfileInfo(res, req);
            } else {
                await updateProfileInfo(res, req);
            }
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({message: "Error updating profile", status: false});
        }
    }

    static async SettingsProfileChange(req, res) {
        try {
            await updateProfileInfo(res, req);
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({message: "Error updating profile", status: false});
        }
    }
}


module.exports = profileController;
