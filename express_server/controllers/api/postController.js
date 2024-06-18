const sharp = require("sharp");
const { v4: uuid } = require("uuid")
const prismaQuery = require("../../utils/prisma");
const path = require("path");
const { processPostMedia } = require("../../utils/cloudflare");
const { SERVER_ORIGINAL_URL, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_CUSTOMER_CODE } = process.env;
require("dotenv").config();

class PostController {
    static async CreatePost(req, res) {
        try {
            const validVideoMimetypes = ["video/mp4", "video/quicktime", "video/3gpp", "video/x-msvideo", "video/x-ms-wmv", "video/x-flv", "video/webm", "video/x-matroska", "video/avi", "video/mpeg", "video/ogg", "video/x-ms-asf", "video/x-m4v"];

            const postId = uuid()
            const files = req.files;
            const user = req.user;
            const { content, visibility } = req.body;
            const media = await processPostMedia(files, req, validVideoMimetypes, SERVER_ORIGINAL_URL, process.env.CLOUDFLARE_API_KEY);

            console.log(JSON.stringify(media, null, 2) + 'in PostController');

            const post = await prismaQuery.post.create({
                data: {
                    post_id: postId,
                    was_repost: false,
                    content: content,
                    post_audience: visibility,
                    post_status: "published",
                    post_is_visible: true,
                    user_id: user.id,
                    media: [],
                    UserMedia: {
                        createMany: {
                            data: [
                                ...media.images.map((image) => ({
                                    media_id: image.response.result.id,
                                    media_type: "image",
                                    url: (image.response.result.variants[0].includes("/public")) ? image.response.result.variants[0] : image.response.result.variants[1],
                                    blur: (image.response.result.variants[0].includes("/blur")) ? image.response.result.variants[0] : image.response.result.variants[1],
                                    poster: (image.response.result.variants[0].includes("/public")) ? image.response.result.variants[0] : image.response.result.variants[1],
                                    accessible_to: visibility,
                                    locked: visibility === "subscribers" ? true : false,
                                })),
                                ...media.videos.map((video) => ({
                                    media_id: video.id,
                                    media_type: "video",
                                    url: `https://${CLOUDFLARE_CUSTOMER_CODE}/${video.id}/manifest/video.m3u8`,
                                    blur: "",
                                    poster: `https://${CLOUDFLARE_CUSTOMER_CODE}/${video.id}/thumbnails/thumbnail.jpg`,
                                    accessible_to: visibility,
                                    locked: visibility === "subscribers" ? true : false,
                                }))
                            ]
                        }
                    }
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
                    UserMedia: {
                        select: {
                            id: true,
                            media_id: true,
                            post_id: true,
                            poster: true,
                            url: true,
                            blur: true,
                            media_type: true,
                            locked: true,
                            accessible_to: true,
                            created_at: true,
                            updated_at: true
                        }
                    },
                },
                // take: parsedLimit,
                // skip: parsedPage  // Adjusted logic for skipping records
            });

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

    static async GetUserPostByID(req, res) {
        try {
            const userid = parseInt(req.params.userid)

            const { page, limit } = req.query
            // Parse limit to an integer or default to 5 if not provided
            const parsedLimit = limit ? parseInt(limit) : 5;

            // Parse page to an integer or default to 0 if not provided
            const parsedPage = parseInt(page) == 1 ? 0 : parseInt(page) * parsedLimit - parsedLimit;

            const posts = await prismaQuery.post.findMany({
                where: {
                    user_id: userid,
                    post_status: "published",
                    NOT: {
                        post_audience: "private"
                    }
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
                    UserMedia: {
                        select: {
                            id: true,
                            media_id: true,
                            post_id: true,
                            poster: true,
                            url: true,
                            blur: true,
                            media_type: true,
                            locked: true,
                            accessible_to: true,
                            created_at: true,
                            updated_at: true
                        }
                    },
                    user: {
                        select: {
                            username: true,
                            profile_image: true,
                            name: true,
                            user_id: true,
                        }
                    }
                },
                // take: parsedLimit,
                // skip: parsedPage  // Adjusted logic for skipping records
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
            const { post_id } = req.params;
            const post = await prismaQuery.post.findFirst({
                where: {
                    post_id: post_id,
                    post_status: "published",
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
                    created_at: true,
                    post_likes: true,
                    post_comments: true,
                    post_reposts: true,
                    UserMedia: {
                        select: {
                            id: true,
                            media_id: true,
                            post_id: true,
                            poster: true,
                            url: true,
                            blur: true,
                            media_type: true,
                            locked: true,
                            accessible_to: true,
                            created_at: true,
                            updated_at: true
                        }
                    },
                },

            });

            if (!post || post.length === 0) {
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