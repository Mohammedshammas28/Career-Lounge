import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
    if (isConnected) {
        return;
    }

    try {
        const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/career-lounge";
        await mongoose.connect(mongoUri);

        isConnected = true;
        console.log("✓ Connected to MongoDB");
    } catch (error) {
        console.error("✗ MongoDB connection failed:", error.message);
        throw error;
    }
}

export async function disconnectFromDatabase() {
    if (!isConnected) {
        return;
    }

    try {
        await mongoose.disconnect();
        isConnected = false;
        console.log("✓ Disconnected from MongoDB");
    } catch (error) {
        console.error("✗ MongoDB disconnection failed:", error.message);
        throw error;
    }
}
