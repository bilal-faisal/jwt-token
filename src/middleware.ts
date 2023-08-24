import { NextRequest, NextResponse } from "next/server";
import { getJwtSecretKey } from "./lib/auth";
import { jwtVerify } from "jose";

export const middleware = async (request: NextRequest) => {
    const token = request.cookies.get("token")?.value;

    const { origin, pathname } = request.nextUrl;

    // if we have no token and user goes to register then let it go
    if (!token && (pathname === "/register" || pathname === "/login")) {
        return NextResponse.next();
    }

    // checks whether token exists or not
    if (!token) {
        return NextResponse.redirect(`${origin}/login`);
    }

    try {
        // checks whether user token is valid or not
        await jwtVerify(
            token,
            new TextEncoder().encode(getJwtSecretKey())
        );
    } catch (e) {
        console.log("Error---" + e);

        let res = NextResponse.redirect(`${origin}/login`);
        res.cookies.delete("token");
        return res;
    }


    if (pathname === "/login" || pathname === "/register") {
        return NextResponse.redirect(`${origin}`);
    }

    return NextResponse.next();

};

export const config = {
    matcher: ["/protected", "/login", "/register"],
};
