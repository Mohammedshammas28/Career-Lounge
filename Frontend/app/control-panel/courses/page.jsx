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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Edit2, Trash2, CheckCircle, Circle, UploadCloud, ArrowLeft, ArrowRight, Check, BookOpen, Clock, ChevronDown, FileText, CheckCircle2, AlertCircle, Loader2, Search, Sparkles, GraduationCap } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function CoursesAdminPage() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [activeFormTab, setActiveFormTab] = useState("general");
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [uploadError, setUploadError] = useState("");

    // Bulk JSON Import States
    const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
    const [bulkJsonText, setBulkJsonText] = useState("");
    const [isSubmittingBulk, setIsSubmittingBulk] = useState(false);
    const [bulkError, setBulkError] = useState("");
    const [bulkResult, setBulkResult] = useState(null);

    // Sub-courses state
    const [subCourses, setSubCourses] = useState([]);
    const [subCourseEditIndex, setSubCourseEditIndex] = useState(null);
    const [newSubCourse, setNewSubCourse] = useState({
        name: "",
        duration: "",
        fees: "",
        overview: "",
        careerOutcomes: ""
    });

    const [formData, setFormData] = useState({
        courseName: "",
        description: "",
        image: "",
        duration: "",
        fees: "",
        category: "Undergraduate",
        overview: "",
        requirements: "",
        opportunities: "",
        subjectsInput: "", // Comma-separated string for easy input, converted to array on save
        status: true,
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/courses?all=true&t=${Date.now()}`, { cache: "no-store" });
            const result = await response.json();
            if (result.success) {
                setCourses(result.data);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadSampleJson = () => {
        const sampleData = [
            {
                courseName: "Data Science & AI",
                description: "Machine learning, neural networks, data analysis, and predictive modeling.",
                image: "https://picsum.photos/seed/data-science/800/480",
                duration: "3 Years",
                fees: "$14,000 / Year",
                category: "Undergraduate",
                overview: "Comprehensive program covering python, algorithms, statistical models, and deep learning.",
                requirements: "High school diploma with Mathematics and Computer Science background.",
                opportunities: "Data Scientist, AI Engineer, Machine Learning Specialist, Data Architect.",
                subjects: ["Python Programming", "Machine Learning", "Neural Networks", "Big Data Analytics", "Statistics"],
                subCourses: [
                    {
                        name: "B.Sc. in Machine Learning",
                        duration: "3 Years",
                        fees: "$14,000 / Year",
                        overview: "Specialization in deep learning architectures, natural language processing, and computer vision.",
                        careerOutcomes: "AI Engineer, Computer Vision Specialist"
                    }
                ],
                status: true
            },
            {
                courseName: "Cyber Security & Networks",
                description: "Ethical hacking, network defense, cryptography, and cloud security.",
                image: "https://picsum.photos/seed/cyber-sec/800/480",
                duration: "3-4 Years",
                fees: "$13,500 / Year",
                category: "Undergraduate",
                overview: "Learn to defend enterprise infrastructures from modern digital security threats.",
                requirements: "High school completion with computer science or STEM background.",
                opportunities: "Security Analyst, Penetration Tester, Cloud Security Architect.",
                subjects: ["Ethical Hacking", "Cryptography", "Network Security", "Digital Forensics"],
                subCourses: [],
                status: true
            }
        ];
        setBulkJsonText(JSON.stringify(sampleData, null, 2));
        setBulkError("");
        setBulkResult(null);
    };

    const handleBulkFileUpload = (e) => {
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
            setBulkError("Please paste or upload a JSON array of courses.");
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
            setBulkError("Invalid JSON format: The root element must be an Array `[...]` of course objects.");
            return;
        }

        if (parsedData.length === 0) {
            setBulkError("JSON array is empty. Please provide at least one course object.");
            return;
        }

        try {
            setIsSubmittingBulk(true);
            const response = await fetch("/api/courses", {
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
                fetchCourses();
            } else {
                setBulkError("Server Error: " + (result.error || "Failed to process bulk upload."));
            }
        } catch (err) {
            console.error("Bulk upload request error:", err);
            setBulkError("Network Error: " + err.message);
        } finally {
            setIsSubmittingBulk(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setFormData((prev) => ({ ...prev, category: value }));
    };

    const handleImageUpload = async (file) => {
        if (!file) return;

        setUploadError("");
        setIsUploadingImage(true);

        try {
            const body = new FormData();
            body.append("file", file);
            body.append("folder", "courses");

            const response = await fetch("/api/upload-image", {
                method: "POST",
                body,
            });

            const result = await response.json();
            if (!response.ok || !result.url) {
                throw new Error(result.error || "Upload failed");
            }

            setFormData((prev) => ({ ...prev, image: result.url }));
        } catch (error) {
            console.error("Course image upload failed:", error);
            setUploadError(error.message || "Could not upload image");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleAddSubCourse = () => {
        if (!newSubCourse.name.trim()) {
            alert("Sub-course name is required");
            return;
        }

        if (subCourseEditIndex !== null) {
            const updated = [...subCourses];
            updated[subCourseEditIndex] = newSubCourse;
            setSubCourses(updated);
            setSubCourseEditIndex(null);
        } else {
            setSubCourses([...subCourses, newSubCourse]);
        }

        setNewSubCourse({
            name: "",
            duration: "",
            fees: "",
            overview: "",
            careerOutcomes: ""
        });
    };

    const handleEditSubCourse = (index) => {
        setNewSubCourse(subCourses[index]);
        setSubCourseEditIndex(index);
    };

    const handleRemoveSubCourse = (index) => {
        setSubCourses(subCourses.filter((_, i) => i !== index));
        if (subCourseEditIndex === index) {
            setSubCourseEditIndex(null);
            setNewSubCourse({
                name: "",
                duration: "",
                fees: "",
                overview: "",
                careerOutcomes: ""
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert subjects comma separated string to array
        const subjects = formData.subjectsInput
            ? formData.subjectsInput.split(",").map((s) => s.trim()).filter((s) => s)
            : [];

        const payload = {
            courseName: formData.courseName,
            description: formData.description,
            image: formData.image,
            duration: formData.duration,
            fees: formData.fees,
            category: formData.category,
            overview: formData.overview,
            requirements: formData.requirements,
            opportunities: formData.opportunities,
            subjects,
            subCourses,
            status: formData.status,
        };

        try {
            const url = editingId ? `/api/courses/${editingId}` : "/api/courses";
            const method = editingId ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
                setIsDialogOpen(false);
                resetForm();
                fetchCourses();
            } else {
                alert(result.error || "Failed to save course");
            }
        } catch (error) {
            console.error("Error saving course:", error);
        }
    };

    const handleEdit = (course) => {
        setEditingId(course._id);
        setFormData({
            courseName: course.courseName || course.title || "",
            description: course.description || course.desc || "",
            image: course.image || course.img || "",
            duration: course.duration || "",
            fees: course.fees || "",
            category: course.category || course.level || "Undergraduate",
            overview: course.overview || "",
            requirements: course.requirements || "",
            opportunities: course.opportunities || "",
            subjectsInput: course.subjects ? course.subjects.join(", ") : "",
            status: course.status !== undefined ? course.status : course.isActive,
        });
        setSubCourses(course.subCourses || []);
        setIsDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this course?")) {
            try {
                const response = await fetch(`/api/courses/${id}`, { method: "DELETE" });
                const result = await response.json();
                if (result.success) {
                    fetchCourses();
                } else {
                    alert(result.error || "Failed to delete course");
                }
            } catch (error) {
                console.error("Error deleting course:", error);
            }
        }
    };

    const toggleCourseStatus = async (course) => {
        try {
            const currentStatus = course.status !== undefined ? course.status : course.isActive;
            const response = await fetch(`/api/courses/${course._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: !currentStatus }),
            });
            const result = await response.json();
            if (result.success) {
                fetchCourses();
            }
        } catch (error) {
            console.error("Error toggling course status:", error);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            courseName: "",
            description: "",
            image: "",
            duration: "",
            fees: "",
            category: "Undergraduate",
            overview: "",
            requirements: "",
            opportunities: "",
            subjectsInput: "",
            status: true,
        });
        setSubCourses([]);
        setNewSubCourse({
            name: "",
            duration: "",
            fees: "",
            overview: "",
            careerOutcomes: ""
        });
        setSubCourseEditIndex(null);
        setActiveFormTab("general");
        setUploadError("");
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 sm:p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            🎓 Admin Panel <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold uppercase tracking-wider">Courses</span>
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm">Add, modify, and manage all academic courses and their specializations.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Bulk Add Button & Dialog */}
                        <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="border-slate-200 hover:border-slate-300 text-slate-700 bg-white shadow-sm font-semibold rounded-lg gap-2"
                                >
                                    <FileText className="w-4 h-4 text-emerald-600" /> Bulk Add (JSON)
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl w-[90vw] max-h-[85vh] flex flex-col p-0 overflow-hidden bg-white shadow-2xl rounded-2xl border-none">
                                <DialogHeader className="p-6 bg-slate-900 text-white relative">
                                    <DialogTitle className="text-xl font-bold tracking-wide flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-emerald-400" />
                                        Bulk Import Courses (JSON)
                                    </DialogTitle>
                                    <p className="text-xs text-slate-300 mt-1">Upload a .json file or paste a JSON array of course categories and sub-courses below.</p>
                                </DialogHeader>

                                <div className="p-6 overflow-y-auto space-y-5">
                                    {/* Actions Row */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg transition-all shadow-sm">
                                                <UploadCloud className="w-4 h-4 text-blue-600" />
                                                Upload JSON File
                                                <input
                                                    type="file"
                                                    accept=".json,application/json"
                                                    onChange={handleBulkFileUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={handleLoadSampleJson}
                                                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                                Load Sample JSON Format
                                            </Button>
                                        </div>
                                        {bulkJsonText && (
                                            <span className="text-[11px] font-semibold text-slate-400">
                                                {bulkJsonText.length.toLocaleString()} chars
                                            </span>
                                        )}
                                    </div>

                                    {/* Error Banner */}
                                    {bulkError && (
                                        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-start gap-2.5">
                                            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                            <div className="flex-1 leading-relaxed">{bulkError}</div>
                                        </div>
                                    )}

                                    {/* Results Summary Banner */}
                                    {bulkResult && (
                                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs space-y-2">
                                            <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                                Bulk Upload Completed Successfully!
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 pt-1 font-semibold text-slate-700">
                                                <div className="p-2 bg-white rounded-lg border border-emerald-100 text-emerald-700">
                                                    Inserted: <strong>{bulkResult.inserted.length}</strong>
                                                </div>
                                                <div className="p-2 bg-white rounded-lg border border-amber-100 text-amber-700">
                                                    Skipped (Already Exists): <strong>{bulkResult.skipped.length}</strong>
                                                </div>
                                                <div className="p-2 bg-white rounded-lg border border-rose-100 text-rose-700">
                                                    Errors: <strong>{bulkResult.errors.length}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* JSON Textarea */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider flex justify-between">
                                            <span>JSON Array Payload</span>
                                            <span className="text-slate-400 normal-case font-normal">Format: Array of Course objects [...]</span>
                                        </label>
                                        <Textarea
                                            rows={12}
                                            value={bulkJsonText}
                                            onChange={(e) => {
                                                setBulkJsonText(e.target.value);
                                                setBulkError("");
                                            }}
                                            placeholder={`[\n  {\n    "courseName": "Data Science & AI",\n    "description": "Machine learning, AI, data analytics...",\n    "category": "Undergraduate",\n    "duration": "3 Years",\n    "fees": "$14,000 / Year"\n  }\n]`}
                                            className="font-mono text-xs rounded-xl border-slate-200 focus:ring-blue-500 bg-slate-900 text-slate-100 p-4 leading-relaxed"
                                        />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setIsBulkDialogOpen(false);
                                            setBulkError("");
                                            setBulkResult(null);
                                        }}
                                        className="rounded-xl border-slate-200 hover:bg-slate-100 text-slate-700"
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        onClick={handleBulkSubmit}
                                        disabled={isSubmittingBulk || !bulkJsonText.trim()}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-6 gap-2"
                                    >
                                        {isSubmittingBulk ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" /> Inserting Courses...
                                            </>
                                        ) : (
                                            <>
                                                <FileText className="w-4 h-4" /> Start Bulk Import
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* Add Course Dialog */}
                        <Dialog open={isDialogOpen} onOpenChange={(open) => {
                            setIsDialogOpen(open);
                            if (!open) resetForm();
                        }}>
                            <DialogTrigger asChild>
                                <Button onClick={() => resetForm()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20 rounded-xl gap-2 h-11 px-5">
                                    <Plus className="w-5 h-5" /> Add Course
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl w-[95vw] h-[92vh] sm:h-[88vh] flex flex-col p-0 overflow-hidden bg-white shadow-2xl rounded-2xl border-none">
                                {/* Header Banner */}
                                <DialogHeader className="p-6 bg-slate-900 text-white shrink-0 border-b border-slate-800">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <DialogTitle className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                                                <GraduationCap className="w-5 h-5 text-blue-400" />
                                                {editingId ? "Edit Course Details" : "Create New Course"}
                                            </DialogTitle>
                                            <p className="text-xs text-slate-300">
                                                {editingId ? "Update course info, fees, overview, or specializations." : "Fill in the guided form below to publish a new course listing."}
                                            </p>
                                        </div>
                                        <span className="text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block">
                                            Step {["general","academic","subcourses"].indexOf(activeFormTab) + 1} of 3
                                        </span>
                                    </div>

                                    {/* Step Progress Tracker */}
                                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800/80">
                                        {[
                                            { id: "general", stepNum: "1", title: "General Info", icon: BookOpen },
                                            { id: "academic", stepNum: "2", title: "Overview & Requirements", icon: Sparkles },
                                            { id: "subcourses", stepNum: "3", title: "Sub-Courses", icon: GraduationCap },
                                        ].map((tab) => {
                                            const tabs = ["general", "academic", "subcourses"];
                                            const isActive = activeFormTab === tab.id;
                                            const isPast = tabs.indexOf(activeFormTab) > tabs.indexOf(tab.id);
                                            const Icon = tab.icon;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    type="button"
                                                    onClick={() => setActiveFormTab(tab.id)}
                                                    className={
                                                        "flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all " +
                                                        (isActive
                                                            ? "bg-blue-600 border-blue-500 text-white shadow-md font-bold"
                                                            : isPast
                                                            ? "bg-slate-800/80 border-slate-700 text-emerald-400 font-semibold"
                                                            : "bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80")
                                                    }
                                                >
                                                    <div className={
                                                        "w-6 h-6 rounded-lg text-xs flex items-center justify-center font-black shrink-0 " +
                                                        (isActive ? "bg-white text-blue-600" : isPast ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-300")
                                                    }>
                                                        {isPast ? <Check className="w-3.5 h-3.5" /> : tab.stepNum}
                                                    </div>
                                                    <div className="min-w-0 flex-1 hidden sm:block">
                                                        <div className="text-xs truncate">{tab.title}</div>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </DialogHeader>

                                {/* Form Body */}
                                <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 bg-slate-50/50">
                                    <div className="flex-1 overflow-y-auto p-6 space-y-6">

                                        {/* Step 1: General Info */}
                                        {activeFormTab === "general" && (
                                            <div className="space-y-6 animate-in fade-in duration-200">
                                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                                                    <div className="flex items-center gap-2 border-b pb-3 text-slate-800 font-extrabold text-xs uppercase tracking-wider">
                                                        <BookOpen className="w-4 h-4 text-blue-600" /> Course Identity
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-bold text-slate-700">Course Category Title <span className="text-rose-500">*</span></label>
                                                            <Input
                                                                name="courseName"
                                                                value={formData.courseName}
                                                                onChange={handleInputChange}
                                                                placeholder="e.g., Allied Health, Medicine, Management"
                                                                required
                                                                className="h-11 text-xs rounded-xl bg-white border-slate-200"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-bold text-slate-700">Course Level <span className="text-rose-500">*</span></label>
                                                            <Select value={formData.category} onValueChange={handleSelectChange}>
                                                                <SelectTrigger className="h-11 text-xs rounded-xl bg-white border-slate-200">
                                                                    <SelectValue placeholder="Choose level" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                                                                    <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                                                                    <SelectItem value="Diploma">Diploma</SelectItem>
                                                                    <SelectItem value="Doctorate">Doctorate</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-slate-700">Short Description <span className="text-rose-500">*</span></label>
                                                        <Textarea
                                                            name="description"
                                                            value={formData.description}
                                                            onChange={handleInputChange}
                                                            placeholder="Brief summary shown on the popular course card..."
                                                            rows={2}
                                                            required
                                                            className="text-xs rounded-xl bg-white border-slate-200"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-bold text-slate-700">Duration <span className="text-rose-500">*</span></label>
                                                            <Input
                                                                name="duration"
                                                                value={formData.duration}
                                                                onChange={handleInputChange}
                                                                placeholder="e.g., 3 Years, 2 Years"
                                                                required
                                                                className="h-11 text-xs rounded-xl bg-white border-slate-200"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-bold text-slate-700">Estimated Tuition Fees <span className="text-rose-500">*</span></label>
                                                            <Input
                                                                name="fees"
                                                                value={formData.fees}
                                                                onChange={handleInputChange}
                                                                placeholder="e.g., $15,000 / Year"
                                                                required
                                                                className="h-11 text-xs rounded-xl bg-white border-slate-200"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                                                    <div className="flex items-center gap-2 border-b pb-3 text-slate-800 font-extrabold text-xs uppercase tracking-wider">
                                                        <UploadCloud className="w-4 h-4 text-blue-600" /> Course Banner Image &amp; Visibility
                                                    </div>

                                                    <input
                                                        id="course-image-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handleImageUpload(e.target.files?.[0])}
                                                    />
                                                    <div
                                                        className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-5 text-center cursor-pointer hover:bg-slate-50 transition"
                                                        onDragOver={(e) => e.preventDefault()}
                                                        onDrop={(e) => {
                                                            e.preventDefault();
                                                            handleImageUpload(e.dataTransfer.files?.[0]);
                                                        }}
                                                        onClick={() => document.getElementById("course-image-upload")?.click()}
                                                    >
                                                        <UploadCloud className="w-7 h-7 mx-auto text-slate-400 mb-2" />
                                                        <p className="text-xs font-medium text-slate-700">Drag &amp; drop course banner or click to browse</p>
                                                        <p className="text-[10px] text-slate-400 mt-1">{isUploadingImage ? "Uploading..." : "Recommended: 800×500 px — Max 5MB"}</p>
                                                    </div>
                                                    {formData.image && (
                                                        <div className="rounded-xl overflow-hidden border border-slate-200 w-fit shadow-sm">
                                                            <img src={formData.image} alt="Course banner preview" className="h-28 w-52 object-cover" />
                                                        </div>
                                                    )}
                                                    {uploadError && (
                                                        <p className="text-xs font-semibold text-rose-600">{uploadError}</p>
                                                    )}

                                                    <div className="flex items-center gap-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                                                        <input
                                                            type="checkbox"
                                                            id="course-status-toggle"
                                                            checked={formData.status}
                                                            onChange={() => setFormData(prev => ({ ...prev, status: !prev.status }))}
                                                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <label htmlFor="course-status-toggle" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                                                            Active — Show this course on the homepage
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 2: Overview & Requirements */}
                                        {activeFormTab === "academic" && (
                                            <div className="space-y-6 animate-in fade-in duration-200">
                                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                                                    <div className="flex items-center gap-2 border-b pb-3 text-slate-800 font-extrabold text-xs uppercase tracking-wider">
                                                        <Sparkles className="w-4 h-4 text-blue-600" /> Academic Content &amp; Career Outcomes
                                                    </div>

                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-slate-700">Course Overview (Detailed) <span className="text-rose-500">*</span></label>
                                                        <Textarea
                                                            name="overview"
                                                            value={formData.overview}
                                                            onChange={handleInputChange}
                                                            placeholder="Provide a comprehensive course description, scope, and objectives..."
                                                            rows={5}
                                                            required
                                                            className="text-xs rounded-xl bg-white border-slate-200"
                                                        />
                                                    </div>

                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-slate-700">Admission / Academic Requirements</label>
                                                        <Textarea
                                                            name="requirements"
                                                            value={formData.requirements}
                                                            onChange={handleInputChange}
                                                            placeholder="Specify academic scores, prerequisite subjects, eligibility criteria..."
                                                            rows={3}
                                                            className="text-xs rounded-xl bg-white border-slate-200"
                                                        />
                                                    </div>

                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-slate-700">Career &amp; Placement Opportunities</label>
                                                        <Textarea
                                                            name="opportunities"
                                                            value={formData.opportunities}
                                                            onChange={handleInputChange}
                                                            placeholder="What jobs or roles can graduates apply for? Placement scope..."
                                                            rows={3}
                                                            className="text-xs rounded-xl bg-white border-slate-200"
                                                        />
                                                    </div>

                                                    <div className="space-y-1.5">
                                                        <label className="text-xs font-bold text-slate-700">Key Subjects Covered <span className="text-slate-400 font-normal">(comma-separated)</span></label>
                                                        <Input
                                                            name="subjectsInput"
                                                            value={formData.subjectsInput}
                                                            onChange={handleInputChange}
                                                            placeholder="e.g., Financial Accounting, Micro Economics, Business Law"
                                                            className="h-11 text-xs rounded-xl bg-white border-slate-200"
                                                        />
                                                        <p className="text-[11px] text-slate-400">Separate each subject with a comma</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3: Sub-Courses */}
                                        {activeFormTab === "subcourses" && (
                                            <div className="space-y-6 animate-in fade-in duration-200">
                                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                                                    <div className="flex items-center gap-2 border-b pb-3 text-slate-800 font-extrabold text-xs uppercase tracking-wider">
                                                        <GraduationCap className="w-4 h-4 text-blue-600" /> Add / Edit Specialization (Sub-Course)
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-bold text-slate-700">Sub-Course Name <span className="text-rose-500">*</span></label>
                                                            <Input
                                                                value={newSubCourse.name}
                                                                onChange={(e) => setNewSubCourse(prev => ({ ...prev, name: e.target.value }))}
                                                                placeholder="e.g., Hotel Management"
                                                                className="h-11 text-xs rounded-xl bg-white border-slate-200"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-bold text-slate-700">Duration</label>
                                                            <Input
                                                                value={newSubCourse.duration}
                                                                onChange={(e) => setNewSubCourse(prev => ({ ...prev, duration: e.target.value }))}
                                                                placeholder="e.g., 3 Years"
                                                                className="h-11 text-xs rounded-xl bg-white border-slate-200"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-bold text-slate-700">Tuition Fees</label>
                                                            <Input
                                                                value={newSubCourse.fees}
                                                                onChange={(e) => setNewSubCourse(prev => ({ ...prev, fees: e.target.value }))}
                                                                placeholder="e.g., $11,500 / Year"
                                                                className="h-11 text-xs rounded-xl bg-white border-slate-200"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-bold text-slate-700">Overview / Focus Area</label>
                                                            <Textarea
                                                                value={newSubCourse.overview}
                                                                onChange={(e) => setNewSubCourse(prev => ({ ...prev, overview: e.target.value }))}
                                                                placeholder="Specific topics, skills learned..."
                                                                rows={3}
                                                                className="text-xs rounded-xl bg-white border-slate-200"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-xs font-bold text-slate-700">Career Outcomes</label>
                                                            <Textarea
                                                                value={newSubCourse.careerOutcomes}
                                                                onChange={(e) => setNewSubCourse(prev => ({ ...prev, careerOutcomes: e.target.value }))}
                                                                placeholder="Job titles, salary estimates..."
                                                                rows={3}
                                                                className="text-xs rounded-xl bg-white border-slate-200"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-end">
                                                        <Button
                                                            type="button"
                                                            onClick={handleAddSubCourse}
                                                            className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-bold h-10 px-5 text-xs gap-1.5 shadow-md shadow-blue-500/20"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                            {subCourseEditIndex !== null ? "Update Specialization" : "Add Specialization"}
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* Sub-Courses List */}
                                                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                                                    <div className="flex items-center gap-2 border-b pb-3 text-slate-800 font-extrabold text-xs uppercase tracking-wider">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Added Specializations ({subCourses.length})
                                                    </div>
                                                    {subCourses.length === 0 ? (
                                                        <p className="text-xs text-slate-400 italic py-2">No sub-courses added yet. Use the form above to add some.</p>
                                                    ) : (
                                                        <div className="border rounded-xl overflow-hidden bg-white">
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow className="bg-slate-50">
                                                                        <TableHead className="font-semibold text-xs">Name</TableHead>
                                                                        <TableHead className="font-semibold text-xs">Duration</TableHead>
                                                                        <TableHead className="font-semibold text-xs">Fees</TableHead>
                                                                        <TableHead className="font-semibold text-xs text-right">Actions</TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {subCourses.map((sub, i) => (
                                                                        <TableRow key={i}>
                                                                            <TableCell className="font-medium text-xs">{sub.name}</TableCell>
                                                                            <TableCell className="text-xs">{sub.duration || "—"}</TableCell>
                                                                            <TableCell className="text-xs text-emerald-700 font-semibold">{sub.fees || "—"}</TableCell>
                                                                            <TableCell className="text-right">
                                                                                <div className="flex justify-end gap-1.5">
                                                                                    <Button
                                                                                        type="button"
                                                                                        size="sm"
                                                                                        variant="outline"
                                                                                        onClick={() => handleEditSubCourse(i)}
                                                                                        className="h-7 px-2 text-[10px] rounded-lg"
                                                                                    >
                                                                                        Edit
                                                                                    </Button>
                                                                                    <Button
                                                                                        type="button"
                                                                                        size="sm"
                                                                                        variant="destructive"
                                                                                        onClick={() => handleRemoveSubCourse(i)}
                                                                                        className="h-7 px-2 text-[10px] rounded-lg"
                                                                            >
                                                                                Delete
                                                                            </Button>
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    )}

                                    </div>

                                    {/* Footer Action Controls */}
                                    <div className="bg-white px-6 py-4 border-t border-slate-200 shrink-0 flex items-center justify-between gap-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsDialogOpen(false)}
                                            className="rounded-xl border-slate-200 h-11 px-5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                                        >
                                            Cancel
                                        </Button>

                                        <div className="flex items-center gap-3">
                                            {activeFormTab !== "general" && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => {
                                                        const tabs = ["general", "academic", "subcourses"];
                                                        const idx = tabs.indexOf(activeFormTab);
                                                        setActiveFormTab(tabs[idx - 1]);
                                                    }}
                                                    className="rounded-xl border-slate-200 h-11 px-4 text-xs font-semibold text-slate-700 gap-1.5"
                                                >
                                                    <ArrowLeft className="w-4 h-4" /> Previous
                                                </Button>
                                            )}

                                            <Button
                                                type="submit"
                                                variant="outline"
                                                className="hidden sm:inline-flex rounded-xl border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 h-11 px-5 text-xs font-bold"
                                            >
                                                {editingId ? "Save Changes" : "Save Draft"}
                                            </Button>

                                            {activeFormTab !== "subcourses" ? (
                                                <Button
                                                    type="button"
                                                    onClick={() => {
                                                        const tabs = ["general", "academic", "subcourses"];
                                                        const idx = tabs.indexOf(activeFormTab);
                                                        setActiveFormTab(tabs[idx + 1]);
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
                                                    {editingId ? "Update Course" : "Publish Course"}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Courses List */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500">Loading courses list...</div>
                    ) : courses.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No courses defined. Add some to get started!</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead className="font-semibold">Course Banner</TableHead>
                                        <TableHead className="font-semibold">Course Name</TableHead>
                                        <TableHead className="font-semibold">Level</TableHead>
                                        <TableHead className="font-semibold">Sub-Courses</TableHead>
                                        <TableHead className="font-semibold">Duration</TableHead>
                                        <TableHead className="font-semibold">Estimated Fees</TableHead>
                                        <TableHead className="font-semibold">Status</TableHead>
                                        <TableHead className="font-semibold text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {courses.map((course) => {
                                        const name = course.courseName || course.title || "";
                                        const image = course.image || course.img || "/placeholder-course.jpg";
                                        const category = course.category || course.level || "Undergraduate";
                                        const currentStatus = course.status !== undefined ? course.status : course.isActive;
                                        return (
                                            <TableRow key={course._id} className="hover:bg-gray-50">
                                                <TableCell>
                                                    <div className="w-24 h-14 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                                                        <img
                                                            src={image}
                                                            alt={name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Crect width='100' height='60' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='55%25' text-anchor='middle' font-size='8' fill='%2364748b'%3ECourse%3C/text%3E%3C/svg%3E";
                                                            }}
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-semibold text-gray-900">
                                                    {name}
                                                </TableCell>
                                                <TableCell className="text-gray-700">
                                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
                                                        {category}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-gray-700 text-sm font-semibold">
                                                    <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                                                        {course.subCourses ? course.subCourses.length : 0} Specializations
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-gray-600 text-sm">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                                                        {course.duration || "—"}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-gray-600 text-sm">
                                                    <span className="flex items-center gap-0.5 font-medium text-emerald-700">
                                                        {course.fees || "—"}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <button
                                                        onClick={() => toggleCourseStatus(course)}
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold gap-1 transition-all ${currentStatus ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                                                    >
                                                        {currentStatus ? (
                                                            <CheckCircle className="w-3 h-3" />
                                                        ) : (
                                                            <Circle className="w-3 h-3" />
                                                        )}
                                                        {currentStatus ? "Active" : "Inactive"}
                                                    </button>
                                                </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleEdit(course)}
                                                        className="gap-1 hover:text-blue-600"
                                                    >
                                                        <Edit2 className="w-4 h-4" /> Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDelete(course._id)}
                                                        className="gap-1"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
