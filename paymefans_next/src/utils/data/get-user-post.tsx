import axios from "axios"
import { getToken } from "../cookie.get"

export const getUserPosts = async (page: number) => {
    try {
        const token = getToken()
        const postPerPage = process.env.NEXT_PUBLIC_POST_PER_PAGE
        const res = await axios.get(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/user/posts?page=${page}&limit=${postPerPage}`, {
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