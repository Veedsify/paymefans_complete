import { AuthUserProps } from "@/app/types/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getUserData = async () => {
  if (!cookies().get("token")?.value) redirect("/login");
  const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/retrieve`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });
  if (res.ok) {
    const user = (await res.json()) as AuthUserProps;
    return user;
  }
  redirect("/login");
};

export default getUserData;
