import axios from "axios";
import { getToken } from "./cookie.get";

export const SavePost = async (data: FormData) => {
    try {
        const token = getToken();
        const res = await axios.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/post/create`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error: any) {
        // Handle error here
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Server responded with error status:", error.response.status);
            console.error("Response data:", error.response.data);
            throw new Error(error.response.data.message || "An error occurred");
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
            throw new Error("No response received from server");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Request setup error:", error.message);
            throw new Error("Error setting up request");
        }
    }
};
