/**
 * Script to upload job records to MongoDB via API
 * Run with: node upload-jobs.js
 */

const jobData = [
  {
    title: "Study Abroad Counsellor",
    company: "Career Lounge",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    experience: "1-3 Years",
    salary: "₹3.5 - ₹5.5 LPA",
    category: "Overseas",
    description: "We are looking for a passionate Study Abroad Counsellor to guide students through university selection, admissions, documentation, and visa processes for top international destinations.\n\n**Key Skills Required:**\n- Counselling\n- Communication\n- CRM\n- Admissions\n- Student Support\n\n**Benefits:**\n- Performance Incentives\n- Health Insurance\n- Career Growth\n- Training Programs",
    responsibilities: [
      "Counsel students about overseas education opportunities.",
      "Recommend suitable universities and courses.",
      "Guide students with applications and documentation.",
      "Maintain regular follow-ups with students.",
      "Coordinate with university representatives."
    ],
    requirements: [
      "Bachelor's Degree",
      "Excellent communication skills",
      "Knowledge of UK, Australia, Canada or USA admissions",
      "CRM knowledge preferred"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Visa Documentation Executive",
    company: "Career Lounge",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    experience: "1-2 Years",
    salary: "₹2.8 - ₹4.2 LPA",
    category: "Overseas",
    description: "Support students throughout the visa application process by reviewing documents and ensuring compliance with embassy requirements.\n\n**Key Skills Required:**\n- Documentation\n- Visa Processing\n- Microsoft Office\n- Communication\n\n**Benefits:**\n- Paid Leave\n- Performance Bonus\n- Training",
    responsibilities: [
      "Verify visa documentation.",
      "Assist students with financial documents.",
      "Track visa applications.",
      "Coordinate with counsellors."
    ],
    requirements: [
      "Graduate in any discipline",
      "Attention to detail",
      "Good communication skills"
    ],
    isActive: true,
    isFeatured: false
  },
  {
    title: "Digital Marketing Executive",
    company: "Career Lounge",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    experience: "1-3 Years",
    salary: "₹3 - ₹5 LPA",
    category: "Domestic",
    description: "Drive online marketing campaigns to generate quality student leads for study abroad programs.\n\n**Key Skills Required:**\n- SEO\n- Google Ads\n- Meta Ads\n- Content Marketing\n- Analytics\n\n**Benefits:**\n- Flexible Working\n- Incentives\n- Professional Development",
    responsibilities: [
      "Manage Meta and Google Ads.",
      "Handle social media campaigns.",
      "Generate qualified student leads.",
      "Monitor campaign performance."
    ],
    requirements: [
      "Bachelor's Degree",
      "Experience with Meta Ads and Google Ads",
      "Knowledge of SEO"
    ],
    isActive: true,
    isFeatured: true
  },
  {
    title: "Admission Processing Executive",
    company: "Career Lounge",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    experience: "0-2 Years",
    salary: "₹2.5 - ₹4 LPA",
    category: "Overseas",
    description: "Manage university applications, communicate with partner institutions, and ensure timely submission of student documents.\n\n**Key Skills Required:**\n- Admissions\n- Documentation\n- Communication\n- CRM\n- Time Management\n\n**Benefits:**\n- Health Insurance\n- Annual Bonus\n- Learning Opportunities",
    responsibilities: [
      "Process university applications.",
      "Review student documents.",
      "Coordinate with overseas universities.",
      "Maintain application records."
    ],
    requirements: [
      "Graduate",
      "Good communication skills",
      "Basic knowledge of international admissions"
    ],
    isActive: true,
    isFeatured: false
  }
];

async function uploadJobs() {
  const apiUrl = process.env.API_URL || "http://localhost:3000";
  console.log(`🚀 Starting upload of ${jobData.length} jobs...`);

  for (const job of jobData) {
    try {
      console.log(`📡 Uploading job: ${job.title}...`);

      const response = await fetch(`${apiUrl}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      const result = await response.json();

      if (result.success) {
        console.log(`✅ Success: ${job.title} (ID: ${result.data._id})`);
      } else {
        console.error(`❌ Failed: ${job.title} - ${result.error}`);
      }
    } catch (error) {
      console.error(`❌ Error uploading ${job.title}: ${error.message}`);
    }
  }

  console.log("\n✨ All done!");
}

uploadJobs();
