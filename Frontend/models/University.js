import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
    {
        universityName: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },

        country: String,

        city: String,

        overview: String,

        logo: String,

        bannerImage: String,

        universityImages: [String],

        ranking: String,

        website: String,

        intakes: [
            {
                intakeName: String,
                startDate: Date,
                endDate: Date,
                applyDeadline: Date,
            },
        ],

        courses: [
            {
                courseName: String,
                level: String,
                duration: String,
                fees: String,
            },
        ],

        studentsEnrolled: String,

        visaSuccessRate: String,

        establishedYear: String,

        universityType: String,

        popularPrograms: [String],

        tuitionFees: {
            undergraduate: String,
            postgraduate: String,
        },

        accommodation: {
            available: Boolean,
            startingPrice: String,
        },

        languageRequirements: {
            ielts: String,
            toefl: String,
            pte: String,
        },

        scholarships: [
            {
                title: String,
                amount: String,
            },
        ],

        admissions: String,

        placements: String,

        campusFacilities: [String],

        faqs: [
            {
                question: String,
                answer: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Add text indexes for search functionality
universitySchema.index({
    universityName: "text",
    country: "text",
});

export default mongoose.models.University || mongoose.model("University", universitySchema);
