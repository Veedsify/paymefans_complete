import { cookies } from "next/headers";

const getAllPoints = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_URL}/global/points`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
    }
  );
  if (res.ok) {
    const { allPoints } = await res.json();
    return allPoints;
  }
};

export default getAllPoints;
