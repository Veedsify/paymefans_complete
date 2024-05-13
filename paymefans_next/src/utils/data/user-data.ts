import { AuthUserProps } from "@/types/user";
import axiosInstance from "../axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AxiosResponse } from "axios";

const getUserData = async () => {
  const token = cookies().get("token")?.value;
  try {
    const res: AxiosResponse = await axiosInstance.get(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/retrieve`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
    if (res.status === 200) {
      return res.data.user
    }

    if (res.status === 401) {
      redirect("/login");
    }
    else {
      return null;
    }
  }
  catch (err: any) {
    return null || undefined;
  }
};

export default getUserData;
