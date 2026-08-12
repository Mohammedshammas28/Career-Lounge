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
    UploadCloud,
    FileCode,
    CheckCircle2,
    AlertCircle
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
    const [availableCourses, setAvailableCourses] = useState([]);

    // Bulk JSON Add state
    const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
    const [bulkJsonText, setBulkJsonText] = useState("");
    const [bulkError, setBulkError] = useState("");
    const [bulkResult, setBulkResult] = useState(null);
    const [isSubmittingBulk, setIsSubmittingBulk] = useState(false);

    const [formData, setFormData] = useState({
        universityName: "",
        category: "Overseas",
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
        coursesOffered: [],
    });

    // Fetch universities and available courses
    useEffect(() => {
        fetchUniversities();
        fetchAvailableCourses();
    }, []);

    const fetchAvailableCourses = async () => {
        try {
            const response = await fetch("/api/courses");
            const result = await response.json();
            if (result.success) {
                setAvailableCourses(result.data);
            }
        } catch (error) {
            console.error("Error fetching available courses:", error);
        }
    };

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

    const handleLoadSampleJson = () => {
        const sampleData = [
            {
                universityName: "Harvard University",
                category: "Overseas",
                country: "United States",
                city: "Cambridge, MA",
                overview: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Established in 1636, it is the oldest institution of higher education in the United States.",
                logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=200&h=200&fit=crop",
                bannerImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&h=1080&fit=crop",
                ranking: "4",
                website: "https://www.harvard.edu",
                studentsEnrolled: "23,000+",
                visaSuccessRate: "97%",
                establishedYear: "1636",
                universityType: "Private Research",
                tuitionFees: {
                    undergraduate: "$54,000 / year",
                    postgraduate: "$52,000 / year"
                },
                accommodation: {
                    available: true,
                    startingPrice: "$12,000 / year"
                },
                languageRequirements: {
                    ielts: "7.5 overall",
                    toefl: "100 overall",
                    pte: "70 overall"
                },
                scholarships: [
                    {
                        title: "Harvard Financial Aid Initiative",
                        amount: "Full need-based scholarship"
                    },
                    {
                        title: "Harvard Presidential Scholarship",
                        amount: "Up to $25,000 / year"
                    }
                ],
                intakes: [
                    {
                        intakeName: "Fall Semester 2026",
                        applyDeadline: "2026-11-01"
                    },
                    {
                        intakeName: "Spring Semester 2027",
                        applyDeadline: "2027-03-15"
                    }
                ],
                courses: [
                    {
                        courseName: "B.Sc. Computer Science",
                        level: "Undergraduate",
                        duration: "4 Years",
                        fees: "$54,000 / year",
                        description: "A comprehensive program covering algorithms, AI, and systems programming."
                    },
                    {
                        courseName: "B.A. Economics",
                        level: "Undergraduate",
                        duration: "4 Years",
                        fees: "$54,000 / year",
                        description: "Study macro and microeconomics, game theory, and econometrics."
                    },
                    {
                        courseName: "B.Sc. Biology",
                        level: "Undergraduate",
                        duration: "4 Years",
                        fees: "$54,000 / year",
                        description: "Explore genetics, cell biology, ecology, and evolutionary biology."
                    },
                    {
                        courseName: "MBA (Master of Business Administration)",
                        level: "Postgraduate",
                        duration: "2 Years",
                        fees: "$52,000 / year",
                        description: "Harvard Business School's flagship MBA program developing global leaders."
                    },
                    {
                        courseName: "M.Sc. Data Science",
                        level: "Postgraduate",
                        duration: "1.5 Years",
                        fees: "$52,000 / year",
                        description: "Advanced data analytics, machine learning, and statistical modelling."
                    },
                    {
                        courseName: "Ph.D. in Computer Science",
                        level: "Postgraduate",
                        duration: "4-6 Years",
                        fees: "Fully Funded",
                        description: "Research-based doctoral program with funding and stipend for top applicants."
                    }
                ],
                coursesOffered: [
                    "Engineering",
                    "Medicine",
                    "Management",
                    "Science",
                    "Law",
                    "Economics"
                ]
            }
        ];
        setBulkJsonText(JSON.stringify(sampleData, null, 2));
        setBulkError("");
        setBulkResult(null);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result;
                if (typeof content === "string") {
                    const parsed = JSON.parse(content);
                    setBulkJsonText(JSON.stringify(parsed, null, 2));
                    setBulkError("");
                }
            } catch (err) {
                setBulkError("Invalid JSON file formatting: " + err.message);
            }
        };
        reader.readAsText(file);
    };

    const handleBulkSubmit = async (e) => {
        e.preventDefault();
        setBulkError("");
        setBulkResult(null);

        if (!bulkJsonText.trim()) {
            setBulkError("Please paste or upload a JSON array of universities.");
            return;
        }

        let parsedData;
        try {
            parsedData = JSON.parse(bulkJsonText);
        } catch (err) {
            setBulkError("JSON Syntax Error: " + err.message);
            return;
        }

        if (!Array.isArray(parsedData)) {
            setBulkError("Invalid JSON format: The root element must be an Array `[...]` of university objects.");
            return;
        }

        if (parsedData.length === 0) {
            setBulkError("JSON array is empty. Please provide at least one university object.");
            return;
        }

        try {
            setIsSubmittingBulk(true);
            const response = await fetch("/api/universities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedData),
            });

            const result = await response.json();
            if (result.success) {
                setBulkResult({
                    inserted: result.inserted || [],
                    skipped: result.skipped || [],
                    errors: result.errors || [],
                });
                fetchUniversities();
            } else {
                setBulkError("Server Error: " + (result.error || "Failed to process bulk upload."));
            }
        } catch (err) {
            console.error("Bulk upload error:", err);
            setBulkError("Network error sending bulk data.");
        } finally {
            setIsSubmittingBulk(false);
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
        return (
            level.includes("post") ||
            level.includes("master") ||
            level.includes("mba") ||
            level.includes("msc") ||
            level.includes("phd") ||
            level.includes("doctor") ||
            level.includes("pg")
        );
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
            coursesOffered: university.coursesOffered || [],
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
            coursesOffered: [],
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

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Bulk Add (JSON) Dialog */}
                        <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setBulkError("");
                                        setBulkResult(null);
                                    }}
                                    className="border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl gap-2 h-11 shadow-sm"
                                >
                                    <FileCode className="w-5 h-5 text-blue-600" /> Bulk Add (JSON)
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl w-[90vw] max-h-[85vh] flex flex-col p-0 overflow-hidden bg-white shadow-2xl rounded-2xl border-none">
                                <DialogHeader className="p-6 bg-slate-900 text-white relative">
                                    <DialogTitle className="text-xl font-bold tracking-wide flex items-center gap-2">
                                        <FileCode className="w-5 h-5 text-blue-400" /> Bulk Add Universities via JSON
                                    </DialogTitle>
                                    <p className="text-xs text-slate-300 mt-1">
                                        Paste a JSON array or upload a .json file containing multiple university objects to import them in batch.
                                    </p>
                                </DialogHeader>

                                <div className="p-6 overflow-y-auto space-y-4 flex-1">
                                    {/* Actions & File Upload */}
                                    <div className="flex flex-wrap justify-between items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <input
                                                type="file"
                                                accept=".json,application/json"
                                                id="bulk-json-file"
                                                className="hidden"
                                                onChange={handleFileUpload}
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="outline"
                                                onClick={() => document.getElementById("bulk-json-file")?.click()}
                                                className="bg-white hover:bg-slate-100 text-xs font-semibold gap-1.5 border-slate-200"
                                            >
                                                <UploadCloud className="w-4 h-4 text-blue-600" /> Upload .JSON File
                                            </Button>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="ghost"
                                                onClick={handleLoadSampleJson}
                                                className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold"
                                            >
                                                Load Sample Format
                                            </Button>
                                        </div>
                                        {bulkJsonText && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setBulkJsonText("");
                                                    setBulkError("");
                                                    setBulkResult(null);
                                                }}
                                                className="text-xs text-slate-400 hover:text-rose-500 font-medium"
                                            >
                                                Clear Text
                                            </button>
                                        )}
                                    </div>

                                    {/* Textarea */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700 flex justify-between items-center">
                                            <span>JSON Array Input</span>
                                            <span className="text-[10px] text-slate-400 font-normal">Must be formatted as a valid JSON array `[...]`</span>
                                        </label>
                                        <Textarea
                                            rows={10}
                                            placeholder='[\n  {\n    "universityName": "University Name",\n    "category": "Overseas",\n    "country": "Country Name",\n    "ranking": "15"\n  }\n]'
                                            value={bulkJsonText}
                                            onChange={(e) => {
                                                setBulkJsonText(e.target.value);
                                                setBulkError("");
                                            }}
                                            className="font-mono text-xs leading-relaxed border-slate-200 focus:ring-blue-500 bg-slate-900 text-slate-100 p-4 rounded-xl shadow-inner min-h-[220px]"
                                        />
                                    </div>

                                    {/* Error Banner */}
                                    {bulkError && (
                                        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium flex items-start gap-2 animate-in fade-in">
                                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                            <div>{bulkError}</div>
                                        </div>
                                    )}

                                    {/* Result Summary Card */}
                                    {bulkResult && (
                                        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-2 animate-in fade-in">
                                            <div className="font-bold text-emerald-800 flex items-center gap-1.5 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Import Complete
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 text-center pt-1">
                                                <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-sm">
                                                    <span className="text-lg font-black text-emerald-600 block">{bulkResult.inserted.length}</span>
                                                    <span className="text-[10px] uppercase font-bold text-slate-500">Inserted</span>
                                                </div>
                                                <div className="bg-white p-2.5 rounded-lg border border-amber-100 shadow-sm">
                                                    <span className="text-lg font-black text-amber-600 block">{bulkResult.skipped.length}</span>
                                                    <span className="text-[10px] uppercase font-bold text-slate-500">Skipped (Duplicates)</span>
                                                </div>
                                                <div className="bg-white p-2.5 rounded-lg border border-rose-100 shadow-sm">
                                                    <span className="text-lg font-black text-rose-600 block">{bulkResult.errors.length}</span>
                                                    <span className="text-[10px] uppercase font-bold text-slate-500">Errors</span>
                                                </div>
                                            </div>

                                            {bulkResult.skipped.length > 0 && (
                                                <p className="text-[11px] text-amber-800 pt-1">
                                                    <strong>Skipped:</strong> {bulkResult.skipped.join(", ")}
                                                </p>
                                            )}
                                            {bulkResult.errors.length > 0 && (
                                                <div className="text-[11px] text-rose-800 pt-1">
                                                    <strong>Failures:</strong>
                                                    <ul className="list-disc pl-4 mt-0.5 space-y-0.5">
                                                        {bulkResult.errors.map((e, idx) => (
                                                            <li key={idx}>{e.name || "Item"}: {e.error}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Footer Buttons */}
                                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsBulkDialogOpen(false)}
                                        className="rounded-xl border-slate-200"
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handleBulkSubmit}
                                        disabled={isSubmittingBulk || !bulkJsonText.trim()}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl gap-2 shadow-md shadow-blue-100"
                                    >
                                        {isSubmittingBulk ? "Processing Batch..." : "Import Universities"}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* Existing Single Add University Dialog */}
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    onClick={() => resetForm()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-100 rounded-xl gap-2 h-11"
                                >
                                    <Plus className="w-5 h-5" /> Add University
                                </Button>
                            </DialogTrigger>
                        <DialogContent className="max-w-5xl w-[95vw] h-[92vh] sm:h-[88vh] flex flex-col p-0 overflow-hidden bg-white shadow-2xl rounded-2xl border-none">
                            {/* Header Banner */}
                            <DialogHeader className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shrink-0 relative border-b border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <DialogTitle className="text-xl font-bold tracking-tight flex items-center gap-2 text-white">
                                            <Sparkles className="w-5 h-5 text-blue-400" />
                                            {editingId ? "Edit University Profile" : "Add New University"}
                                        </DialogTitle>
                                        <p className="text-xs text-slate-300 mt-1">
                                            Follow the simple steps below to publish a university to the portal catalog.
                                        </p>
                                    </div>
                                    <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300">
                                        <span>Step {
                                            ["basic", "media", "cost", "courses", "scholarships"].indexOf(activeFormTab) + 1
                                        } of 5</span>
                                    </div>
                                </div>
                            </DialogHeader>

                            {/* Stepper Navigation */}
                            <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-2.5 shrink-0 overflow-x-auto scrollbar-none">
                                <div className="flex items-center justify-between min-w-[600px] gap-2">
                                    {[
                                        { id: "basic", step: 1, label: "1. Basic Info", icon: Building2 },
                                        { id: "media", step: 2, label: "2. Media & Bio", icon: Globe },
                                        { id: "cost", step: 3, label: "3. Fees & Entry", icon: DollarSign },
                                        { id: "courses", step: 4, label: "4. Courses", icon: BookOpen },
                                        { id: "scholarships", step: 5, label: "5. Intakes & Awards", icon: GraduationCap },
                                    ].map((tab, idx) => {
                                        const Icon = tab.icon;
                                        const tabsList = ["basic", "media", "cost", "courses", "scholarships"];
                                        const currentIdx = tabsList.indexOf(activeFormTab);
                                        const isCurrent = activeFormTab === tab.id;
                                        const isCompleted = currentIdx > idx;

                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                onClick={() => setActiveFormTab(tab.id)}
                                                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                                                    isCurrent
                                                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                                                        : isCompleted
                                                        ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100/60"
                                                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100/80 hover:text-slate-900"
                                                }`}
                                            >
                                                {isCompleted ? (
                                                    <Check className="w-3.5 h-3.5 text-blue-600" />
                                                ) : (
                                                    <Icon className="w-3.5 h-3.5" />
                                                )}
                                                <span>{tab.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Main Form Body */}
                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden bg-slate-50/30">
                                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                                    
                                    {/* STEP 1: BASIC INFO */}
                                    {activeFormTab === "basic" && (
                                        <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
                                            <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-2xl flex items-start gap-3">
                                                <div className="p-2 bg-blue-600 text-white rounded-xl shrink-0 mt-0.5">
                                                    <Building2 className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-900">Step 1: General University Identity</h3>
                                                    <p className="text-xs text-slate-600 mt-0.5">
                                                        Enter the official institution name, location, ranking, and website link.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                                                        University Name <span className="text-rose-500 font-bold">*</span>
                                                    </label>
                                                    <Input
                                                        name="universityName"
                                                        placeholder="e.g. University of Oxford or Harvard University"
                                                        value={formData.universityName}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="h-11 rounded-xl border-slate-200 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Category</label>
                                                        <select
                                                            name="category"
                                                            value={formData.category}
                                                            onChange={handleInputChange}
                                                            className="w-full h-11 px-3 text-sm rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                                        >
                                                            <option value="Overseas">Overseas (International)</option>
                                                            <option value="Domestic">Domestic (India)</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Country</label>
                                                        <Input
                                                            name="country"
                                                            placeholder="e.g. United Kingdom"
                                                            value={formData.country}
                                                            onChange={handleInputChange}
                                                            className="h-11 rounded-xl border-slate-200 text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">City / Campus</label>
                                                        <Input
                                                            name="city"
                                                            placeholder="e.g. London or Oxford"
                                                            value={formData.city}
                                                            onChange={handleInputChange}
                                                            className="h-11 rounded-xl border-slate-200 text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">University Type</label>
                                                        <Input
                                                            name="universityType"
                                                            placeholder="e.g. Public Research University"
                                                            value={formData.universityType}
                                                            onChange={handleInputChange}
                                                            className="h-11 rounded-xl border-slate-200 text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Established Year</label>
                                                        <Input
                                                            name="establishedYear"
                                                            placeholder="e.g. 1895"
                                                            value={formData.establishedYear}
                                                            onChange={handleInputChange}
                                                            className="h-11 rounded-xl border-slate-200 text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">QS / World Rank</label>
                                                        <Input
                                                            name="ranking"
                                                            placeholder="e.g. #25 Worldwide"
                                                            value={formData.ranking}
                                                            onChange={handleInputChange}
                                                            className="h-11 rounded-xl border-slate-200 text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Official Website Link</label>
                                                        <Input
                                                            name="website"
                                                            placeholder="https://www.university.edu"
                                                            value={formData.website}
                                                            onChange={handleInputChange}
                                                            className="h-11 rounded-xl border-slate-200 text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Course Tags / Categories */}
                                                <div className="space-y-2 pt-2 border-t border-slate-100">
                                                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                                                        Courses / Discipline Tags
                                                    </label>
                                                    <p className="text-xs text-slate-500 mb-2">
                                                        Select or type key academic subjects offered (used for website filter tags).
                                                    </p>
                                                    
                                                    <div className="flex flex-wrap gap-2 p-3 min-h-[48px] rounded-xl border border-slate-200 bg-slate-50/50">
                                                        {(formData.coursesOffered || []).map((course, i) => (
                                                            <span key={i} className="inline-flex items-center gap-1.5 bg-blue-600 text-white rounded-lg px-3 py-1 text-xs font-semibold shadow-sm">
                                                                {course}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setFormData((prev) => ({ ...prev, coursesOffered: prev.coursesOffered.filter((_, ci) => ci !== i) }))}
                                                                    className="hover:text-rose-200 transition-colors ml-1 font-bold"
                                                                >✕</button>
                                                            </span>
                                                        ))}
                                                        <input
                                                            type="text"
                                                            placeholder={formData.coursesOffered?.length > 0 ? "Type and press Enter..." : "Type subject (e.g. Business, Engineering) and press Enter"}
                                                            className="flex-1 min-w-[200px] outline-none text-xs text-slate-800 placeholder:text-slate-400 bg-transparent py-1"
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter" || e.key === ",") {
                                                                    e.preventDefault();
                                                                    const val = e.currentTarget.value.trim();
                                                                    if (val && !(formData.coursesOffered || []).includes(val)) {
                                                                        setFormData((prev) => ({ ...prev, coursesOffered: [...(prev.coursesOffered || []), val] }));
                                                                    }
                                                                    e.currentTarget.value = "";
                                                                }
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Database courses quick selector */}
                                                    {availableCourses.length > 0 && (
                                                        <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                                                            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
                                                                Quick Select Popular Majors:
                                                            </span>
                                                            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                                                                {availableCourses.map((c) => {
                                                                    const isSelected = (formData.coursesOffered || []).includes(c.courseName);
                                                                    return (
                                                                        <button
                                                                            key={c._id}
                                                                            type="button"
                                                                            onClick={() => {
                                                                                if (isSelected) {
                                                                                    setFormData(prev => ({
                                                                                        ...prev,
                                                                                        coursesOffered: prev.coursesOffered.filter(item => item !== c.courseName)
                                                                                    }));
                                                                                } else {
                                                                                    setFormData(prev => ({
                                                                                        ...prev,
                                                                                        coursesOffered: [...(prev.coursesOffered || []), c.courseName]
                                                                                    }));
                                                                                }
                                                                            }}
                                                                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                                                                                isSelected
                                                                                    ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                                                                                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                                                                            }`}
                                                                        >
                                                                            {isSelected ? "✓ " : "+ "}{c.courseName}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 2: MEDIA & BIO */}
                                    {activeFormTab === "media" && (
                                        <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
                                            <div className="bg-purple-50/60 border border-purple-100 p-4 rounded-2xl flex items-start gap-3">
                                                <div className="p-2 bg-purple-600 text-white rounded-xl shrink-0 mt-0.5">
                                                    <Globe className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-900">Step 2: Media & Overview Description</h3>
                                                    <p className="text-xs text-slate-600 mt-0.5">
                                                        Upload logo, campus cover photo, and write an overview of the university.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Logo Upload Box */}
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">University Logo</label>
                                                            <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-bold">Square Image</span>
                                                        </div>
                                                        <input
                                                            id="university-logo-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => uploadImageForField(e.target.files?.[0], "logo")}
                                                        />
                                                        <div
                                                            className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition-colors p-5 text-center cursor-pointer"
                                                            onClick={() => document.getElementById("university-logo-upload")?.click()}
                                                            onDragOver={(e) => e.preventDefault()}
                                                            onDrop={(e) => {
                                                                e.preventDefault();
                                                                uploadImageForField(e.dataTransfer.files?.[0], "logo");
                                                            }}
                                                        >
                                                            <UploadCloud className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                                            <p className="text-xs font-semibold text-slate-700 mb-1">
                                                                {uploading.logo ? "Uploading Logo..." : "Click or Drag logo here"}
                                                            </p>
                                                            <p className="text-[11px] text-slate-400">PNG, JPG, WEBP (Max 5MB)</p>
                                                        </div>
                                                        {formData.logo && (
                                                            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2 flex items-center justify-between">
                                                                <img src={formData.logo} alt="Logo Preview" className="h-16 w-auto object-contain mx-auto" />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setFormData(prev => ({ ...prev, logo: "" }))}
                                                                    className="text-xs text-rose-500 font-bold bg-white p-1 rounded-md border shadow-sm hover:bg-rose-50"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Cover Photo Box */}
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Campus Cover Photo</label>
                                                            <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full font-bold">Landscape Banner</span>
                                                        </div>
                                                        <input
                                                            id="university-banner-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => uploadImageForField(e.target.files?.[0], "bannerImage")}
                                                        />
                                                        <div
                                                            className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition-colors p-5 text-center cursor-pointer"
                                                            onClick={() => document.getElementById("university-banner-upload")?.click()}
                                                            onDragOver={(e) => e.preventDefault()}
                                                            onDrop={(e) => {
                                                                e.preventDefault();
                                                                uploadImageForField(e.dataTransfer.files?.[0], "bannerImage");
                                                            }}
                                                        >
                                                            <UploadCloud className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                                            <p className="text-xs font-semibold text-slate-700 mb-1">
                                                                {uploading.bannerImage ? "Uploading Cover..." : "Click or Drag cover image"}
                                                            </p>
                                                            <p className="text-[11px] text-slate-400">High Resolution Campus Photo</p>
                                                        </div>
                                                        {formData.bannerImage && (
                                                            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2 flex items-center justify-between">
                                                                <img src={formData.bannerImage} alt="Banner Preview" className="h-16 w-full object-cover rounded-lg" />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setFormData(prev => ({ ...prev, bannerImage: "" }))}
                                                                    className="text-xs text-rose-500 font-bold bg-white p-1 rounded-md border shadow-sm hover:bg-rose-50 ml-2"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {uploadError && (
                                                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-600">
                                                        ⚠️ {uploadError}
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Total Enrolled Students</label>
                                                        <Input
                                                            name="studentsEnrolled"
                                                            placeholder="e.g. 25,000+ Active Students"
                                                            value={formData.studentsEnrolled}
                                                            onChange={handleInputChange}
                                                            className="h-11 rounded-xl border-slate-200 text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Visa Success Rate</label>
                                                        <Input
                                                            name="visaSuccessRate"
                                                            placeholder="e.g. 98% Visa Success"
                                                            value={formData.visaSuccessRate}
                                                            onChange={handleInputChange}
                                                            className="h-11 rounded-xl border-slate-200 text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                                                        Detailed University Overview & Highlights
                                                    </label>
                                                    <Textarea
                                                        name="overview"
                                                        placeholder="Write a clear overview introducing the university, campus life, research reputation, and key student benefits..."
                                                        value={formData.overview}
                                                        onChange={handleInputChange}
                                                        rows={5}
                                                        className="rounded-xl border-slate-200 text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 3: COSTS & ADMISSIONS */}
                                    {activeFormTab === "cost" && (
                                        <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
                                            <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl flex items-start gap-3">
                                                <div className="p-2 bg-emerald-600 text-white rounded-xl shrink-0 mt-0.5">
                                                    <DollarSign className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-900">Step 3: Tuition Fees, Housing & Entry Scores</h3>
                                                    <p className="text-xs text-slate-600 mt-0.5">
                                                        Provide annual tuition ranges, housing information, and English score benchmarks.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Tuition Fees */}
                                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                                                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b pb-3">
                                                    <DollarSign className="w-4 h-4 text-emerald-600" /> Annual Tuition Fees
                                                </h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-700">Undergraduate Tuition</label>
                                                        <Input
                                                            placeholder="e.g. £18,000 - £25,000 / Year"
                                                            value={formData.tuitionFees?.undergraduate}
                                                            onChange={(e) => handleNestedChange("tuitionFees", "undergraduate", e.target.value)}
                                                            className="h-11 rounded-xl border-slate-200 text-sm"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold text-slate-700">Postgraduate Tuition</label>
                                                        <Input
                                                            placeholder="e.g. £20,000 - £28,000 / Year"
                                                            value={formData.tuitionFees?.postgraduate}
                                                            onChange={(e) => handleNestedChange("tuitionFees", "postgraduate", e.target.value)}
                                                            className="h-11 rounded-xl border-slate-200 text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Accommodation */}
                                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3 mt-4">
                                                    <div className="flex items-center justify-between">
                                                        <label htmlFor="accAvail" className="text-xs font-bold text-slate-800 cursor-pointer flex items-center gap-2 select-none">
                                                            <input
                                                                type="checkbox"
                                                                id="accAvail"
                                                                checked={formData.accommodation?.available}
                                                                onChange={(e) => handleNestedChange("accommodation", "available", e.target.checked)}
                                                                className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
                                                            />
                                                            On-Campus Student Housing Available
                                                        </label>
                                                        <span className="text-[10px] font-bold uppercase text-slate-500">
                                                            {formData.accommodation?.available ? "Enabled" : "Disabled"}
                                                        </span>
                                                    </div>
                                                    {formData.accommodation?.available && (
                                                        <div className="pt-2">
                                                            <label className="text-xs font-bold text-slate-700 block mb-1">Starting Housing Cost</label>
                                                            <Input
                                                                placeholder="e.g. From £150 / Week or $800 / Month"
                                                                value={formData.accommodation?.startingPrice}
                                                                onChange={(e) => handleNestedChange("accommodation", "startingPrice", e.target.value)}
                                                                className="h-11 rounded-xl border-slate-200 text-sm bg-white"
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* English Requirements */}
                                                <div className="pt-4 border-t border-slate-100 space-y-4">
                                                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                                        <GraduationCap className="w-4 h-4 text-emerald-600" /> Minimum English Proficiency Benchmarks
                                                    </h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold text-slate-700">IELTS Score</label>
                                                            <Input
                                                                placeholder="e.g. 6.5 (min 6.0 in each band)"
                                                                value={formData.languageRequirements?.ielts}
                                                                onChange={(e) => handleNestedChange("languageRequirements", "ielts", e.target.value)}
                                                                className="h-11 rounded-xl border-slate-200 text-sm"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold text-slate-700">TOEFL iBT</label>
                                                            <Input
                                                                placeholder="e.g. 88+ Overall"
                                                                value={formData.languageRequirements?.toefl}
                                                                onChange={(e) => handleNestedChange("languageRequirements", "toefl", e.target.value)}
                                                                className="h-11 rounded-xl border-slate-200 text-sm"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold text-slate-700">PTE Academic</label>
                                                            <Input
                                                                placeholder="e.g. 62+ Overall"
                                                                value={formData.languageRequirements?.pte}
                                                                onChange={(e) => handleNestedChange("languageRequirements", "pte", e.target.value)}
                                                                className="h-11 rounded-xl border-slate-200 text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 4: COURSES PORTFOLIO */}
                                    {activeFormTab === "courses" && (
                                        <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
                                            <div className="bg-indigo-50/60 border border-indigo-100 p-4 rounded-2xl flex items-start gap-3">
                                                <div className="p-2 bg-indigo-600 text-white rounded-xl shrink-0 mt-0.5">
                                                    <BookOpen className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-900">Step 4: Academic Degree Courses Offered</h3>
                                                    <p className="text-xs text-slate-600 mt-0.5">
                                                        Add specific bachelor's and master's degree programs to display on the university detail page.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Undergraduate Section */}
                                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider">
                                                            Undergraduate Degree Programs ({undergraduateCourses.length})
                                                        </h4>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        onClick={() => addCourse("Undergraduate")}
                                                        size="sm"
                                                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl font-bold gap-1.5 h-9"
                                                    >
                                                        <Plus className="w-4 h-4" /> Add Undergraduate Course
                                                    </Button>
                                                </div>

                                                {undergraduateCourses.length === 0 ? (
                                                    <div className="p-6 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                                                        No undergraduate courses added yet. Click "+ Add Undergraduate Course" above.
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        {undergraduateCourses.map((course) => {
                                                            const courseIndex = formData.courses.indexOf(course);
                                                            return (
                                                                <div key={`ug-${courseIndex}`} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3 relative group">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeCourse(courseIndex)}
                                                                        className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                                                                        title="Delete Course"
                                                                    >
                                                                        <Trash className="w-4 h-4" />
                                                                    </button>

                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                                                        <div className="space-y-1">
                                                                            <label className="text-[11px] font-bold text-slate-700 uppercase">Course Title *</label>
                                                                            <Input
                                                                                placeholder="e.g. B.Sc. Computer Science"
                                                                                value={course.courseName}
                                                                                onChange={(e) => handleCourseChange(courseIndex, "courseName", e.target.value)}
                                                                                required
                                                                                className="h-10 text-xs rounded-xl bg-white border-slate-200"
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <label className="text-[11px] font-bold text-slate-700 uppercase">Degree Level</label>
                                                                            <Input value="Undergraduate" disabled className="h-10 text-xs rounded-xl bg-slate-100 text-slate-500 font-semibold" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                                                        <div className="space-y-1">
                                                                            <label className="text-[11px] font-bold text-slate-700 uppercase">Duration</label>
                                                                            <Input
                                                                                placeholder="e.g. 3 Years (Full Time)"
                                                                                value={course.duration}
                                                                                onChange={(e) => handleCourseChange(courseIndex, "duration", e.target.value)}
                                                                                className="h-10 text-xs rounded-xl bg-white border-slate-200"
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <label className="text-[11px] font-bold text-slate-700 uppercase">Annual Tuition Fee</label>
                                                                            <Input
                                                                                placeholder="e.g. £24,000 / Year"
                                                                                value={course.fees}
                                                                                onChange={(e) => handleCourseChange(courseIndex, "fees", e.target.value)}
                                                                                className="h-10 text-xs rounded-xl bg-white border-slate-200"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Postgraduate Section */}
                                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider">
                                                            Postgraduate Degree Programs ({postgraduateCourses.length})
                                                        </h4>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        onClick={() => addCourse("Postgraduate")}
                                                        size="sm"
                                                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl font-bold gap-1.5 h-9"
                                                    >
                                                        <Plus className="w-4 h-4" /> Add Postgraduate Course
                                                    </Button>
                                                </div>

                                                {postgraduateCourses.length === 0 ? (
                                                    <div className="p-6 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                                                        No postgraduate courses added yet. Click "+ Add Postgraduate Course" above.
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        {postgraduateCourses.map((course) => {
                                                            const courseIndex = formData.courses.indexOf(course);
                                                            return (
                                                                <div key={`pg-${courseIndex}`} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3 relative group">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeCourse(courseIndex)}
                                                                        className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                                                                        title="Delete Course"
                                                                    >
                                                                        <Trash className="w-4 h-4" />
                                                                    </button>

                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                                                        <div className="space-y-1">
                                                                            <label className="text-[11px] font-bold text-slate-700 uppercase">Course Title *</label>
                                                                            <Input
                                                                                placeholder="e.g. M.Sc. Artificial Intelligence"
                                                                                value={course.courseName}
                                                                                onChange={(e) => handleCourseChange(courseIndex, "courseName", e.target.value)}
                                                                                required
                                                                                className="h-10 text-xs rounded-xl bg-white border-slate-200"
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <label className="text-[11px] font-bold text-slate-700 uppercase">Degree Level</label>
                                                                            <Input value="Postgraduate" disabled className="h-10 text-xs rounded-xl bg-slate-100 text-slate-500 font-semibold" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-10">
                                                                        <div className="space-y-1">
                                                                            <label className="text-[11px] font-bold text-slate-700 uppercase">Duration</label>
                                                                            <Input
                                                                                placeholder="e.g. 1 Year (Full Time)"
                                                                                value={course.duration}
                                                                                onChange={(e) => handleCourseChange(courseIndex, "duration", e.target.value)}
                                                                                className="h-10 text-xs rounded-xl bg-white border-slate-200"
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <label className="text-[11px] font-bold text-slate-700 uppercase">Annual Tuition Fee</label>
                                                                            <Input
                                                                                placeholder="e.g. £27,500 / Year"
                                                                                value={course.fees}
                                                                                onChange={(e) => handleCourseChange(courseIndex, "fees", e.target.value)}
                                                                                className="h-10 text-xs rounded-xl bg-white border-slate-200"
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
                                    )}

                                    {/* STEP 5: INTAKES & SCHOLARSHIPS */}
                                    {activeFormTab === "scholarships" && (
                                        <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
                                            <div className="bg-amber-50/60 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
                                                <div className="p-2 bg-amber-600 text-white rounded-xl shrink-0 mt-0.5">
                                                    <GraduationCap className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-900">Step 5: Application Intakes & Scholarships</h3>
                                                    <p className="text-xs text-slate-600 mt-0.5">
                                                        Set key admission intake deadlines and available international financial aid awards.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Key Intakes */}
                                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                                                <div className="flex items-center justify-between border-b pb-3">
                                                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-amber-600" /> Key Intakes & Deadlines
                                                    </h4>
                                                    <Button
                                                        type="button"
                                                        onClick={addIntake}
                                                        size="sm"
                                                        className="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl font-bold gap-1.5 h-8 text-xs"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" /> Add Intake
                                                    </Button>
                                                </div>

                                                {formData.intakes.length === 0 ? (
                                                    <div className="p-4 text-center bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-xs">
                                                        📅 Standard Fall (Sept) & Spring (Jan) intakes will be displayed by default.
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3">
                                                        {formData.intakes.map((intake, idx) => {
                                                            const intakeStatus = getIntakeStatus(intake);
                                                            return (
                                                                <div key={idx} className="flex gap-3 items-center bg-slate-50 p-3.5 rounded-xl border border-slate-200 relative group">
                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 pr-8">
                                                                        <div className="space-y-1">
                                                                            <label className="text-[11px] font-bold text-slate-700 uppercase">Intake Term</label>
                                                                            <Input
                                                                                placeholder="e.g. Fall 2026 (September)"
                                                                                value={intake.intakeName}
                                                                                onChange={(e) => handleIntakeChange(idx, "intakeName", e.target.value)}
                                                                                required
                                                                                className="h-10 text-xs rounded-xl bg-white border-slate-200"
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-1">
                                                                            <label className="text-[11px] font-bold text-slate-700 uppercase">Application Deadline</label>
                                                                            <Input
                                                                                type="date"
                                                                                value={intake.applyDeadline}
                                                                                onChange={(e) => handleIntakeChange(idx, "applyDeadline", e.target.value)}
                                                                                required
                                                                                className="h-10 text-xs rounded-xl bg-white border-slate-200"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeIntake(idx)}
                                                                        className="absolute right-3 text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                                                                        title="Remove Intake"
                                                                    >
                                                                        <Trash className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Scholarships */}
                                            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                                                <div className="flex items-center justify-between border-b pb-3">
                                                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                                        <GraduationCap className="w-4 h-4 text-amber-600" /> Scholarships & Grants
                                                    </h4>
                                                    <Button
                                                        type="button"
                                                        onClick={addScholarship}
                                                        size="sm"
                                                        className="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl font-bold gap-1.5 h-8 text-xs"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" /> Add Scholarship
                                                    </Button>
                                                </div>

                                                {formData.scholarships.length === 0 ? (
                                                    <div className="p-4 text-center bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-xs">
                                                        🎓 Standard merit-based international scholarships will be shown as defaults.
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3">
                                                        {formData.scholarships.map((sch, idx) => (
                                                            <div key={idx} className="flex gap-3 items-center bg-slate-50 p-3.5 rounded-xl border border-slate-200 relative group">
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 pr-8">
                                                                    <div className="space-y-1">
                                                                        <label className="text-[11px] font-bold text-slate-700 uppercase">Scholarship Name</label>
                                                                        <Input
                                                                            placeholder="e.g. Global Merit Excellence Award"
                                                                            value={sch.title}
                                                                            onChange={(e) => handleScholarshipChange(idx, "title", e.target.value)}
                                                                            required
                                                                            className="h-10 text-xs rounded-xl bg-white border-slate-200"
                                                                        />
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        <label className="text-[11px] font-bold text-slate-700 uppercase">Grant Amount / Benefit</label>
                                                                        <Input
                                                                            placeholder="e.g. Up to £5,000 Tuition Discount"
                                                                            value={sch.amount}
                                                                            onChange={(e) => handleScholarshipChange(idx, "amount", e.target.value)}
                                                                            required
                                                                            className="h-10 text-xs rounded-xl bg-white border-slate-200"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeScholarship(idx)}
                                                                    className="absolute right-3 text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                                                                    title="Remove Scholarship"
                                                                >
                                                                    <Trash className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                </div>

                                {/* Footer Action Controls */}
                                <div className="bg-white px-6 py-4 border-t border-slate-200 shrink-0 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsDialogOpen(false)}
                                            className="rounded-xl border-slate-200 h-11 px-5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                                        >
                                            Cancel
                                        </Button>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Back Button */}
                                        {activeFormTab !== "basic" && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    const tabs = ["basic", "media", "cost", "courses", "scholarships"];
                                                    const currIdx = tabs.indexOf(activeFormTab);
                                                    setActiveFormTab(tabs[currIdx - 1]);
                                                }}
                                                className="rounded-xl border-slate-200 h-11 px-4 text-xs font-semibold text-slate-700 gap-1.5"
                                            >
                                                <ArrowLeft className="w-4 h-4" /> Previous
                                            </Button>
                                        )}

                                        {/* Quick Save Option */}
                                        <Button
                                            type="submit"
                                            variant="outline"
                                            className="hidden sm:inline-flex rounded-xl border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 h-11 px-5 text-xs font-bold"
                                        >
                                            {editingId ? "Save Changes" : "Save Draft"}
                                        </Button>

                                        {/* Next / Final Submit Button */}
                                        {activeFormTab !== "scholarships" ? (
                                            <Button
                                                type="button"
                                                onClick={() => {
                                                    const tabs = ["basic", "media", "cost", "courses", "scholarships"];
                                                    const currIdx = tabs.indexOf(activeFormTab);
                                                    setActiveFormTab(tabs[currIdx + 1]);
                                                }}
                                                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 text-xs gap-2 shadow-md shadow-blue-500/20"
                                            >
                                                Next Step <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 text-xs gap-2 shadow-lg shadow-blue-500/25"
                                            >
                                                <Check className="w-4 h-4" />
                                                {editingId ? "Update University" : "Publish Institution"}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                    </div>
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

