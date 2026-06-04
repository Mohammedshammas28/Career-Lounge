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
        title: {
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
        desc: String,
        img: String,
        duration: String,
        fees: String,
        level: String,
        overview: String,
        requirements: String,
        opportunities: String,
        subjects: [String],
        subCourses: [subCourseSchema],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);
