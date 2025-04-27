import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
    } catch (error: any) {
        console.error("Error during logout:", error);
        return NextResponse.json({ message: "Server error: " + error.message }, { status: 500 });
    }
}
