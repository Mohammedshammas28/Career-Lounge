import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Not used in Next.js
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";
import {
  IconClipboardList,
  IconSettings,
  IconLogout,
  IconHome,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import { ThemeToggle } from "../theme-toggle";
// import { getMe } from "../../services/auth"; // Not found, remove for now

// ─── Stat Card ───────────────────────────────────────────────────────────────
const colorVariants = {
  blue: "border-blue-500/20 hover:border-blue-500/50 bg-blue-500/10 text-blue-400",
  green:
    "border-green-500/20 hover:border-green-500/50 bg-green-500/10 text-green-400",
  purple:
    "border-purple-500/20 hover:border-purple-500/50 bg-purple-500/10 text-purple-400",
  yellow:
    "border-yellow-500/20 hover:border-yellow-500/50 bg-yellow-500/10 text-yellow-400",
  orange:
    "border-orange-500/20 hover:border-orange-500/50 bg-orange-500/10 text-orange-400",
};

function StatCard({ title, value, sub, icon, color, onClick }) {
  const cls = colorVariants[color] || "";
  const parts = cls.split(" ");
  const bg = parts[2] || "";
  const text = parts[3] || "";
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border p-5 transition-all duration-200 backdrop-blur bg-neutral-800/60 ${cls} ${onClick ? "cursor-pointer hover:bg-neutral-700/40" : ""}`}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
          {title}
        </p>
        <span className={`p-2 rounded-lg ${bg} ${text}`}>{icon}</span>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-neutral-500 mt-1">{sub}</p>}
    </div>
  );
}

// ─── Action Card ─────────────────────────────────────────────────────────────
function ActionCard({ label, desc, icon, color, onClick }) {
  const variants = {
    blue: "hover:border-blue-500/50 text-blue-400 bg-blue-500/10 group-hover:bg-blue-500/20",
    green:
      "hover:border-green-500/50 text-green-400 bg-green-500/10 group-hover:bg-green-500/20",
    purple:
      "hover:border-purple-500/50 text-purple-400 bg-purple-500/10 group-hover:bg-purple-500/20",
    orange:
      "hover:border-orange-500/50 text-orange-400 bg-orange-500/10 group-hover:bg-orange-500/20",
  };
  const cls = variants[color] || "";
  const parts = cls.split(" ");
  const hoverBorder = parts[0];
  const text = parts[1];
  const bg = parts[2];
  const groupBg = parts[3];
  return (
    <button
      onClick={onClick}
      className={`group rounded-xl border border-neutral-700 bg-neutral-800/60 p-5 text-left transition-all duration-200 hover:bg-neutral-700/30 backdrop-blur w-full ${hoverBorder}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`p-3 rounded-lg transition-colors ${bg} ${text} ${groupBg}`}
        >
          {icon}
        </span>
        <span
          className={`text-neutral-600 transition-colors group-hover:${text}`}
        >
          →
        </span>
      </div>
      <h3 className="font-semibold text-white mb-0.5">{label}</h3>
      <p className="text-xs text-neutral-400">{desc}</p>
    </button>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────
export default function StudentDashboard() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    registeredEvents: 0,
    attendedEvents: 0,
    upcomingEvents: 0,
    completedTests: 0,
    pendingTests: 0,
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  // Banner state
  const [bannerText, setBannerText] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  // Track loading state for banner save
  const [bannerSaving, setBannerSaving] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        // const profile = await getMe(); // Not found, remove for now
        const u = profile?.user || profile;
        setUser(u);
      } catch (err) {
        setUser(null);
      }
      setStats({
        registeredEvents: 5,
        attendedEvents: 4,
        upcomingEvents: 2,
        completedTests: 3,
        pendingTests: 1,
      });
      setRecentEvents([
        { id: 1, name: "Hackathon", date: "2026-03-10" },
        { id: 2, name: "Workshop", date: "2026-03-15" },
      ]);
    }
    fetchUser();
    // Fetch banner from API
    async function fetchBanner() {
      try {
        const res = await fetch("/api/banner");
        if (res.ok) {
          const data = await res.json();
          setBannerText(data.text || "Welcome to Career Lounge!");
          setBannerPreview(data.image || null);
        }
      } catch (err) {
        setBannerText("Welcome to Career Lounge!");
        setBannerPreview(null);
      }
    }
    fetchBanner();
  }, []);

  // No nav links for admin dashboard banner/user data view
  // You can add admin-specific links here if needed
  const navLinks = [
    {
      label: "Overview",
      section: "overview",
      icon: <IconHome size={20} className="text-blue-400 shrink-0" />,
    },
    {
      label: "Edit Banner",
      section: "banner",
      icon: <IconSettings size={20} className="text-blue-400 shrink-0" />,
    },
    {
      label: "Contact Form",
      section: "contact",
      icon: <IconClipboardList size={20} className="text-blue-400 shrink-0" />,
    },
  ];
  // ─── Overview Section ───────────────────────────────────────────────
  // Add your overview UI code below
  const contactData = [
    { name: "John Doe", email: "john@example.com", service: "Career Counselling" },
    { name: "Jane Smith", email: "jane@example.com", service: "Immigration" },
  ];
  const currentBanner = {
    image: bannerPreview || "banner.jpg", // Show preview if available
    text: bannerText,
  };

  const renderSection = () => {
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      );
    }
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === "overview" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">Dashboard Overview</h2>
            <div className="bg-blue-500/10 dark:bg-blue-900/30 border border-blue-500 rounded-xl p-6 flex flex-col gap-4 w-full max-w-2xl shadow">
              <div className="mb-4">
                <span className="text-base text-neutral-700 dark:text-neutral-400">Total Contact Form Submissions:</span>
                <span className="ml-2 text-lg font-bold text-neutral-900 dark:text-white">{contactData.length}</span>
              </div>
              <div className="mb-4">
                <span className="text-base text-neutral-700 dark:text-neutral-400">Current Banner Text:</span>
                <span className="ml-2 text-lg font-bold text-neutral-900 dark:text-white">{currentBanner.text}</span>
              </div>
              <div className="mb-4">
                <span className="text-base text-neutral-700 dark:text-neutral-400">Current Banner Image:</span>
                <img src={currentBanner.image} alt="Banner" className="mt-2 rounded w-full max-w-xs" />
              </div>
            </div>
          </div>
        )}
        {activeSection === "banner" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">Edit Home Page Banner</h2>
            <div className="bg-blue-500/10 dark:bg-blue-900/30 border border-blue-500 rounded-xl p-6 flex flex-col gap-4 w-full max-w-2xl shadow">
              <label className="text-base text-neutral-700 dark:text-neutral-400 mb-2">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                className="mb-2"
                onChange={e => {
                  const file = e.target.files[0];
                  setBannerImage(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setBannerPreview(reader.result);
                    reader.readAsDataURL(file);
                  } else {
                    setBannerPreview(null);
                  }
                }}
              />
              {bannerPreview && (
                <img src={bannerPreview} alt="Banner Preview" className="mb-2 rounded w-full max-w-xs" />
              )}
              <label className="text-base text-neutral-700 dark:text-neutral-400 mb-2">Banner Text</label>
              <input
                type="text"
                value={bannerText}
                onChange={e => setBannerText(e.target.value)}
                placeholder="Enter banner text"
                className="mb-2 p-2 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white"
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-fit self-end disabled:opacity-50"
                disabled={bannerSaving}
                onClick={async () => {
                  setBannerSaving(true);
                  // Convert image to base64 if available
                  let imageData = bannerPreview;
                  // POST to API
                  try {
                    const res = await fetch("/api/banner", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ text: bannerText, image: imageData }),
                    });
                    if (res.ok) {
                      setActiveSection("overview");
                    }
                  } catch (err) {}
                  setBannerSaving(false);
                }}
              >
                {bannerSaving ? "Saving..." : "Save Banner"}
              </button>
            </div>
          </div>
        )}
        {activeSection === "contact" && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">Contact Form Submissions</h2>
            <div className="bg-blue-500/10 dark:bg-blue-900/30 border border-blue-500 rounded-xl p-6 w-full max-w-2xl shadow">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-blue-600 dark:text-blue-400">
                    <th className="py-2">Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Service Requested</th>
                  </tr>
                </thead>
                <tbody>
                  {contactData.map((row, idx) => (
                    <tr key={idx} className="border-t border-blue-500">
                      <td className="py-2 text-neutral-900 dark:text-white">{row.name}</td>
                      <td className="py-2 text-neutral-900 dark:text-white">{row.email}</td>
                      <td className="py-2 text-neutral-900 dark:text-white">{row.service}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── Remaining UI Code ──────────────────────────────────────────────
  // Add sidebar, navigation, and main dashboard layout below
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-black flex-col md:flex-row">
      {/* SIDEBAR UI CODE GOES HERE */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody className="justify-between gap-8 bg-white dark:bg-black border-r border-blue-500">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto gap-1">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-7 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-gradient-to-br from-blue-500 to-cyan-400" />
              <div className="flex-1" />
              <div>
                <ThemeToggle />
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-1">
              {navLinks.map((link) => (
                <SidebarLink
                  key={link.section}
                  link={{ label: link.label, href: "#", icon: link.icon }}
                  onClick={() => setActiveSection(link.section)}
                  className={
                    activeSection === link.section
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-neutral-400"
                  }
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.name || user?.email || "Student",
                href: "#",
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                    {(user?.name || user?.email || "S")[0].toUpperCase()}
                  </div>
                ),
              }}
            />
            <SidebarLink
              link={{
                label: "Logout",
                href: "#",
                icon: (
                  <IconLogout size={20} className="text-neutral-400 shrink-0" />
                ),
              }}
              onClick={() => {
                /* Add logout logic here */
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* MAIN DASHBOARD UI CODE GOES HERE */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-black text-black dark:text-white w-full">
        {renderSection()}
      </main>
    </div>
  );
}