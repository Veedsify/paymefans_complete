import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const getUserPoints = async () => {
  if (!cookies().get("token")?.value) redirect("/login");
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_URL}/auth/points`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
    }
  );
  if (data.ok) {
    const res = await data.json();
    return res.points as { points: number };
  }
  redirect("/login");
};
export default getUserPoints;
