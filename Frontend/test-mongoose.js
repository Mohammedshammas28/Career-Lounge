const mongoose = require("mongoose");

const mongoUri = "mongodb://mohammedshammasuddins81:Shammas_28@cluster0-shard-00-00.xm21m.mongodb.net:27017,cluster0-shard-00-01.xm21m.mongodb.net:27017,cluster0-shard-00-02.xm21m.mongodb.net:27017/Career-Lounge?ssl=true&replicaSet=atlas-90e3ig-shard-0&authSource=admin&retryWrites=true&w=majority";

const subCourseSchema = new mongoose.Schema({
    name: String,
    duration: String,
    fees: String,
    overview: String,
    careerOutcomes: String,
});

const courseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: String,
        image: String,
        duration: String,
        fees: String,
        category: String,
        overview: String,
        requirements: String,
        opportunities: String,
        subjects: [String],
        subCourses: [subCourseSchema],
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

async function run() {
    try {
        await mongoose.connect(mongoUri);
        const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
        console.log("Querying Course.find({ status: true })...");
        const courses = await Course.find({ status: true });
        console.log("Found courses count:", courses.length);
        for (const c of courses) {
            console.log(`- ID: ${c._id}, courseName: ${c.courseName}, status: ${c.status}`);
        }
        await mongoose.connection.close();
    } catch (err) {
        console.error("Error running test:", err);
    }
}

run();
