const mongoose = require("mongoose");

const mongoUri = "mongodb://mohammedshammasuddins81:Shammas_28@cluster0-shard-00-00.xm21m.mongodb.net:27017,cluster0-shard-00-01.xm21m.mongodb.net:27017,cluster0-shard-00-02.xm21m.mongodb.net:27017/Career-Lounge?ssl=true&replicaSet=atlas-90e3ig-shard-0&authSource=admin&retryWrites=true&w=majority";

async function run() {
    try {
        await mongoose.connect(mongoUri);
        const University = mongoose.model("University", new mongoose.Schema({}, { strict: false }));
        const Course = mongoose.model("Course", new mongoose.Schema({}, { strict: false }));

        const universities = await University.find({});
        console.log("UNIVERSITIES IN DB SUMMARY:");
        for (const uni of universities) {
            console.log(`- ${uni.get("universityName")}: Country = ${uni.get("country")}, Category = ${uni.get("category")}, CoursesOffered = ${JSON.stringify(uni.get("coursesOffered"))}`);
        }

        const courses = await Course.find({});
        console.log("\nCOURSES IN DB SUMMARY:");
        for (const c of courses) {
            console.log(`- ${c.get("courseName")}: status = ${c.get("status")}`);
        }

        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

run();
