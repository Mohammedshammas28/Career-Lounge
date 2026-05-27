const mongoose = require("mongoose");

const mongoUri = "mongodb://mohammedshammasuddins81:Shammas_28@cluster0-shard-00-00.xm21m.mongodb.net:27017,cluster0-shard-00-01.xm21m.mongodb.net:27017,cluster0-shard-00-02.xm21m.mongodb.net:27017/Career-Lounge?ssl=true&replicaSet=atlas-90e3ig-shard-0&authSource=admin&retryWrites=true&w=majority";

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