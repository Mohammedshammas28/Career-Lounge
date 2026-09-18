"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FirebaseTest() {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadUniversities() {
            try {
                const snapshot = await getDocs(
                    collection(db, "universities")
                );

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setUniversities(data);
            } catch (error) {
                console.error("Firebase error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadUniversities();
    }, []);

    return (
        <main className="min-h-screen p-10 text-white">
            <h1 className="text-3xl font-bold">
                Firebase Connection Test
            </h1>

            {loading && (
                <p className="mt-4 text-white/80">
                    Loading universities...
                </p>
            )}

            {error && (
                <div className="mt-6 rounded-lg bg-red-500/20 p-4 text-red-200">
                    <strong>Firebase Error:</strong> {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    <div className="mt-6 rounded-lg bg-green-500/20 p-4">
                        <p className="text-green-200">
                            ✓ Firebase connected successfully
                        </p>

                        <p className="mt-1 text-white/80">
                            Found {universities.length} university
                            document(s).
                        </p>
                    </div>

                    <div className="mt-8 space-y-4">
                        {universities.map((university) => (
                            <div
                                key={university.id}
                                className="rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-md"
                            >
                                <h2 className="text-2xl font-semibold">
                                    {university.universityName ||
                                        university.name ||
                                        "Unnamed University"}
                                </h2>

                                <div className="mt-4 space-y-2 text-white/80">
                                    <p>
                                        <strong>Country:</strong>{" "}
                                        {university.country || "N/A"}
                                    </p>

                                    <p>
                                        <strong>City:</strong>{" "}
                                        {university.city || "N/A"}
                                    </p>

                                    <p>
                                        <strong>Ranking:</strong>{" "}
                                        {university.ranking || "N/A"}
                                    </p>

                                    <p>
                                        <strong>Website:</strong>{" "}
                                        {university.website || "N/A"}
                                    </p>

                                    <p>
                                        <strong>Overview:</strong>{" "}
                                        {university.overview || "N/A"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </main>
    );
}