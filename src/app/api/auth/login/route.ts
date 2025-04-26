import bcrypt from "bcryptjs";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

connectDB();


export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    try {
        // Check if JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // create token data 
        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email

        }

        // Generate a JWT token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({ 
            message: "Login successful", 
            success: true 
        });

        response.cookies.set("token", token, {
            httpOnly:true, 
        })

        return response;

        // Send the token in the response body
        // return NextResponse.json({ 
        //     message: "Login successful", 
        //     token 
        // }, { status: 200 });
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ message: "Server error: " + error.message }, { status: 500 });
    }
}