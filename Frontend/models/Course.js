import mongoose from "mongoose";

const subCourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
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

courseSchema.pre("save", async function () {
    if (this.courseName) {
        this.courseName = this.courseName.trim().replace(/\s+/g, " ");
    }
    if (this.isModified("courseName")) {
        const CourseModel = mongoose.models.Course || mongoose.model("Course", courseSchema);
        const existing = await CourseModel.findOne({
            courseName: { $regex: new RegExp(`^${this.courseName.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, "i") }
        });
        if (existing && existing._id.toString() !== this._id.toString()) {
            throw new Error(`Course with name "${this.courseName}" already exists`);
        }
    }
});


export default mongoose.models.Course || mongoose.model("Course", courseSchema);
