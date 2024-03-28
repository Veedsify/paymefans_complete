import { redirect } from "next/navigation";
import axiosInstance from "../axios";

const getUserPoints = async () => {
  const res = await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_EXPRESS_URL}/auth/points`,
  );
  if (res.status === 200) {
    return res.data.points;
  } else {
    redirect("/login");
    return null;
  }
};
export default getUserPoints;
