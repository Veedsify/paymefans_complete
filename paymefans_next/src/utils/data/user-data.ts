import { AuthUserProps } from "@/types/user";
import axiosInstance from "../axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AxiosResponse } from "axios";

const getUserData = async () => {
  try {
    const res: AxiosResponse = await axiosInstance.get(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/retrieve`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cookies().get("token")?.value}`,
      }
    })
    if (res.status === 200) {
      return res.data.user
    }
    else {
      return null;
    }
  }
  catch (err: any) {
    redirect("/login")
  }
};

export default getUserData;
