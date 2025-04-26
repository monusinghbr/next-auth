"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter(); // Initialize the router
    const [user, setUser] = React.useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false); // State to manage button disabled state
    const [loading, setLoading] = React.useState(false); // State to manage loading state
    useEffect(() => {
        if(user.name.length > 0 && user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false); // Enable the button if all fields are filled
        }
        else {
            setButtonDisabled(true); // Disable the button if any field is empty
        }
    }, [user]); // Empty dependency array to run only once on mount

    const signup = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setLoading(true); // Set loading state to true
        try {
            console.log("User data:", user); // Log the user data to check if it's correct
            // Make the API call to your signup endpoint           
            const response = await axios.post("/api/auth/signup", user, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Signup success : ", response.data); // Handle the response as needed

            // redirect on login 
            router.push("/login");
        }
        catch (error: any) {
            toast.error(error.message); // Show error toast
            console.error("Error during signup:", error);
        }
        finally {
            setLoading(false); // Set loading state to false after the API call
        }
    };



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <h1 className="text-center text-white text-2xl mb-4">
                {loading ? "Processing" : "Signup"}
            </h1>
            <div className="flex flex-col items-center bg-gray-800 p-6 rounded shadow-md w-full max-w-sm">
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Full Name"
                    className="mb-4 p-2 w-full rounded bg-gray-700 text-white"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />

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
                    onClick={signup}
                    disabled={buttonDisabled} // Disable the button if any field is empty
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                    {buttonDisabled ? 'No Signup' : 'Signup'}
                    
                </button>

                <Link className="mt-4 font-light" href="/login">Visit login page</Link>
            </div>

        </div>
    );
}