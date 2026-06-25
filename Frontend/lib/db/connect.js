import mongoose from "mongoose";

// Disable buffering so that queries fail fast if the database is offline,
// allowing the application to use fallback mechanisms immediately.
mongoose.set("bufferCommands", false);

export async function connectToDatabase() {
    // 1 = connected
    if (mongoose.connection.readyState === 1) {
        return;
    }

    // 2 = connecting
    if (mongoose.connection.readyState === 2) {
        return;
    }

    try {
        const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/career-lounge";
        // Connect with serverSelectionTimeoutMS so connection attempts fail fast (e.g. 3000ms instead of 30s)
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 3000,
        });

        console.log("✓ Connected to MongoDB");
    } catch (error) {
        console.error("✗ MongoDB connection failed:", error.message);
        throw error;
    }
}

export async function disconnectFromDatabase() {
    if (mongoose.connection.readyState === 0) {
        return;
    }

    try {
        await mongoose.disconnect();
        console.log("✓ Disconnected from MongoDB");
    } catch (error) {
        console.error("✗ MongoDB disconnection failed:", error.message);
        throw error;
    }
}

