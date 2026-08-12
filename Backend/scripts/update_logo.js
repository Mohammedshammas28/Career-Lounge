const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
    universityName: String,
    slug: { type: String, unique: true },
    logo: String,
    bannerImage: String,
    country: String,
    city: String,
    ranking: String,
    website: String,
    description: String,
    features: [String],
    courses: [{
        name: String,
        duration: String,
        tuition: String,
        requirements: [String]
    }],
    universityImages: [String],
    updatedAt: { type: Date, default: Date.now }
});

const University = mongoose.models.University || mongoose.model('University', UniversitySchema);

async function updateMelbourneLogo() {
    try {
        await mongoose.connect('mongodb+srv://mshamsher868:shamsher@cluster0.p75li.mongodb.net/career_lounge?retryWrites=true&w=majority');
        console.log('Connected to MongoDB');

        const logoData = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0wIDBoNDh2NDhIMHoiLz48cGF0aCBmaWxsPSIjMDkyNTRmIiBkPSJNMzguMiA0MEg5LjhWOC4zaDI4LjRWNDB6bS0yNi45LTIuNWgyNS40VjEwLjhIMTEuM3YyNi43eiIvPjxwYXRoIGZpbGw9IiMwOTI1NGYiIGQ9Ik0yOS42IDE2LjRoLTMuOHYtMy4xaC0zLjR2My4xaC0zLjR2My4zaDMuNHY1LjFoMy40di01LjFoMy44di0zLjN6bS00LjkgMTUuOWgtMS41djIuMmgxLjV2LTIuMnpNMTEuOSAzNC4xaDI0LjJ2LjRoLTExLjJsLjQgMi4yaDEwLjh2LjVoLTI0LjJ2LS40aDExLjFsLS40LTIuMkgxMS45di0uNXoiLz48L3N2Zz4=';

        const result = await University.findOneAndUpdate(
            { slug: 'university-of-melbourne' },
            { logo: logoData },
            { new: true }
        );

        if (result) {
            console.log('Successfully updated logo for:', result.universityName);
        } else {
            console.log('University not found with slug: university-of-melbourne');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

updateMelbourneLogo();
