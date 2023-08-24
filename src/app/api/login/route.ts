import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { getJwtSecretKey } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    if (body.username === "admin" && body.password === "admin") {
        const jwt = await new SignJWT({
            username: body.username,
            role: "admin",
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("1m")
            .sign(new TextEncoder().encode(getJwtSecretKey()));

        cookies().set("token", jwt, { httpOnly: true })

        return NextResponse.json({ accessToken: jwt }, { status: 200 })
    } else {
        return NextResponse.json(
            {
                error: {
                    message:
                        "Failed to create token as username or password is incorrect",
                },
            },
            { status: 400 }
        );
    }
}
