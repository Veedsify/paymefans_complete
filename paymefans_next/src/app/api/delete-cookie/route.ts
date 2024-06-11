import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest) {
    req.cookies.delete("token");
    return NextResponse.json({ success: true });
}