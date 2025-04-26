import mongoose from "mongoose";

export const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is not defined in the environment variables");
        process.exit(1); // Exit the process with failure
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const connected = mongoose.connection;

        connected.on("error", (error) => {
            console.error("MongoDB connection error:", error);
            process.exit(1); // Exit the process with failure
        });

        connected.once("open", () => {
            console.log("MongoDB connected successfully");
        });

        connected.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
};