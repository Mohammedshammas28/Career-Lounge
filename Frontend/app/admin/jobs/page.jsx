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
    MapPin,
    DollarSign,
    Briefcase,
    Building2,
    Clock,
    Sparkles,
    UploadCloud,
    Check,
    X,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function JobsAdminPage() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingSlug, setEditingSlug] = useState(null);
    const [activeFormTab, setActiveFormTab] = useState("general");
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        type: "Full-time",
        salary: "",
        experience: "",
        description: "",
        requirements: [""],
        responsibilities: [""],
        logo: "",
        isActive: true,
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/jobs?all=true");
            const result = await response.json();
            if (result.success) {
                setJobs(result.data);
                setFilteredJobs(result.data);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter jobs based on search query
    useEffect(() => {
        const filtered = jobs.filter(
            (job) =>
                (job.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (job.company || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (job.location || "").toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredJobs(filtered);
    }, [searchQuery, jobs]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (checked) => {
        setFormData((prev) => ({
            ...prev,
            isActive: checked,
        }));
    };

    const uploadImage = async (file) => {
        if (!file) return;

        setUploadError("");
        setUploading(true);

        try {
            const body = new FormData();
            body.append("file", file);
            body.append("folder", "jobs");

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
                logo: result.url,
            }));
        } catch (error) {
            console.error("Job logo upload failed:", error);
            setUploadError(error.message || "Could not upload logo");
        } finally {
            setUploading(false);
        }
    };

    // Requirements list helpers
    const addRequirement = () => {
        setFormData((prev) => ({
            ...prev,
            requirements: [...prev.requirements, ""],
        }));
    };

    const removeRequirement = (index) => {
        setFormData((prev) => ({
            ...prev,
            requirements: prev.requirements.filter((_, i) => i !== index),
        }));
    };

    const handleRequirementChange = (index, value) => {
        setFormData((prev) => {
            const updated = [...prev.requirements];
            updated[index] = value;
            return { ...prev, requirements: updated };
        });
    };

    // Responsibilities list helpers
    const addResponsibility = () => {
        setFormData((prev) => ({
            ...prev,
            responsibilities: [...prev.responsibilities, ""],
        }));
    };

    const removeResponsibility = (index) => {
        setFormData((prev) => ({
            ...prev,
            responsibilities: prev.responsibilities.filter((_, i) => i !== index),
        }));
    };

    const handleResponsibilityChange = (index, value) => {
        setFormData((prev) => {
            const updated = [...prev.responsibilities];
            updated[index] = value;
            return { ...prev, responsibilities: updated };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Filter out empty entries from requirements and responsibilities lists
        const finalFormData = {
            ...formData,
            requirements: formData.requirements.filter(req => req.trim() !== ""),
            responsibilities: formData.responsibilities.filter(resp => resp.trim() !== ""),
        };

        try {
            const url = editingSlug
                ? `/api/jobs/${editingSlug}`
                : "/api/jobs";
            const method = editingSlug ? "PATCH" : "POST";

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
                fetchJobs();
            } else {
                alert("Error: " + (result.error || "Could not save job"));
            }
        } catch (error) {
            console.error("Error saving job:", error);
            alert("Error saving job data.");
        }
    };

    const handleEdit = (job) => {
        setEditingSlug(job.slug);
        setFormData({
            title: job.title || "",
            company: job.company || "",
            location: job.location || "",
            type: job.type || "Full-time",
            salary: job.salary || "",
            experience: job.experience || "",
            description: job.description || "",
            requirements: job.requirements?.length ? job.requirements : [""],
            responsibilities: job.responsibilities?.length ? job.responsibilities : [""],
            logo: job.logo || "",
            isActive: job.isActive !== undefined ? job.isActive : true,
        });
        setActiveFormTab("general");
        setIsDialogOpen(true);
    };

    const handleDelete = async (slug) => {
        if (confirm("Are you sure you want to delete this job opportunity? This action is permanent!")) {
            try {
                const response = await fetch(`/api/jobs/${slug}`, {
                    method: "DELETE",
                });
                const result = await response.json();
                if (result.success) {
                    fetchJobs();
                } else {
                    alert("Error: " + (result.error || "Could not delete job"));
                }
            } catch (error) {
                console.error("Error deleting job:", error);
            }
        }
    };

    const resetForm = () => {
        setEditingSlug(null);
        setFormData({
            title: "",
            company: "",
            location: "",
            type: "Full-time",
            salary: "",
            experience: "",
            description: "",
            requirements: [""],
            responsibilities: [""],
            logo: "",
            isActive: true,
        });
        setActiveFormTab("general");
    };

    const toggleJobStatus = async (job) => {
        try {
            const response = await fetch(`/api/jobs/${job.slug}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isActive: !job.isActive }),
            });
            const result = await response.json();
            if (result.success) {
                fetchJobs();
            } else {
                alert("Error: " + (result.error || "Could not update status"));
            }
        } catch (error) {
            console.error("Error toggling status:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 sm:p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            💼 Admin Panel <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold uppercase tracking-wider">Jobs</span>
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm">Add, modify, and manage all job career listings in the database.</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => resetForm()}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-100 rounded-xl gap-2 h-11"
                            >
                                <Plus className="w-5 h-5" /> Add Job Listing
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-[90vw] max-h-[85vh] flex flex-col p-0 overflow-hidden bg-white shadow-2xl rounded-2xl border-none">
                            <DialogHeader className="p-6 bg-slate-900 text-white relative">
                                <DialogTitle className="text-xl font-bold tracking-wide flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-blue-400" />
                                    {editingSlug ? "Modify Job Opportunity" : "Create New Job Opportunity"}
                                </DialogTitle>
                                <p className="text-xs text-slate-300 mt-1">Fill in the fields below to publish a new job opportunity to the recruitment page.</p>
                            </DialogHeader>

                            {/* Tab selection row */}
                            <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 gap-1 shrink-0 overflow-x-auto">
                                {[
                                    { id: "general", label: "General Info", icon: Building2 },
                                    { id: "details", label: "Description & Details", icon: Briefcase },
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setActiveFormTab(tab.id)}
                                            className={`flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex-1 justify-center whitespace-nowrap
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
                                    
                                    {/* Tab 1: General Info */}
                                    {activeFormTab === "general" && (
                                        <div className="space-y-4 animate-in fade-in duration-200">
                                            <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100/50 mb-6">
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 mb-1">
                                                    <Building2 className="w-4 h-4" /> Core Identity
                                                </h4>
                                                <p className="text-xs text-slate-500">Provide name, company name, location, and metadata details.</p>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">Job Title <span className="text-rose-500">*</span></label>
                                                    <Input
                                                        name="title"
                                                        placeholder="e.g., Senior Software Engineer"
                                                        value={formData.title}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="rounded-lg border-slate-200 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">Company Name <span className="text-rose-500">*</span></label>
                                                    <Input
                                                        name="company"
                                                        placeholder="e.g., TechNova Solutions"
                                                        value={formData.company}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="rounded-lg border-slate-200 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">Location <span className="text-rose-500">*</span></label>
                                                    <Input
                                                        name="location"
                                                        placeholder="e.g., Dubai, UAE (Hybrid)"
                                                        value={formData.location}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="rounded-lg border-slate-200 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">Job Type <span className="text-rose-500">*</span></label>
                                                    <select
                                                        name="type"
                                                        value={formData.type}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        <option value="Full-time">Full-time</option>
                                                        <option value="Part-time">Part-time</option>
                                                        <option value="Contract">Contract</option>
                                                        <option value="Remote">Remote</option>
                                                        <option value="Internship">Internship</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">Salary Package <span className="text-rose-500">*</span></label>
                                                    <Input
                                                        name="salary"
                                                        placeholder="e.g., AED 18,000 - 25,000 / Month"
                                                        value={formData.salary}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="rounded-lg border-slate-200 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-700">Required Experience</label>
                                                    <Input
                                                        name="experience"
                                                        placeholder="e.g., 5+ Years"
                                                        value={formData.experience}
                                                        onChange={handleInputChange}
                                                        className="rounded-lg border-slate-200 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>

                                            {/* Company Logo Image upload */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <label className="text-xs font-bold text-slate-700">Company Logo URL / File</label>
                                                        <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-black uppercase">Square Logo preferred</span>
                                                    </div>
                                                    <input
                                                        id="company-logo-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => uploadImage(e.target.files?.[0])}
                                                    />
                                                    <div
                                                        className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/70 p-4 text-center cursor-pointer hover:bg-slate-50 transition"
                                                        onDragOver={(e) => e.preventDefault()}
                                                        onDrop={(e) => {
                                                            e.preventDefault();
                                                            uploadImage(e.dataTransfer.files?.[0]);
                                                        }}
                                                        onClick={() => document.getElementById("company-logo-upload")?.click()}
                                                    >
                                                        <UploadCloud className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                                                        <p className="text-xs text-slate-600 mb-1">Drag logo here or click to browse</p>
                                                        <span className="text-[10px] text-slate-400">
                                                            {uploading ? "Uploading image..." : "Supports PNG, JPG, WEBP"}
                                                        </span>
                                                    </div>
                                                    {uploadError && (
                                                        <p className="text-xs font-semibold text-rose-600">{uploadError}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-700">Logo Preview & Direct URL</label>
                                                    <Input
                                                        name="logo"
                                                        placeholder="Or paste direct image URL"
                                                        value={formData.logo}
                                                        onChange={handleInputChange}
                                                        className="rounded-lg border-slate-200 text-xs"
                                                    />
                                                    {formData.logo && (
                                                        <div className="mt-2 h-20 w-20 rounded-lg overflow-hidden border border-slate-200 bg-white flex items-center justify-center p-2">
                                                            <img src={formData.logo} alt="Company logo preview" className="max-h-full max-w-full object-contain" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* isActive status checkbox toggle */}
                                            <div className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                <input
                                                    type="checkbox"
                                                    id="isActiveToggle"
                                                    checked={formData.isActive}
                                                    onChange={(e) => handleCheckboxChange(e.target.checked)}
                                                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                                                />
                                                <label htmlFor="isActiveToggle" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                                                    Active Listing (This job is visible and open for applications)
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tab 2: Description & Lists */}
                                    {activeFormTab === "details" && (
                                        <div className="space-y-6 animate-in fade-in duration-200">
                                            <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100/50">
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5 mb-1">
                                                    <Briefcase className="w-4 h-4" /> Job Requirements & Details
                                                </h4>
                                                <p className="text-xs text-slate-500">Provide detailed descriptions, responsibilities list, and candidate prerequisites.</p>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-700">Job Description <span className="text-rose-500">*</span></label>
                                                <Textarea
                                                    name="description"
                                                    placeholder="Write a clear overview of the job role, target expectations, and company culture context..."
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    required
                                                    rows={6}
                                                    className="rounded-lg border-slate-200 resize-y"
                                                />
                                            </div>

                                            {/* Requirements List */}
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                                    <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
                                                        Requirements
                                                    </label>
                                                    <Button
                                                        type="button"
                                                        onClick={addRequirement}
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-xs font-bold gap-1 text-blue-600 border-blue-100 hover:bg-blue-50"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" /> Add Requirement
                                                    </Button>
                                                </div>
                                                <div className="space-y-2">
                                                    {formData.requirements.map((req, index) => (
                                                        <div key={index} className="flex gap-2 items-center">
                                                            <Input
                                                                placeholder={`e.g., Bachelor's degree in Computer Science or related field`}
                                                                value={req}
                                                                onChange={(e) => handleRequirementChange(index, e.target.value)}
                                                                className="rounded-lg border-slate-200"
                                                            />
                                                            {formData.requirements.length > 1 && (
                                                                <Button
                                                                    type="button"
                                                                    onClick={() => removeRequirement(index)}
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-9 w-9 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg shrink-0"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Responsibilities List */}
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                                    <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
                                                        Responsibilities
                                                    </label>
                                                    <Button
                                                        type="button"
                                                        onClick={addResponsibility}
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-xs font-bold gap-1 text-blue-600 border-blue-100 hover:bg-blue-50"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" /> Add Responsibility
                                                    </Button>
                                                </div>
                                                <div className="space-y-2">
                                                    {formData.responsibilities.map((resp, index) => (
                                                        <div key={index} className="flex gap-2 items-center">
                                                            <Input
                                                                placeholder={`e.g., Design and implement robust, clean, and maintainable code`}
                                                                value={resp}
                                                                onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                                                                className="rounded-lg border-slate-200"
                                                            />
                                                            {formData.responsibilities.length > 1 && (
                                                                <Button
                                                                    type="button"
                                                                    onClick={() => removeResponsibility(index)}
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-9 w-9 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg shrink-0"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    )}

                                </div>

                                {/* Form Footer */}
                                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsDialogOpen(false)}
                                        className="rounded-xl border-slate-200 hover:bg-slate-100"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6"
                                    >
                                        Save Job Opportunity
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Table & Listings Container */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
                    
                    {/* Search & Filter Bar */}
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
                        <div className="relative w-full sm:max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search by Job title, Company, or Location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-10 rounded-xl border-slate-200 bg-white shadow-sm focus:ring-blue-500"
                            />
                        </div>
                        <div className="text-xs font-medium text-slate-500">
                            Showing <span className="font-bold text-slate-700">{filteredJobs.length}</span> of <span className="font-bold text-slate-700">{jobs.length}</span> Job opportunities
                        </div>
                    </div>

                    {/* Table View */}
                    {isLoading ? (
                        <div className="p-20 text-center text-slate-400">
                            <span className="inline-block animate-pulse font-semibold">Fetching job listings database...</span>
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="p-20 text-center">
                            <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-slate-800 font-bold text-lg">No Job Listings Found</h3>
                            <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">Try refining your search query or click "Add Job Listing" to publish a new one.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-[80px]">Logo</TableHead>
                                        <TableHead>Job Opportunity</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Package & Exp</TableHead>
                                        <TableHead className="w-[100px] text-center">Status</TableHead>
                                        <TableHead className="w-[120px] text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredJobs.map((job) => (
                                        <TableRow key={job._id} className="hover:bg-slate-50/50">
                                            <TableCell>
                                                <div className="h-10 w-10 rounded-lg overflow-hidden border border-slate-100 bg-white flex items-center justify-center p-1">
                                                    {job.logo ? (
                                                        <img src={job.logo} alt={job.company} className="max-h-full max-w-full object-contain" />
                                                    ) : (
                                                        <Building2 className="w-5 h-5 text-slate-400" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-bold text-slate-900">
                                                <div>{job.title}</div>
                                                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-50 text-blue-600 border border-blue-100 mt-1">
                                                    {job.type}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-slate-600 font-medium">{job.company}</TableCell>
                                            <TableCell className="text-slate-500 text-xs font-semibold">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                                    {job.location}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-xs text-slate-600">
                                                <div className="flex items-center gap-1 font-bold text-slate-700">
                                                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                                                    {job.salary}
                                                </div>
                                                {job.experience && (
                                                    <div className="flex items-center gap-1 mt-1 text-slate-400">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {job.experience}
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <button
                                                    onClick={() => toggleJobStatus(job)}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold transition-all border
                                                        ${job.isActive
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                                            : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                                                        }`}
                                                >
                                                    {job.isActive ? (
                                                        <>
                                                            <Check className="w-3 h-3" /> Active
                                                        </>
                                                    ) : (
                                                        <>
                                                            <X className="w-3 h-3" /> Inactive
                                                        </>
                                                    )}
                                                </button>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1.5">
                                                    <Button
                                                        onClick={() => handleEdit(job)}
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDelete(job.slug)}
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
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
        </div>
    );
}
