"use client";
import React from "react";
import { useParams } from "next/navigation";

export default function UserProfile() {
    const params = useParams(); // Use useParams to access the params object

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <h1 className="text-center text-white text-2xl mb-4">
                Profile Page
            </h1>
            <div className="flex flex-col items-center bg-gray-800 p-6 rounded shadow-md w-full max-w-sm">
                Data id is: {params.id} 
            </div>
        </div>
    );
}