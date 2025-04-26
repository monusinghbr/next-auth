"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useSession } from "next-auth/react";


export default function Dashboard() {
    const router = useRouter();
    
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            router.push("/login");
        }
    }, [session, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <h1 className="text-center text-white text-2xl mb-4">
                Dashboard
            </h1>
            <div className="flex flex-col items-center bg-gray-800 p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-white">Welcome to the Dashboard</h2>
                <Link href="/profile" className="text-blue-500">Go to Profile</Link>
            </div>
        </div>
    );
}
            


