import dns from "dns";
import mongoose from "mongoose";

// ── Fix: Override DNS to Google/Cloudflare so that mongodb+srv:// SRV lookups
// work even when the local/network DNS blocks SRV-type queries.
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);

// ── Production pattern: cache the connection promise globally so that
// Next.js hot-reloads and serverless invocations reuse the same connection
// instead of spawning a new one each time.
let cachedPromise = null;

export async function connectToDatabase() {
    // Already connected — fast path
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    // Reuse in-flight connection promise (prevents duplicate connections)
    if (cachedPromise) {
        await cachedPromise;
        return mongoose.connection;
    }

    const mongoUri =
        process.env.MONGODB_URI || "mongodb://localhost:27017/career-lounge";

    cachedPromise = mongoose
        .connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            maxPoolSize: 10,          // connection pool for concurrent requests
            minPoolSize: 2,
            retryWrites: true,
        })
        .then((m) => {
            console.log("✓ Connected to MongoDB Atlas");
            return m;
        })
        .catch((err) => {
            cachedPromise = null;     // allow retry on next request
            console.error("✗ MongoDB connection failed:", err.message);
            throw err;
        });

    await cachedPromise;
    return mongoose.connection;
}

export async function disconnectFromDatabase() {
    if (mongoose.connection.readyState === 0) return;

    try {
        cachedPromise = null;
        await mongoose.disconnect();
        console.log("✓ Disconnected from MongoDB");
    } catch (error) {
        console.error("✗ MongoDB disconnection failed:", error.message);
        throw error;
    }
}

