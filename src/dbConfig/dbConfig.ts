import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const connected = mongoose.connection;
        connected.on("error", (error) => {
            console.error("MongoDB connection error:", error);
            process.exit(1); // Exit the process with failure
        });
        connected.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        connected.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit the process with failure
    }
}