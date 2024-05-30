const sharp = require("sharp");
const { v4: uuid } = require("uuid")
const prismaQuery = require("../../utils/prisma");
const path = require("path")

class PostController {
    static async extractPosterImage(videoPath, outputPath) {
        return new Promise((resolve, reject) => {
            ffmpeg(videoPath)
                .screenshots({
                    count: 1,
                    timestamps: ['00:00:02'], // You can specify the time in the video to capture the poster from
                    folder: __dirname,
                    filename: outputPath
                })
                .on('end', () => {
                    resolve(outputPath);
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    }

    static async CreatePost(req, res) {
        try {
            const validVideoMimetypes = ["video/mp4", "video/quicktime", "video/3gpp", "video/x-msvideo", "video/x-ms-wmv", "video/x-flv", "video/webm", "video/x-matroska", "video/avi", "video/mpeg", "video/ogg", "video/x-ms-asf", "video/x-m4v"];

            const files = req.files;
            const user = req.user;
            const { content, visibility } = req.body;
            const media = files.map((file) => {
                if (validVideoMimetypes.includes(file.mimetype)) {
                    // CreatePosterImage here
                    return {
                        type: "video",
                        poster: file.path.replace("public", ""),
                        url: file.path.replace("public", "")
                    };
                }
                const ext = path.extname(file.originalname);
                const filename = Date.now() + 'post-media' + ext;
                sharp(file.path)
                    .resize(700)
                    .webp({ quality: 80 })
                    .toFile(`./public/posts/converted/${filename}`, (err, info) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log(info);
                    });
                return {
                    type: "image",
                    url: `/posts/converted/${filename}`
                };
            })
            const postId = uuid()

            const post = await prismaQuery.post.create({
                data: {
                    post_id: postId,
                    was_repost: false,
                    content: content,
                    post_audience: visibility,
                    post_status: "published",
                    post_is_visible: true,
                    user_id: user.id,
                    media: media ? media : null
                }
            })

            return res.status(200).json({
                status: true,
                message: "Post created successfully",
                data: post
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                message: "An error occurred while creating post",
                error: error
            })
            console.log(error);
        }
    }
}

module.exports = PostController;