import axios from "axios"
import { getToken } from "../cookie.get"

export const getUserPosts = async ({ page, userid }: { page: number; userid?: string }) => {
    try {
        const token = getToken()
        const api = userid ? `${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/${userid}/posts` : `${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/posts`

        const postPerPage = process.env.NEXT_PUBLIC_POST_PER_PAGE
        const res = await axios.get(`${api}?page=${page}&limit=${postPerPage}`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        })

        return res.data
    } catch (error) {
        console.error(error)
    }
}