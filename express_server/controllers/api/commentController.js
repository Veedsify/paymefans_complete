const { uploadToCloudflareImage } = require("../../utils/cloudflare")
const prismaQuery = require("../../utils/prisma")
const { v4: uuid } = require("uuid")
require('dotenv').config()

class CommentController {
    static async NewPostComment(req, res) {
        try {
            const { id } = req.user
            const { post_id: postStringId, id: postId, comment, attachments } = req.body
            const files = req.files
            const comment_id = uuid()
            const fileUrls = []

            files.foreach(async (file) => {
                const upload = await uploadToCloudflareImage(file.path, process.env.CLOUDFLARE_API_KEY)
                fileUrls.push({
                    name: file.filename,
                    path: upload.response.result.variants.find((variant) => variant.includes('/public')),
                    type: file.mimetype.replace('image/', '')
                })
            })

            const createComment = await prismaQuery.postComment.create({
                data: {
                    comment: comment,
                    comment_id: comment_id,
                    post_id: postId,
                    user_id: id,
                }
            })


            const addAttachments = await prismaQuery.postCommentAttachments.createMany({
                data: [
                    ...fileUrls.map((file) => {
                        return {
                            name: file.name,
                            path: file.path,
                            type: file.type,
                            comment_id: createComment.id
                        }
                    })
                ]
            })

            if (!addAttachments) {
                const deleteComments = await prismaQuery.postComment.delete({
                    where: {
                        id: createComment.id
                    }
                })
                prismaQuery.$disconnect()
                return res.status(500).json({
                    status: false,
                    message: 'An error occured while creating comment'
                })
            }

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