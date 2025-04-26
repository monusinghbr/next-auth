"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";  

export default function ProfilePage() { 
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    const updateProfile = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            console.log("User data:", user); // Log the user data to check if it's correct
            // Make the API call to your update profile endpoint           
            // const response = await axios.post("http://localhost:3000/api/auth/update", user, {
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // });
            // console.log(response.data); // Handle the response as needed
        }
        catch (error) {
            console.error("Error during profile update:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <h1 className="text-center text-white text-2xl mb-4">
                Profile Page
            </h1>
            <div className="flex flex-col items-center bg-gray-800 p-6 rounded shadow-md w-full max-w-sm">
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="mb-4 p-2 w-full rounded bg-gray-700 text-white"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    className="mb-4 p-2 w-full rounded bg-gray-700 text-white"
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                    className="mb-4 p-2 w-full rounded bg-gray-700 text-white"
                />
                <button
                    type="button"
                    onClick={updateProfile}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    Update Profile
                </button>
            </div>
        </div>
    );  




}