import { connectToDatabase } from "@/lib/db/connect";
import University from "@/models/University";
import Job from "@/models/Job";

export async function GET() {
  const baseUrl = "https://career-lounge.in";

  // Default static pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/universities",
    "/jobs",
    "/services/educational-consultancy/domestic",
    "/services/educational-consultancy/overseas",
    "/services/immigration",
    "/services/recruitment/domestic",
    "/services/recruitment/overseas"
  ];

  let dynamicPages = [];

  try {
    await connectToDatabase();

    // Fetch Universities slugs
    const universities = await University.find({}, "slug updatedAt").lean();
    const universityPages = universities.map((uni) => ({
      loc: `/university/${uni.slug || uni._id}`,
      lastmod: uni.updatedAt ? new Date(uni.updatedAt).toISOString() : new Date().toISOString()
    }));

    // Fetch Jobs slugs
    const jobs = await Job.find({ isActive: true }, "slug updatedAt").lean();
    const jobPages = jobs.map((job) => ({
      loc: `/jobs/${job.slug || job._id}`,
      lastmod: job.updatedAt ? new Date(job.updatedAt).toISOString() : new Date().toISOString()
    }));

    dynamicPages = [...universityPages, ...jobPages];
  } catch (error) {
    console.error("[Sitemap Generator] Failed to fetch dynamic paths:", error);
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("")}
  ${dynamicPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200"
    }
  });
}
