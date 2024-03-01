import { hashPassword } from "@/app/utils/passwordHasher";
import { prismaQuery } from "@/app/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const userInputData = await req.json();
  if (
    !userInputData ||
    (userInputData.email === undefined && userInputData.password === undefined)
  ) {
    return NextResponse.json({ status: 301, message: "No userdata Present" });
  }
  try {
    const hashPass = hashPassword(userInputData?.password);
    const uniqueUserId = Math.floor(Math.random() * 1000000) + "fans";
    // Create a new user
    const user = await prismaQuery.user.create({
      data: {
        fullname: userInputData?.name,
        user_id: uniqueUserId,
        username: `@${userInputData?.username}`,
        name: userInputData?.name,
        email: userInputData?.email,
        phone: userInputData?.phone,
        location: userInputData?.location,
        password: hashPass,
      },
    });
    if (user) {
      return NextResponse.json({
        status: 200,
        json: { message: "User created successfully" },
      });
    } else {
      return NextResponse.json({
        status: 400,
        json: { message: "User creation failed" },
      });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: 400,
      json: { message: error.message },
    });
  }
}
