import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

connectDB();

// Signup API
export async function POST(request: NextRequest) {
    const { name, username, email, password } = await request.json();

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// Login API
export async function GET(request: NextRequest) {   
    // Login here
    const { email, password } = await request.json();   
    try {
        // Check if the user exists
        const user = await User.find({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 });
        }   
        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        console.error("Error logging in user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// update profile API
export async function PUT(request: NextRequest) {   
    const { id, username, email, password } = await request.json();   
    try {
        // Check if the user exists
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        // Update the user details
        user.username = username;
        user.email = email;
        if (password) {
            // Hash the new password if provided
            user.password = await bcrypt.hash(password, 10);
        }
        await user.save();
        return NextResponse.json({ message: "Profile updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// delete user API
export async function DELETE(request: NextRequest) {
    const { id } = await request.json();   
    try {
        // Check if the user exists
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        // Delete the user
        await User.findByIdAndDelete(id);
        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}