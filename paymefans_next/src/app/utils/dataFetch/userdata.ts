import { AuthUserProps } from "@/app/types/user";
import axiosInstance from "../axios";

const getUserData = async () => {
  const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/retrieve`)
  if (res.status === 200) {
    return res.data.user as AuthUserProps | null;
  } else {
    return null;
  }
};

export default getUserData;
