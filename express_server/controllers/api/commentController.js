const { uploadToCloudflareImage } = require("../../utils/cloudflare")
const prismaQuery = require("../../utils/prisma")
const { v4: uuid } = require("uuid")
require('dotenv').config()

class CommentController {
    static async NewPostComment(req, res) {
        try {
            const { id } = req.user
            const { post_id: postStringId, postId, reply_to, comment, attachments } = req.body
            const { files } = req.files
            const comment_id = uuid();
            let fileUrls = []

            const createComment = await prismaQuery.postComment.create({
                data: {
                    comment: comment,
                    comment_id: comment_id,
                    post_id: parseInt(postId),
                    user_id: parseInt(id),
                }
            })

            await prismaQuery.post.update({
                where: {
                    id: parseInt(postId)
                },
                data: {
                    post_comments: {
                        increment: 1
                    }
                }
            })

            async function uploadFiles() {
                if (files) {
                    files.map((file) => {
                        const res = async () => {
                            const upload = await uploadToCloudflareImage(file.path, process.env.CLOUDFLARE_API_KEY)
                            return upload
                        }
                        res().then(async (upload) => {
                            console.log(upload.response)
                            await prismaQuery.postCommentAttachments.create({
                                data: {
                                    name: upload.response.result.filename,
                                    path: upload.response.result.variants.find((variant) => variant.includes('/public')),
                                    type: file.mimetype.replace('image/', ''),
                                    comment_id: createComment.id
                                }
                            })
                        })
                    })
                    return true
                }
                return true
            }

            await uploadFiles()

            prismaQuery.$disconnect()
            res.json({
                status: true,
                message: 'Comment created successfully',
                data: createComment
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: false,
                message: 'An error occured while creating comment'
            })
        }
    }

    // Comments Attachments
    static async CommentsAttachMents(req, res) {
        try {
            const file = req.file
            const { id } = req.user

            const upload = await uploadToCloudflareImage(file.path, process.env.CLOUDFLARE_API_KEY)

            if (!upload) {
                return res.status(500).json({
                    status: false,
                    message: 'An error occured while uploading attachment'
                })
            }

            const attachment = await prismaQuery.postCommentAttachments.create({
                data: {
                    name: file.filename,
                    path: upload.response.result.variants.find((variant) => variant.includes('/public')),
                    type: file.mimetype.replace('image/', '')
                }
            })

            prismaQuery.$disconnect()

            res.json({
                status: true,
                message: 'Attachment uploaded successfully',
                data: attachment
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status: false,
                message: 'An error occured while uploading attachment'
            })
        }
    }
}


module.exports = CommentController