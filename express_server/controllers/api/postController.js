const sharp = require("sharp");
const { v4: uuid } = require("uuid")
const prismaQuery = require("../../utils/prisma");
const path = require("path");
const { processPostMedia } = require("../../utils/cloudflare");
const HandleMedia = require("../../utils/handle-post-media");
const { SERVER_ORIGINAL_URL, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_CUSTOMER_CODE } = process.env;
require("dotenv").config();

class PostController {
    // Create a new post with media attached 
    static async CreatePost(req, res) {
        try {
            const validVideoMimetypes = ["video/mp4", "video/quicktime", "video/3gpp", "video/x-msvideo", "video/x-ms-wmv", "video/x-flv", "video/webm", "video/x-matroska", "video/avi", "video/mpeg", "video/ogg", "video/x-ms-asf", "video/x-m4v"];

            const postId = uuid()
            const files = req.files;
            const user = req.user;
            const { content, visibility } = req.body;
            let media = null;

            try {
                media = await processPostMedia(files, req, validVideoMimetypes, SERVER_ORIGINAL_URL, process.env.CLOUDFLARE_API_KEY);
            } catch (error) {
                console.error(`Error in processPostMedia: ${error.message}`);
            }

            if (!media) {
                try {
                    media = await HandleMedia(files, req, validVideoMimetypes, SERVER_ORIGINAL_URL, process.env.CLOUDFLARE_API_KEY);
                } catch (error) {
                    console.error(`Error in HandleMedia: ${error.message}`);
                }
            }

            if (!media) {
                console.error('Failed to process media using both methods.');
            }

            // Continue with the rest of your logic
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
                                ...media.images.map((image) => {
                                    if (image.response.result.id) {
                                        return {
                                            media_id: image.response.result.id,
                                            media_type: "image",
                                            url: (image.response.result.variants[0].includes("/public")) ? image.response.result.variants[0] : image.response.result.variants[1],
                                            blur: (image.response.result.variants[0].includes("/blur")) ? image.response.result.variants[0] : image.response.result.variants[1],
                                            poster: (image.response.result.variants[0].includes("/public")) ? image.response.result.variants[0] : image.response.result.variants[1],
                                            accessible_to: visibility,
                                            locked: visibility === "subscribers" ? true : false,
                                        }
                                    } else {
                                        return {
                                            media_id: image.response.result.image_id,
                                            media_type: "image",
                                            url: image.response.result.variants[0],
                                            blur: image.response.result.variants[1],
                                            poster: image.response.result.variants[0],
                                            accessible_to: visibility,
                                            locked: visibility === "subscribers" ? true : false,
                                        }
                                    }
                                }),
                                ...media.videos.map((video) => {
                                    if (video.id) {
                                        const url = `https://${CLOUDFLARE_CUSTOMER_CODE}/${video.id}/manifest/video.m3u8`
                                        const poster = `https://${CLOUDFLARE_CUSTOMER_CODE}/${video.id}/thumbnails/thumbnail.jpg`
                                        return {
                                            media_id: video.id,
                                            media_type: "video",
                                            url: url,
                                            blur: "",
                                            poster: poster,
                                            accessible_to: visibility,
                                            locked: visibility === "subscribers" ? true : false,
                                        }
                                    } else {
                                        return {
                                            media_id: video.video_id,
                                            media_type: "video",
                                            url: video.video_url,
                                            blur: "",
                                            poster: video.poster,
                                            accessible_to: visibility,
                                            locked: visibility === "subscribers" ? true : false,
                                        }
                                    }
                                })
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

    // Get all media attached to a post for the current user
    static async GetMyMedia(req, res) {
        try {
            const user = req.user;
            const { page, limit } = req.query
            // Parse limit to an integer or default to 5 if not provided
            const parsedLimit = limit ? parseInt(limit, 10) : 6;
            const validLimit = Number.isNaN(parsedLimit) || parsedLimit <= 0 ? 5 : parsedLimit;

            // Parse page to an integer or default to 1 if not provided
            const parsedPage = page ? parseInt(page, 10) : 1;
            const validPage = Number.isNaN(parsedPage) || parsedPage <= 0 ? 1 : parsedPage;

            const postCount = await prismaQuery.post.findMany({
                where: {
                    user_id: user.id
                },
            });

            const mediaCount = await prismaQuery.userMedia.count({
                where: {
                    OR: [
                        ...postCount.map((post) => ({ post_id: post.id }))
                    ]
                },
            });

            const media = await prismaQuery.userMedia.findMany({
                where: {
                    OR: [
                        ...postCount.map((post) => ({ post_id: post.id }))
                    ]
                },
                skip: (validPage - 1) * validLimit,
                take: validLimit,
                orderBy: {
                    created_at: "desc"
                },
            });

            return res.status(200).json({
                status: true,
                message: "Media retrieved successfully",
                data: media,
                total: mediaCount
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "An error occurred while retrieving media",
                error: error
            })

            console.log(error);
        }
    }

    // Get all media attached to a post for the current user profile page
    static async GetUsersMedia(req, res) {
        try {
            const userid = parseInt(req.params.userid)
            const { page, limit } = req.query
            // Parse limit to an integer or default to 5 if not provided
            // Parse limit to an integer or default to 5 if not provided
            const parsedLimit = limit ? parseInt(limit, 10) : 6;
            const validLimit = Number.isNaN(parsedLimit) || parsedLimit <= 0 ? 5 : parsedLimit;

            // Parse page to an integer or default to 1 if not provided
            const parsedPage = page ? parseInt(page, 10) : 1;
            const validPage = Number.isNaN(parsedPage) || parsedPage <= 0 ? 1 : parsedPage;

            const postCount = await prismaQuery.post.findMany({
                where: {
                    user_id: userid
                },
            });

            const mediaCount = await prismaQuery.userMedia.count({
                where: {
                    OR: [
                        ...postCount.map((post) => ({ post_id: post.id }))
                    ]
                },
            });

            const media = await prismaQuery.userMedia.findMany({
                where: {
                    OR: [
                        ...postCount.map((post) => ({ post_id: post.id }))
                    ]
                },
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
                    post: {
                        select: {
                            user: {
                                select: {
                                    Subscribers: true
                                }
                            }
                        }
                    }
                },
                skip: (validPage - 1) * validLimit,
                take: validLimit,
                orderBy: {
                    created_at: "desc"
                },
            });

            return res.status(200).json({
                status: true,
                message: "Media retrieved successfully",
                data: media,
                total: mediaCount
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "An error occurred while retrieving media",
                error: error
            })

            console.log(error);
        }
    }

    // Get all posts for the current user
    static async GetMyPosts(req, res) {
        try {
            const user = req.user;
            const { page, limit } = req.query

            // Parse limit to an integer or default to 5 if not provided
            const parsedLimit = limit ? parseInt(limit, 10) : 5;
            const validLimit = Number.isNaN(parsedLimit) || parsedLimit <= 0 ? 5 : parsedLimit;

            // Parse page to an integer or default to 1 if not provided
            const parsedPage = page ? parseInt(page, 10) : 1;
            const validPage = Number.isNaN(parsedPage) || parsedPage <= 0 ? 1 : parsedPage;


            const postCount = await prismaQuery.post.count({
                where: {
                    user_id: user.id
                }
            });

            const posts = await prismaQuery.post.findMany({
                where: {
                    user_id: user.id
                },
                select: {
                    id: true,
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
                    PostLike: {
                        select: {
                            post_id: true,
                            user_id: true
                        }
                    },
                    user: {
                        select: {
                            username: true,
                            profile_image: true,
                            name: true,
                            user_id: true,
                            Subscribers: {
                                select: {
                                    subscriber_id: true
                                }
                            }
                        }
                    }
                },
                skip: (validPage - 1) * validLimit,
                take: validLimit,
                orderBy: {
                    created_at: "desc"
                },
            });

            return res.status(200).json({
                status: true,
                message: "Posts retrieved successfully",
                data: posts,
                total: postCount
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

    // Get all posts for a user by their ID
    static async GetUserPostByID(req, res) {
        try {
            const userid = parseInt(req.params.userid)
            const { page, limit } = req.query
            // Parse limit to an integer or default to 5 if not provided
            const parsedLimit = limit ? parseInt(limit, 10) : 5;
            const validLimit = Number.isNaN(parsedLimit) || parsedLimit <= 0 ? 5 : parsedLimit;

            // Parse page to an integer or default to 1 if not provided
            const parsedPage = page ? parseInt(page, 10) : 1;
            const validPage = Number.isNaN(parsedPage) || parsedPage <= 0 ? 1 : parsedPage;


            const postCount = await prismaQuery.post.count({
                where: {
                    user_id: userid,
                    post_status: "published",
                    NOT: {
                        post_audience: "private"
                    }
                },
            })

            const posts = await prismaQuery.post.findMany({
                where: {
                    user_id: userid,
                    post_status: "published",
                    NOT: {
                        post_audience: "private"
                    }
                },
                select: {
                    id: true,
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
                    PostLike: {
                        select: {
                            post_id: true,
                            user_id: true
                        }
                    },
                    user: {
                        select: {
                            username: true,
                            profile_image: true,
                            name: true,
                            user_id: true,
                            Subscribers: {
                                select: {
                                    subscriber_id: true
                                }
                            }
                        }
                    }
                },
                skip: (validPage - 1) * validLimit,
                take: validLimit,
                orderBy: {
                    created_at: "desc"
                },
            });

            return res.status(200).json({
                status: true,
                message: "Posts retrieved successfully",
                data: posts,
                total: postCount
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

    // Get a single post by its ID
    static async GetCurrentUserPost(req, res) {
        try {
            const { post_id } = req.params;
            const post = await prismaQuery.post.findFirst({
                where: {
                    post_id: post_id,
                    post_status: "published",
                    OR: [
                        {
                            post_audience: "public"
                        },
                        {
                            post_audience: "subscribers"
                        }
                    ]
                }, select: {
                    user: {
                        select: {
                            username: true,
                            profile_image: true,
                            created_at: true,
                            name: true,
                            Subscribers: {
                                select: {
                                    subscriber_id: true
                                }
                            },
                            Follow: {
                                select: {
                                    follower_id: true
                                }
                            }
                        }
                    },
                    id: true,
                    content: true,
                    post_id: true,
                    post_audience: true,
                    created_at: true,
                    post_likes: true,
                    post_comments: true,
                    post_reposts: true,
                    PostLike: true,
                    UserMedia: true,
                    PostComment: {
                        orderBy: {
                            created_at: "desc"
                        },
                        select: {
                            id: true,
                            comment: true,
                            created_at: true,
                            comment_id: true,
                            user: {
                                select: {
                                    id: true,
                                    user_id: true,
                                    username: true,
                                    profile_image: true,
                                    name: true
                                }
                            },
                            PostCommentAttachments: true
                        }
                    }
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