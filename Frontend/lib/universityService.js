import {
    collection,
    getDocs,
    query,
    orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export async function getUniversities() {
    const universitiesRef = collection(db, "universities");

    const snapshot = await getDocs(universitiesRef);

    return snapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
    }));
}