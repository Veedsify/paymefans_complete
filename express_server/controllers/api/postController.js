const sharp = require("sharp");
const { v4: uuid } = require("uuid")
const prismaQuery = require("../../utils/prisma");
const path = require("path")
const { SERVER_ORIGINAL_URL } = process.env;

class PostController {
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
                        poster: SERVER_ORIGINAL_URL + file.path.replace("public", ""),
                        url: SERVER_ORIGINAL_URL + file.path.replace("public", "")
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
                    url: `${SERVER_ORIGINAL_URL}/posts/converted/${filename}`
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

    static async GetMyPosts(req, res) {
        try {
            const user = req.user;
            const { page, limit } = req.query
            // Parse limit to an integer or default to 5 if not provided
            const parsedLimit = limit ? parseInt(limit) : 5;

            // Parse page to an integer or default to 0 if not provided
            const parsedPage = parseInt(page) == 1 ? 0 : parseInt(page) * parsedLimit - parsedLimit;

            const posts = await prismaQuery.post.findMany({
                where: {
                    user_id: user.id
                },
                orderBy: {
                    created_at: "desc"
                },
                select: {
                    content: true,
                    post_id: true,
                    post_audience: true,
                    media: true,
                    created_at: true,
                    post_likes: true,
                    post_comments: true,
                    post_reposts: true,
                },
                take: parsedLimit,
                skip: parsedPage  // Adjusted logic for skipping records
            });

            console.log(posts);

            return res.status(200).json({
                status: true,
                message: "Posts retrieved successfully",
                data: posts
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "An error occurred while retrieving posts",
                error: error
            })
            console.log(error);
        }
    }

    static async GetCurrentUserPost(req, res) {
        try {
            const user = req.user;
            const { post_id } = req.params;

            const post = await prismaQuery.post.findFirst({
                where: {
                    post_id: post_id,
                    user_id: user.id
                }, select: {
                    user: {
                        select: {
                            username: true,
                            profile_image: true,
                            created_at: true,
                            name: true,
                            Follow: {
                                select: {
                                    follower_id: true
                                }
                            }
                        }
                    },
                    content: true,
                    post_id: true,
                    post_audience: true,
                    media: true,
                    created_at: true,
                    post_likes: true,
                    post_comments: true,
                    post_reposts: true,
                }
            });

            if (!post) {
                return res.status(404).json({
                    status: false,
                    message: "Post not found"
                })
            }

            return res.status(200).json({
                status: true,
                message: "Post retrieved successfully",
                data: post
            })

        } catch (error) {
            res.status(500).json({
                status: false,
                message: "An error occurred while retrieving post",
                error: error
            })
            console.log(error);
        }
    }

}

module.exports = PostController;