import fs from "fs";
import path from "path";

const bannerFile = path.join(process.cwd(), "public", "banner.json");

export async function GET() {
  try {
    if (!fs.existsSync(bannerFile)) {
      // Default banner
      return Response.json({ text: "Welcome to Career Lounge!", image: null });
    }
    const data = fs.readFileSync(bannerFile, "utf-8");
    let banner;
    try {
      banner = JSON.parse(data);
    } catch (e) {
      banner = { text: "Welcome to Career Lounge!", image: null };
    }
    if (!banner.text && !banner.image) {
      banner = { text: "Welcome to Career Lounge!", image: null };
    }
    return Response.json(banner);
  } catch (err) {
    return Response.json({ error: "Failed to fetch banner" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { text, image } = await req.json();
    const banner = { text, image };
    fs.writeFileSync(bannerFile, JSON.stringify(banner));
    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Failed to save banner" }, { status: 500 });
  }
}
