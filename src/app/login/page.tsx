"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter(); // Initialize the router
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = React.useState(false); // State to manage loading state
    const [buttonDisabled, setButtonDisabled] = React.useState(false); // State to manage button disabled state
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false); // Enable the button if all fields are filled
        }
        else {
            setButtonDisabled(true); // Disable the button if any field is empty
        }
    }, [user]); // Empty dependency array to run only once on mount
    
    const login = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
    
        try {
            console.log("User data:", user);
    
            const response = await axios.post("/api/auth/login", user, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            // If login is successful
            console.log("Login response:", response.data);
            toast.success(response.data.message || "Login successful!");
            router.push("/profile");
    
        } catch (error: any) {
            console.error("Login error:", error);
    
            if (error.response) {
                // Server responded with a status code outside 2xx
                const status = error.response.status;
                const message = error.response.data?.message || "Login failed.";
    
                if (status === 401 || status === 404) {
                    toast.error(message);
                } else {
                    toast.error("Server error. Please try again later.");
                }
    
            } else if (error.request) {
                // Request was made but no response received
                toast.error("No response from server. Check your internet connection.");
            } else {
                // Something else went wrong
                toast.error("An unexpected error occurred.");
            }
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <h1 className="text-center text-white text-2xl mb-4">
                {loading ? 'Processing': 'Login'}
            </h1>
            <div className="flex flex-col items-center bg-gray-800 p-6 rounded shadow-md w-full max-w-sm">
                
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
                    onClick={login}
                    disabled={buttonDisabled}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    {buttonDisabled ? 'No Login' : 'Login'}
                    
                </button>

                <Link className="mt-4 font-light" href="/signup">Visit Signup page</Link>
            </div>

        </div>
    );
}