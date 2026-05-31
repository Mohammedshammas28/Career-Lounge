"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Plus,
    Edit2,
    Trash2,
    Search,
    Globe,
    MapPin,
    Award,
    BookOpen,
    Calendar,
    DollarSign,
    GraduationCap,
    Building2,
    Check,
    ArrowLeft,
    ArrowRight,
    Trash,
    Sparkles,
    UploadCloud
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getIntakeStatus } from "@/lib/intake-status";

// Safe date formatter for HTML date input YYYY-MM-DD
const formatDateForInput = (dateVal) => {
    if (!dateVal) return "";
    try {
        const d = new Date(dateVal);
        if (isNaN(d.getTime())) return "";
        return d.toISOString().split("T")[0];
    } catch (e) {
        return "";
    }
};

export default function UniversitiesAdminPage() {
    const [universities, setUniversities] = useState([]);
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [activeFormTab, setActiveFormTab] = useState("basic");
    const [uploading, setUploading] = useState({ logo: false, bannerImage: false });
    const [uploadError, setUploadError] = useState("");

    const [formData, setFormData] = useState({
        universityName: "",
        country: "",
        city: "",
        overview: "",
        logo: "",
        bannerImage: "",
        universityImages: [],
        ranking: "",
        website: "",
        studentsEnrolled: "",
        visaSuccessRate: "",
        establishedYear: "",
        universityType: "",
        tuitionFees: {
            undergraduate: "",
            postgraduate: "",
        },
        accommodation: {
            available: false,
            startingPrice: "",
        },
        languageRequirements: {
            ielts: "",
            toefl: "",
            pte: "",
        },
        scholarships: [],
        intakes: [],
        courses: [],
    });

    // Fetch universities
    useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/universities");
            const result = await response.json();
            if (result.success) {
                setUniversities(result.data);
                setFilteredUniversities(result.data);
            }
        } catch (error) {
            console.error("Error fetching universities:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter universities based on search
    useEffect(() => {
        const filtered = universities.filter(
            (uni) =>
                uni.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                uni.country.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUniversities(filtered);
    }, [searchQuery, universities]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const normalizedValue =
            name === "ranking" ? value.replace(/\D/g, "").slice(0, 4) : value;
        setFormData((prev) => ({
            ...prev,
            [name]: normalizedValue,
        }));
    };

    const handleNestedChange = (parent, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [parent]: {
                ...prev[parent],
                [field]: value,
            },
        }));
    };

    const uploadImageForField = async (file, fieldName) => {
        if (!file) return;

        setUploadError("");
        setUploading((prev) => ({ ...prev, [fieldName]: true }));

        try {
            const body = new FormData();
            body.append("file", file);
            body.append("folder", "universities");

            const response = await fetch("/api/upload-image", {
                method: "POST",
                body,
            });

            const result = await response.json();
            if (!response.ok || !result.url) {
                throw new Error(result.error || "Upload failed");
            }

            setFormData((prev) => ({
                ...prev,
                [fieldName]: result.url,
            }));
        } catch (error) {
            console.error("University image upload failed:", error);
            setUploadError(error.message || "Could not upload image");
        } finally {
            setUploading((prev) => ({ ...prev, [fieldName]: false }));
        }
    };

    // Course dynamic list helpers
    const addCourse = (level = "Undergraduate") => {
        setFormData((prev) => ({
            ...prev,
            courses: [
                ...prev.courses,
                { courseName: "", level, duration: "", fees: "" },
            ],
        }));
    };

    const removeCourse = (index) => {
        setFormData((prev) => ({
            ...prev,
            courses: prev.courses.filter((_, i) => i !== index),
        }));
    };

    const handleCourseChange = (index, field, value) => {
        setFormData((prev) => {
            const updated = [...prev.courses];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, courses: updated };
        });
    };

    const undergraduateCourses = formData.courses.filter((course) => {
        const level = (course.level || "").toLowerCase();
        return level.includes("under");
    });

    const postgraduateCourses = formData.courses.filter((course) => {
        const level = (course.level || "").toLowerCase();
        return !level.includes("under");
    });

    // Scholarship dynamic list helpers
    const addScholarship = () => {
        setFormData((prev) => ({
            ...prev,
            scholarships: [
                ...prev.scholarships,
                { title: "", amount: "" },
            ],
        }));
    };

    const removeScholarship = (index) => {
        setFormData((prev) => ({
            ...prev,
            scholarships: prev.scholarships.filter((_, i) => i !== index),
        }));
    };

    const handleScholarshipChange = (index, field, value) => {
        setFormData((prev) => {
            const updated = [...prev.scholarships];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, scholarships: updated };
        });
    };

    // Intake dynamic list helpers
    const addIntake = () => {
        setFormData((prev) => ({
            ...prev,
            intakes: [
                ...prev.intakes,
                { intakeName: "", applyDeadline: "" },
            ],
        }));
    };

    const removeIntake = (index) => {
        setFormData((prev) => ({
            ...prev,
            intakes: prev.intakes.filter((_, i) => i !== index),
        }));
    };

    const handleIntakeChange = (index, field, value) => {
        setFormData((prev) => {
            const updated = [...prev.intakes];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, intakes: updated };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Apply Premium fallback placeholders for missing logo/banner URLs
        let finalFormData = { ...formData };
        if (!finalFormData.logo?.trim()) {
            finalFormData.logo = "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&h=200&fit=crop";
        }
        if (!finalFormData.bannerImage?.trim()) {
            finalFormData.bannerImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&h=1080&fit=crop";
        }
        finalFormData.ranking = (finalFormData.ranking || "").replace(/\D/g, "").slice(0, 4);

        try {
            const url = editingId
                ? `/api/universities/${editingId}`
                : "/api/universities";
            const method = editingId ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalFormData),
            });

            const result = await response.json();

            if (result.success) {
                setIsDialogOpen(false);
                resetForm();
                fetchUniversities();
            } else {
                alert("Error: " + (result.error || "Could not save university"));
            }
        } catch (error) {
            console.error("Error saving university:", error);
            alert("Error saving university data.");
        }
    };

    const handleEdit = (university) => {
        setEditingId(university.slug);
        setFormData({
            universityName: university.universityName || "",
            country: university.country || "",
            city: university.city || "",
            overview: university.overview || "",
            logo: university.logo || "",
            bannerImage: university.bannerImage || "",
            universityImages: university.universityImages || [],
            ranking: university.ranking || "",
            website: university.website || "",
            studentsEnrolled: university.studentsEnrolled || "",
            visaSuccessRate: university.visaSuccessRate || "",
            establishedYear: university.establishedYear || "",
            universityType: university.universityType || "",
            tuitionFees: {
                undergraduate: university.tuitionFees?.undergraduate || "",
                postgraduate: university.tuitionFees?.postgraduate || "",
            },
            accommodation: {
                available: university.accommodation?.available || false,
                startingPrice: university.accommodation?.startingPrice || "",
            },
            languageRequirements: {
                ielts: university.languageRequirements?.ielts || "",
                toefl: university.languageRequirements?.toefl || "",
                pte: university.languageRequirements?.pte || "",
            },
            scholarships: university.scholarships || [],
            intakes: (university.intakes || []).map((intake) => ({
                intakeName: intake.intakeName || "",
                applyDeadline: formatDateForInput(intake.applyDeadline),
            })),
            courses: university.courses || [],
        });
        setActiveFormTab("basic");
        setIsDialogOpen(true);
    };

    const handleDelete = async (slug) => {
        if (confirm("Are you sure you want to delete this university? This action is permanent!")) {
            try {
                const response = await fetch(`/api/universities/${slug}`, {
                    method: "DELETE",
                });
                const result = await response.json();
                if (result.success) {
                    fetchUniversities();
                } else {
                    alert("Error: " + (result.error || "Could not delete university"));
                }
            } catch (error) {
                console.error("Error deleting university:", error);
            }
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            universityName: "",
            country: "",
            city: "",
            overview: "",
            logo: "",
            bannerImage: "",
            universityImages: [],
            ranking: "",
            website: "",
            studentsEnrolled: "",
            visaSuccessRate: "",
            establishedYear: "",
            universityType: "",
            tuitionFees: {
                undergraduate: "",
                postgraduate: "",
            },
            accommodation: {
                available: false,
                startingPrice: "",
            },
            languageRequirements: {
                ielts: "",
                toefl: "",
                pte: "",
            },
            scholarships: [],
            intakes: [],
            courses: [],
        });
        setActiveFormTab("basic");
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 sm:p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            🏫 Admin Panel <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold uppercase tracking-wider">Universities</span>
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm">Add, modify, and manage all academic institutions in the database.</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => resetForm()}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-100 rounded-xl gap-2 h-11"
                            >
                                <Plus className="w-5 h-5" /> Add University
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] flex flex-col p-0 overflow-hidden bg-white shadow-2xl rounded-2xl border-none">
                            <DialogHeader className="p-6 bg-slate-900 text-white relative">
                                <DialogTitle className="text-xl font-bold tracking-wide flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-blue-400" />
                                    {editingId ? "Modify University Details" : "Manually Create New University"}
                                </DialogTitle>
                                <p className="text-xs text-slate-300 mt-1">Fill in the tabs below to publish detailed information to the frontend catalog.</p>
                            </DialogHeader>

                            {/* Tab Selection Row */}
                            <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 gap-1 shrink-0 overflow-x-auto scrollbar-thin">
                                {[
                                    { id: "basic", label: "Basic Info", icon: Building2 },
                                    { id: "media", label: "Media & Bio", icon: Globe },
                                    { id: "cost", label: "Costs & Req", icon: DollarSign },
                                    { id: "courses", label: "Courses", icon: BookOpen },
                                    { id: "scholarships", label: "Intakes & Awards", icon: GraduationCap },
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setActiveFormTab(tab.id)}
                                            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex-1 justify-center whitespace-nowrap
                                                ${activeFormTab === tab.id
                                                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                                                }`}
                                        >
                                            <Icon className="w-4 h-4 shrink-0" />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Form Area */}
                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    {/* TAB 1: BASIC INFO */}
                                    {activeFormTab === "basic" && (
                                        <div className="space-y-4 animate-in fade-in duration-200">
                                            <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100/50 mb-6">
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 mb-1">
                                                    <Building2 className="w-4 h-4" /> Core Identity
                                                </h4>
                                                <p className="text-xs text-slate-500">Provide the official name and base locations of the university.</p>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-700">University Name <span className="text-rose-500">*</span></label>
                                                <Input
                                                    name="universityName"
                                                    placeholder="e.g., University of Birmingham Dubai"
                                                    value={formData.universityName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="rounded-lg border-slate-200 focus:ring-blue-500"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">Country</label>
                                                    <Input
                                                        name="country"
                                                        placeholder="e.g., United Arab Emirates"
                                                        value={formData.country}
                                                        onChange={handleInputChange}
                                                        className="rounded-lg border-slate-200"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">City / Main Campus</label>
                                                    <Input
                                                        name="city"
                                                        placeholder="e.g., Dubai"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        className="rounded-lg border-slate-200"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">University Type</label>
                                                    <Input
                                                        name="universityType"
                                                        placeholder="e.g., Public Research, Private"
                                                        value={formData.universityType}
                                                        onChange={handleInputChange}
                                                        className="rounded-lg border-slate-200"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">Established Year</label>
                                                    <Input
                                                        name="establishedYear"
                                                        placeholder="e.g., 1900"
                                                        value={formData.establishedYear}
                                                        onChange={handleInputChange}
                                                        className="rounded-lg border-slate-200"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">University Rank</label>
                                                    <Input
                                                        name="ranking"
                                                        placeholder="e.g., 84"
                                                        inputMode="numeric"
                                                        value={formData.ranking}
                                                        onChange={handleInputChange}
                                                        className="rounded-lg border-slate-200"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">Official Website URL</label>
                                                    <Input
                                                        name="website"
                                                        placeholder="e.g., https://www.birmingham.ac.uk"
                                                        value={formData.website}
                                                        onChange={handleInputChange}
                                                        className="rounded-lg border-slate-200"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB 2: MEDIA & BIO */}
                                    {activeFormTab === "media" && (
                                        <div className="space-y-4 animate-in fade-in duration-200">
                                            <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100/50 mb-6">
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 mb-1">
                                                    <Globe className="w-4 h-4" /> Graphics & Marketing Bio
                                                </h4>
                                                <p className="text-xs text-slate-500">Provide official media links. Default sizes are optimized for high-definition displays.</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-xs font-bold text-slate-700">Logo Image</label>
                                                        <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-black uppercase">500 x 500 px (Square)</span>
                                                    </div>
                                                    <input
                                                        id="university-logo-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => uploadImageForField(e.target.files?.[0], "logo")}
                                                    />
                                                    <div
                                                        className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/70 p-4 text-center"
                                                        onDragOver={(e) => e.preventDefault()}
                                                        onDrop={(e) => {
                                                            e.preventDefault();
                                                            uploadImageForField(e.dataTransfer.files?.[0], "logo");
                                                        }}
                                                    >
                                                        <UploadCloud className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                                                        <p className="text-xs text-slate-600 mb-2">Drop logo image here</p>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => document.getElementById("university-logo-upload")?.click()}
                                                            disabled={uploading.logo}
                                                        >
                                                            {uploading.logo ? "Uploading..." : "Browse Image"}
                                                        </Button>
                                                    </div>
                                                    {formData.logo && (
                                                        <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 bg-white">
                                                            <img src={formData.logo} alt="University logo" className="w-full h-28 object-contain p-2" />
                                                        </div>
                                                    )}
                                                    <p className="text-[10px] text-slate-400">If left blank, a gorgeous premium default crest is automatically supplied.</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-xs font-bold text-slate-700">Banner Image</label>
                                                        <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-black uppercase">1920 x 1080 px (Wide)</span>
                                                    </div>
                                                    <input
                                                        id="university-banner-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => uploadImageForField(e.target.files?.[0], "bannerImage")}
                                                    />
                                                    <div
                                                        className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/70 p-4 text-center"
                                                        onDragOver={(e) => e.preventDefault()}
                                                        onDrop={(e) => {
                                                            e.preventDefault();
                                                            uploadImageForField(e.dataTransfer.files?.[0], "bannerImage");
                                                        }}
                                                    >
                                                        <UploadCloud className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                                                        <p className="text-xs text-slate-600 mb-2">Drop banner image here</p>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => document.getElementById("university-banner-upload")?.click()}
                                                            disabled={uploading.bannerImage}
                                                        >
                                                            {uploading.bannerImage ? "Uploading..." : "Browse Image"}
                                                        </Button>
                                                    </div>
                                                    {formData.bannerImage && (
                                                        <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 bg-white">
                                                            <img src={formData.bannerImage} alt="University banner" className="w-full h-28 object-cover" />
                                                        </div>
                                                    )}
                                                    <p className="text-[10px] text-slate-400">If left blank, a high-resolution landscape campus banner is automatically supplied.</p>
                                                </div>
                                            </div>

                                            {uploadError && (
                                                <p className="text-xs font-semibold text-rose-600">{uploadError}</p>
                                            )}

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">Total Enrolled Students</label>
                                                    <Input
                                                        name="studentsEnrolled"
                                                        placeholder="e.g., 35,000+ Students"
                                                        value={formData.studentsEnrolled}
                                                        onChange={handleInputChange}
                                                        className="rounded-lg border-slate-200"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">Visa Success Rate</label>
                                                    <Input
                                                        name="visaSuccessRate"
                                                        placeholder="e.g., 99% Visa Rate"
                                                        value={formData.visaSuccessRate}
                                                        onChange={handleInputChange}
                                                        className="rounded-lg border-slate-200"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-700">Detailed Institution Overview</label>
                                                <Textarea
                                                    name="overview"
                                                    placeholder="Write a comprehensive summary about the university, academic highlights, research reputation, and location benefits..."
                                                    value={formData.overview}
                                                    onChange={handleInputChange}
                                                    rows={6}
                                                    className="rounded-lg border-slate-200 resize-y"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB 3: COSTS & ADMISSIONS */}
                                    {activeFormTab === "cost" && (
                                        <div className="space-y-6 animate-in fade-in duration-200">
                                            {/* Sub-section: Costs */}
                                            <div className="space-y-4">
                                                <h3 className="text-xs font-black uppercase tracking-wider text-blue-600 border-b pb-2 flex items-center gap-1.5">
                                                    <DollarSign className="w-4 h-4" /> Average Annual Costs & Accommodation
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-slate-700">Undergraduate Tuition</label>
                                                        <Input
                                                            placeholder="e.g., $25k - $38k / Year"
                                                            value={formData.tuitionFees?.undergraduate}
                                                            onChange={(e) => handleNestedChange("tuitionFees", "undergraduate", e.target.value)}
                                                            className="rounded-lg border-slate-200"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-slate-700">Postgraduate Tuition</label>
                                                        <Input
                                                            placeholder="e.g., $30k - $45k / Year"
                                                            value={formData.tuitionFees?.postgraduate}
                                                            onChange={(e) => handleNestedChange("tuitionFees", "postgraduate", e.target.value)}
                                                            className="rounded-lg border-slate-200"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    <div className="flex items-center gap-2 h-10">
                                                        <input
                                                            type="checkbox"
                                                            id="accAvail"
                                                            checked={formData.accommodation?.available}
                                                            onChange={(e) => handleNestedChange("accommodation", "available", e.target.checked)}
                                                            className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                                                        />
                                                        <label htmlFor="accAvail" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                                                            On-Campus Accommodation Available
                                                        </label>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-slate-700">Accommodation Price Info</label>
                                                        <Input
                                                            placeholder="e.g., From $250 / Week"
                                                            value={formData.accommodation?.startingPrice}
                                                            onChange={(e) => handleNestedChange("accommodation", "startingPrice", e.target.value)}
                                                            disabled={!formData.accommodation?.available}
                                                            className="rounded-lg border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Sub-section: English requirements */}
                                            <div className="space-y-4">
                                                <h3 className="text-xs font-black uppercase tracking-wider text-rose-600 border-b pb-2 flex items-center gap-1.5">
                                                    <GraduationCap className="w-4 h-4" /> English Language Benchmarks
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-slate-700">IELTS Score Required</label>
                                                        <Input
                                                            placeholder="e.g., 6.5 (no band < 6.0)"
                                                            value={formData.languageRequirements?.ielts}
                                                            onChange={(e) => handleNestedChange("languageRequirements", "ielts", e.target.value)}
                                                            className="rounded-lg border-slate-200"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-slate-700">TOEFL iBT Required</label>
                                                        <Input
                                                            placeholder="e.g., 88+ Overall"
                                                            value={formData.languageRequirements?.toefl}
                                                            onChange={(e) => handleNestedChange("languageRequirements", "toefl", e.target.value)}
                                                            className="rounded-lg border-slate-200"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-slate-700">PTE Required</label>
                                                        <Input
                                                            placeholder="e.g., 59+ Overall"
                                                            value={formData.languageRequirements?.pte}
                                                            onChange={(e) => handleNestedChange("languageRequirements", "pte", e.target.value)}
                                                            className="rounded-lg border-slate-200"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB 4: COURSES */}
                                    {activeFormTab === "courses" && (
                                        <div className="space-y-4 animate-in fade-in duration-200">
                                            <div className="flex justify-between items-center border-b pb-3">
                                                <div>
                                                    <h3 className="text-sm font-black uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                                                        <BookOpen className="w-4 h-4" /> Academic Course Portfolio
                                                    </h3>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">Separate undergraduate and postgraduate pathways for cleaner publishing.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between gap-4">
                                                        <h4 className="text-xs font-black uppercase tracking-wider text-indigo-700">Undergraduate Courses</h4>
                                                        <Button
                                                            type="button"
                                                            onClick={() => addCourse("Undergraduate")}
                                                            size="sm"
                                                            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-700 font-bold border border-indigo-200 rounded-lg gap-1"
                                                        >
                                                            <Plus className="w-4 h-4" /> Add Undergraduate Course
                                                        </Button>
                                                    </div>

                                                    {undergraduateCourses.length === 0 ? (
                                                        <div className="p-6 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-medium text-sm">
                                                            No undergraduate courses listed yet.
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-4 max-h-[32vh] overflow-y-auto pr-1">
                                                            {undergraduateCourses.map((course) => {
                                                                const courseIndex = formData.courses.indexOf(course);
                                                                return (
                                                                    <div key={`ug-${courseIndex}`} className="p-4 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-indigo-200 rounded-xl transition-all shadow-[0_2px_6px_rgba(0,0,0,0.01)] flex flex-col gap-3 relative group">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeCourse(courseIndex)}
                                                                            className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50 transition-all"
                                                                            title="Delete Course"
                                                                        >
                                                                            <Trash className="w-4 h-4" />
                                                                        </button>

                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                                                                            <div className="space-y-1">
                                                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Course Name</label>
                                                                                <Input
                                                                                    placeholder="e.g., B.Sc. Computer Science"
                                                                                    value={course.courseName}
                                                                                    onChange={(e) => handleCourseChange(courseIndex, "courseName", e.target.value)}
                                                                                    required
                                                                                    className="h-9 text-xs rounded-lg border-slate-200"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Level</label>
                                                                                <Input value="Undergraduate" disabled className="h-9 text-xs rounded-lg border-slate-200 bg-slate-100 text-slate-500" />
                                                                            </div>
                                                                        </div>

                                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                                                                            <div className="space-y-1">
                                                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Duration</label>
                                                                                <Input
                                                                                    placeholder="e.g., 3 Years"
                                                                                    value={course.duration}
                                                                                    onChange={(e) => handleCourseChange(courseIndex, "duration", e.target.value)}
                                                                                    className="h-9 text-xs rounded-lg border-slate-200"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Annual Tuition Fees</label>
                                                                                <Input
                                                                                    placeholder="e.g., £26,500 / Year"
                                                                                    value={course.fees}
                                                                                    onChange={(e) => handleCourseChange(courseIndex, "fees", e.target.value)}
                                                                                    className="h-9 text-xs rounded-lg border-slate-200"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between gap-4">
                                                        <h4 className="text-xs font-black uppercase tracking-wider text-indigo-700">Postgraduate Courses</h4>
                                                        <Button
                                                            type="button"
                                                            onClick={() => addCourse("Postgraduate")}
                                                            size="sm"
                                                            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 hover:text-indigo-700 font-bold border border-indigo-200 rounded-lg gap-1"
                                                        >
                                                            <Plus className="w-4 h-4" /> Add Postgraduate Course
                                                        </Button>
                                                    </div>

                                                    {postgraduateCourses.length === 0 ? (
                                                        <div className="p-6 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-medium text-sm">
                                                            No postgraduate courses listed yet.
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-4 max-h-[32vh] overflow-y-auto pr-1">
                                                            {postgraduateCourses.map((course) => {
                                                                const courseIndex = formData.courses.indexOf(course);
                                                                return (
                                                                    <div key={`pg-${courseIndex}`} className="p-4 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-indigo-200 rounded-xl transition-all shadow-[0_2px_6px_rgba(0,0,0,0.01)] flex flex-col gap-3 relative group">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeCourse(courseIndex)}
                                                                            className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 p-1 rounded-md hover:bg-rose-50 transition-all"
                                                                            title="Delete Course"
                                                                        >
                                                                            <Trash className="w-4 h-4" />
                                                                        </button>

                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                                                                            <div className="space-y-1">
                                                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Course Name</label>
                                                                                <Input
                                                                                    placeholder="e.g., M.Sc. Data Science"
                                                                                    value={course.courseName}
                                                                                    onChange={(e) => handleCourseChange(courseIndex, "courseName", e.target.value)}
                                                                                    required
                                                                                    className="h-9 text-xs rounded-lg border-slate-200"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Level</label>
                                                                                <Input value={course.level || "Postgraduate"} disabled className="h-9 text-xs rounded-lg border-slate-200 bg-slate-100 text-slate-500" />
                                                                            </div>
                                                                        </div>

                                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                                                                            <div className="space-y-1">
                                                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Duration</label>
                                                                                <Input
                                                                                    placeholder="e.g., 2 Years"
                                                                                    value={course.duration}
                                                                                    onChange={(e) => handleCourseChange(courseIndex, "duration", e.target.value)}
                                                                                    className="h-9 text-xs rounded-lg border-slate-200"
                                                                                />
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Annual Tuition Fees</label>
                                                                                <Input
                                                                                    placeholder="e.g., £26,500 / Year"
                                                                                    value={course.fees}
                                                                                    onChange={(e) => handleCourseChange(courseIndex, "fees", e.target.value)}
                                                                                    className="h-9 text-xs rounded-lg border-slate-200"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB 5: INTAKES & AWARDS */}
                                    {activeFormTab === "scholarships" && (
                                        <div className="space-y-6 animate-in fade-in duration-200">
                                            {/* Section A: Intakes */}
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center border-b pb-2">
                                                    <div>
                                                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                                            <Calendar className="w-4 h-4 text-blue-500" /> Key Intakes & Deadlines
                                                        </h3>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        onClick={addIntake}
                                                        size="sm"
                                                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold border border-blue-100 rounded-lg gap-1 h-8"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" /> Add Intake
                                                    </Button>
                                                </div>

                                                {formData.intakes.length === 0 ? (
                                                    <div className="p-4 text-center bg-slate-50 border border-slate-100 rounded-xl text-slate-400 text-xs">
                                                        📅 No custom intakes added. Fall and Spring are used as defaults.
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3 max-h-[22vh] overflow-y-auto pr-1">
                                                        {formData.intakes.map((intake, idx) => {
                                                            const intakeStatus = getIntakeStatus(intake);

                                                            return (
                                                                <div key={idx} className="flex gap-3 items-center bg-slate-50 p-3 rounded-lg border border-slate-100 relative group pr-10">
                                                                    <div className="grid grid-cols-2 gap-3 flex-1">
                                                                        <div className="space-y-1">
                                                                            <label className="text-[9px] font-black text-slate-400 uppercase">Intake Term</label>
                                                                            <Input
                                                                                placeholder="e.g., Fall 2026 (August)"
                                                                                value={intake.intakeName}
                                                                                onChange={(e) => handleIntakeChange(idx, "intakeName", e.target.value)}
                                                                                required
                                                                                className="h-8 text-xs rounded-md border-slate-200"
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <label className="text-[9px] font-black text-slate-400 uppercase">Application Deadline</label>
                                                                            <Input
                                                                                type="date"
                                                                                value={intake.applyDeadline}
                                                                                onChange={(e) => handleIntakeChange(idx, "applyDeadline", e.target.value)}
                                                                                required
                                                                                className="h-8 text-xs rounded-md border-slate-200"
                                                                            />
                                                                        </div>
                                                                        <div className="col-span-2 flex items-center justify-between rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-[10px] font-semibold text-slate-600">
                                                                            <span>Public status preview</span>
                                                                            <span className={`rounded-full px-2 py-1 ${intakeStatus === "Closed" ? "bg-slate-100 text-slate-500" : "bg-blue-100 text-blue-700"}`}>
                                                                                {intakeStatus}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeIntake(idx)}
                                                                        className="absolute right-2 text-slate-400 hover:text-rose-500 p-1.5 rounded"
                                                                        title="Remove Intake"
                                                                    >
                                                                        <Trash className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Section B: Scholarships */}
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center border-b pb-2">
                                                    <div>
                                                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                                                            <GraduationCap className="w-4 h-4 text-blue-500" /> Scholarships & Financial Grants
                                                        </h3>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        onClick={addScholarship}
                                                        size="sm"
                                                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold border border-blue-100 rounded-lg gap-1 h-8"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" /> Add Scholarship
                                                    </Button>
                                                </div>

                                                {formData.scholarships.length === 0 ? (
                                                    <div className="p-4 text-center bg-slate-50 border border-slate-100 rounded-xl text-slate-400 text-xs">
                                                        🎓 No custom scholarships added. Standard international bursaries are used as defaults.
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3 max-h-[22vh] overflow-y-auto pr-1">
                                                        {formData.scholarships.map((sch, idx) => (
                                                            <div key={idx} className="flex gap-3 items-center bg-slate-50 p-3 rounded-lg border border-slate-100 relative group pr-10">
                                                                <div className="grid grid-cols-2 gap-3 flex-1">
                                                                    <div className="space-y-1">
                                                                        <label className="text-[9px] font-black text-slate-400 uppercase">Scholarship Title</label>
                                                                        <Input
                                                                            placeholder="e.g., Global High Achievers Award"
                                                                            value={sch.title}
                                                                            onChange={(e) => handleScholarshipChange(idx, "title", e.target.value)}
                                                                            required
                                                                            className="h-8 text-xs rounded-md border-slate-200"
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <label className="text-[9px] font-black text-slate-400 uppercase">Amount / Grant Value</label>
                                                                        <Input
                                                                            placeholder="e.g., Up to 50% tuition reduction"
                                                                            value={sch.amount}
                                                                            onChange={(e) => handleScholarshipChange(idx, "amount", e.target.value)}
                                                                            required
                                                                            className="h-8 text-xs rounded-md border-slate-200"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeScholarship(idx)}
                                                                    className="absolute right-2 text-slate-400 hover:text-rose-500 p-1.5 rounded"
                                                                    title="Remove Scholarship"
                                                                >
                                                                    <Trash className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Area with Navigation */}
                                <div className="flex justify-between items-center bg-slate-50 p-4 border-t border-slate-100 shrink-0">
                                    <div className="flex gap-2">
                                        {activeFormTab !== "basic" && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    const tabs = ["basic", "media", "cost", "courses", "scholarships"];
                                                    const currIdx = tabs.indexOf(activeFormTab);
                                                    setActiveFormTab(tabs[currIdx - 1]);
                                                }}
                                                className="gap-1 rounded-lg border-slate-200 h-10 px-4 text-xs font-semibold text-slate-700"
                                            >
                                                <ArrowLeft className="w-4 h-4" /> Back
                                            </Button>
                                        )}
                                        {activeFormTab !== "scholarships" && (
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    const tabs = ["basic", "media", "cost", "courses", "scholarships"];
                                                    const currIdx = tabs.indexOf(activeFormTab);
                                                    setActiveFormTab(tabs[currIdx + 1]);
                                                }}
                                                className="gap-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white h-10 px-4 text-xs font-semibold"
                                            >
                                                Next <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsDialogOpen(false)}
                                            className="rounded-lg border-slate-200 h-10 text-xs font-semibold"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 text-xs px-6 shadow-md shadow-blue-100"
                                        >
                                            {editingId ? "Update Institution" : "Publish Institution"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search Panel */}
                <div className="mb-6 relative">
                    <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search universities by name or country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-11 rounded-xl border-slate-200 shadow-sm focus:ring-blue-500 bg-white"
                    />
                </div>

                {/* Main Table Panel */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden">
                    {isLoading ? (
                        <div className="p-16 text-center text-slate-400 font-semibold flex flex-col items-center justify-center gap-2">
                            <div className="w-8 h-8 border-3 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                            <span>Loading institution catalog...</span>
                        </div>
                    ) : filteredUniversities.length === 0 ? (
                        <div className="p-16 text-center text-slate-400 font-medium">
                            🏫 No universities registered. Click "Add University" to start cataloging.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="bg-slate-50/70 border-b border-slate-100">
                                <TableRow>
                                    <TableHead className="font-bold text-slate-700 h-12">University Name</TableHead>
                                    <TableHead className="font-bold text-slate-700 h-12">Location</TableHead>
                                    <TableHead className="font-bold text-slate-700 h-12">Global Rank</TableHead>
                                    <TableHead className="font-bold text-slate-700 h-12">Visa Success</TableHead>
                                    <TableHead className="font-bold text-slate-700 h-12 text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUniversities.map((university) => (
                                    <TableRow key={university._id} className="hover:bg-slate-50/50 transition-all border-b border-slate-100">
                                        <TableCell className="font-bold text-slate-900 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg border border-slate-100 bg-white p-1 flex items-center justify-center overflow-hidden shrink-0">
                                                    <img
                                                        src={university.logo || "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&h=200&fit=crop"}
                                                        alt=""
                                                        className="object-contain max-h-full max-w-full"
                                                        onError={(e) => {
                                                            e.target.src = "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&h=200&fit=crop";
                                                        }}
                                                    />
                                                </div>
                                                <div className="truncate max-w-[280px]">
                                                    <p className="truncate text-slate-800">{university.universityName}</p>
                                                    <p className="text-[10px] text-slate-400 truncate">{university.website || "No website link"}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-600 py-4">
                                            <span className="inline-flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                {university.city ? `${university.city}, ` : ""}{university.country}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-slate-600 py-4">
                                            <span className="inline-flex min-w-[88px] h-8 items-center justify-center gap-1 rounded-md border-2 border-blue-700 bg-blue-50 px-2.5 text-xs font-normal text-black">
                                                <Award className="w-3.5 h-3.5 text-blue-600" />
                                                {university.ranking ? `#${String(university.ranking).replace(/\D/g, "")}` : "N/A"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-slate-600 py-4">
                                            <span className="font-semibold text-blue-700 bg-blue-50 border border-blue-100/50 px-2.5 py-0.5 rounded-full text-xs">
                                                {university.visaSuccessRate || "N/A"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-4 text-right">
                                            <div className="flex gap-1.5 justify-end">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEdit(university)}
                                                    className="h-8 w-8 p-0 rounded-md border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                                                    title="Edit Details"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(university.slug)}
                                                    className="h-8 w-8 p-0 rounded-md text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                                                    title="Delete University"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    );
}

