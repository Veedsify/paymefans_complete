import { prismaQuery } from "@/app/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username } = await req.json();
  const checkForUsername = await prismaQuery.user.findFirst({
    where: {
      username: username,
    },
  });
  if (checkForUsername) {
    return NextResponse.json({
      status: 400,
      json: { message: "Username already exists" },
    });
  }
  return NextResponse.json({
    status: 200,
    json: { message: "Username is available" },
  });
}
