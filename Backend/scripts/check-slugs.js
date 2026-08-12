const mongoose = require("mongoose");

const mongoUri = "mongodb+srv://info_db_user:Career-Lounge9291@careerlounge-cluster.bc1mhmr.mongodb.net/CareerLounge?appName=careerlounge-cluster";

async function check() {
    try {
        await mongoose.connect(mongoUri);
        const universities = await mongoose.connection.db.collection("universities").find({}, { projection: { universityName: 1, slug: 1 } }).toArray();
        console.log("Existing Universities and Slugs:");
        universities.forEach(u => console.log(`- ${u.universityName}: ${u.slug}`));
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}
check();