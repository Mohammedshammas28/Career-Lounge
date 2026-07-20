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
import { Plus, Edit2, Trash2, GripVertical, CheckCircle, Circle, UploadCloud } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BannersAdminPage() {
    const [banners, setBanners] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [draggedId, setDraggedId] = useState(null);
    const [previewData, setPreviewData] = useState(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");

    const [formData, setFormData] = useState({
        university: "",
        heading: "Study at Top Ranked University Abroad",
        highlightedHeading: "University",
        subHeading: "Unlock global opportunities with world-class education, industry-focused courses and amazing offers.",
        tagText: "FEATURED UNIVERSITY",
        offerPercentage: "",
        offerText: "",
        deadlineText: "",
        buttonText: "Apply Now",
        customBannerImage: "",
        customGradient: "from-purple-900 via-blue-900 to-purple-900",
        featured: false,
        active: true,
    });

    // Fetch banners and universities
    useEffect(() => {
        fetchBanners();
        fetchUniversities();
    }, []);

    const fetchBanners = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/banners?all=true");
            const result = await response.json();
            if (result.success) {
                const sorted = result.data.sort((a, b) => (a.order || 0) - (b.order || 0));
                setBanners(sorted);
            }
        } catch (error) {
            console.error("Error fetching banners:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUniversities = async () => {
        try {
            console.log("📡 Fetching universities...");
            const response = await fetch("/api/universities");
            const result = await response.json();
            console.log("🏫 Universities fetched:", result.data?.length);
            if (result.success) {
                setUniversities(result.data);
            }
        } catch (error) {
            console.error("❌ Error fetching universities:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newData = { ...formData, [name]: value };
        setFormData(newData);

        if (formData.university) {
            const selectedUni = universities.find(u => u._id === formData.university);
            if (selectedUni) {
                setPreviewData({ ...newData, university: selectedUni });
            }
        }
    };

    const handleSelectChange = (value) => {
        const selectedUni = universities.find(u => u._id === value);
        const newData = { ...formData, university: value };
        setFormData(newData);
        if (selectedUni) {
            setPreviewData({ ...newData, university: selectedUni });
        }
    };

    const uploadCustomBannerImage = async (file) => {
        if (!file) return;

        setUploadError("");
        setIsUploadingImage(true);

        try {
            const body = new FormData();
            body.append("file", file);
            body.append("folder", "premium-banners");

            const response = await fetch("/api/upload-image", {
                method: "POST",
                body,
            });

            const result = await response.json();
            if (!response.ok || !result.url) {
                throw new Error(result.error || "Upload failed");
            }

            const newData = { ...formData, customBannerImage: result.url };
            setFormData(newData);

            if (formData.university) {
                const selectedUni = universities.find((u) => u._id === formData.university);
                if (selectedUni) {
                    setPreviewData({ ...newData, university: selectedUni });
                }
            }
        } catch (error) {
            console.error("Premium banner image upload failed:", error);
            setUploadError(error.message || "Could not upload image");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");
        setSubmitSuccess("");

        if (!formData.university) {
            setSubmitError("⚠️ Please select a university before saving.");
            return;
        }

        try {
            const url = editingId ? `/api/banners/${editingId}` : "/api/banners";
            const method = editingId ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitSuccess(editingId ? "✅ Banner updated!" : "✅ Banner created!");
                setTimeout(() => {
                    setIsDialogOpen(false);
                    resetForm();
                    fetchBanners();
                }, 800);
            } else {
                setSubmitError(`❌ Failed: ${result.error || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error saving banner:", error);
            setSubmitError(`❌ Network error: ${error.message}`);
        }
    };

    const handleEdit = (banner) => {
        setEditingId(banner._id);
        setFormData({
            university: banner.university._id,
            heading: banner.heading || "Study at Top Ranked University Abroad",
            highlightedHeading: banner.highlightedHeading || "University",
            subHeading: banner.subHeading || "Unlock global opportunities with world-class education, industry-focused courses and amazing offers.",
            tagText: banner.tagText || "FEATURED UNIVERSITY",
            offerPercentage: banner.offerPercentage || "",
            offerText: banner.offerText || "",
            deadlineText: banner.deadlineText || "",
            buttonText: banner.buttonText || "Apply Now",
            customBannerImage: banner.customBannerImage || "",
            customGradient: banner.customGradient || "from-purple-900 via-blue-900 to-purple-900",
            featured: banner.featured || false,
            active: banner.active,
        });
        const selectedUni = universities.find(u => u._id === banner.university._id);
        if (selectedUni) {
            setPreviewData({ ...banner, university: selectedUni });
        }
        setIsDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this banner?")) {
            try {
                await fetch(`/api/banners/${id}`, { method: "DELETE" });
                fetchBanners();
            } catch (error) {
                console.error("Error deleting banner:", error);
            }
        }
    };

    const handleDragStart = (e, bannerId) => {
        setDraggedId(bannerId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async (e, targetBannerId) => {
        e.preventDefault();
        if (draggedId === targetBannerId) return;

        const draggedIndex = banners.findIndex(b => b._id === draggedId);
        const targetIndex = banners.findIndex(b => b._id === targetBannerId);

        if (draggedIndex === -1 || targetIndex === -1) return;

        const newBanners = [...banners];
        [newBanners[draggedIndex], newBanners[targetIndex]] = [newBanners[targetIndex], newBanners[draggedIndex]];

        for (let i = 0; i < newBanners.length; i++) {
            await fetch(`/api/banners/${newBanners[i]._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order: i }),
            });
        }

        setBanners(newBanners);
        setDraggedId(null);
    };

    const toggleBannerStatus = async (banner) => {
        try {
            await fetch(`/api/banners/${banner._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ active: !banner.active }),
            });
            fetchBanners();
        } catch (error) {
            console.error("Error toggling banner:", error);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setPreviewData(null);
        setSubmitError("");
        setSubmitSuccess("");
        setFormData({
            university: "",
            heading: "Study at Top Ranked University Abroad",
            highlightedHeading: "University",
            subHeading: "Unlock global opportunities with world-class education, industry-focused courses and amazing offers.",
            tagText: "FEATURED UNIVERSITY",
            offerPercentage: "",
            offerText: "",
            deadlineText: "",
            buttonText: "Apply Now",
            customBannerImage: "",
            customGradient: "from-purple-900 via-blue-900 to-purple-900",
            featured: false,
            active: true,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">Premium Banner Management</h1>
                        <p className="text-gray-600 mt-2">Create and manage dynamic university offer banners</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => resetForm()} className="gap-2 bg-blue-600 hover:bg-blue-700">
                                <Plus className="w-4 h-4" /> Create Banner
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">
                                    {editingId ? "Edit Premium Banner" : "Create New Premium Banner"}
                                </DialogTitle>
                            </DialogHeader>

                            <Tabs defaultValue="content" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="content">Content</TabsTrigger>
                                    <TabsTrigger value="preview">Live Preview</TabsTrigger>
                                </TabsList>

                                <TabsContent value="content" className="space-y-4">
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* University Selection */}
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Select University *</label>
                                            <Select value={formData.university} onValueChange={handleSelectChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Choose a university" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[300px]">
                                                    {universities && universities.length > 0 ? (
                                                        universities.map((uni) => (
                                                            <SelectItem key={uni._id} value={uni._id}>
                                                                {uni.universityName} - {uni.country}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <div className="p-2 text-sm text-muted-foreground text-center">No universities found. Please add universities first.</div>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Tag Text</label>
                                                <Input
                                                    name="tagText"
                                                    value={formData.tagText}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., FEATURED UNIVERSITY"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Offer Percentage</label>
                                                <Input
                                                    name="offerPercentage"
                                                    value={formData.offerPercentage}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., 50% OFF"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Main Heading</label>
                                            <Input
                                                name="heading"
                                                value={formData.heading}
                                                onChange={handleInputChange}
                                                placeholder="Study at Top Ranked University Abroad"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Highlighted Text</label>
                                                <Input
                                                    name="highlightedHeading"
                                                    value={formData.highlightedHeading}
                                                    onChange={handleInputChange}
                                                    placeholder="University"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Button Text</label>
                                                <Input
                                                    name="buttonText"
                                                    value={formData.buttonText}
                                                    onChange={handleInputChange}
                                                    placeholder="Apply Now"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Sub Heading</label>
                                            <Textarea
                                                name="subHeading"
                                                value={formData.subHeading}
                                                onChange={handleInputChange}
                                                placeholder="Unlock global opportunities..."
                                                rows={3}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Offer Text</label>
                                                <Input
                                                    name="offerText"
                                                    value={formData.offerText}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., On Tuition Fees"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Deadline Text</label>
                                                <Input
                                                    name="deadlineText"
                                                    value={formData.deadlineText}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., 06 JUNE 2025"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Custom Banner Image</label>
                                            <input
                                                id="premium-banner-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => uploadCustomBannerImage(e.target.files?.[0])}
                                            />
                                            <div
                                                className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center"
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    uploadCustomBannerImage(e.dataTransfer.files?.[0]);
                                                }}
                                            >
                                                <UploadCloud className="w-5 h-5 mx-auto text-gray-500 mb-2" />
                                                <p className="text-sm text-gray-600 mb-2">Drop image here</p>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => document.getElementById("premium-banner-upload")?.click()}
                                                    disabled={isUploadingImage}
                                                >
                                                    {isUploadingImage ? "Uploading..." : "Browse Image"}
                                                </Button>
                                            </div>
                                            {formData.customBannerImage && (
                                                <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                                                    <img
                                                        src={formData.customBannerImage}
                                                        alt="Custom banner"
                                                        className="w-full h-36 object-cover"
                                                    />
                                                </div>
                                            )}
                                            {uploadError && (
                                                <p className="text-xs font-semibold text-rose-600 mt-2">{uploadError}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Custom Gradient</label>
                                            <Input
                                                name="customGradient"
                                                value={formData.customGradient}
                                                onChange={handleInputChange}
                                                placeholder="from-purple-900 via-blue-900 to-purple-900"
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.featured}
                                                    onChange={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm font-medium">Featured Banner</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.active}
                                                    onChange={() => setFormData(prev => ({ ...prev, active: !prev.active }))}
                                                    className="w-4 h-4"
                                                />
                                                <span className="text-sm font-medium">Active</span>
                                            </label>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                                                {editingId ? "Update Banner" : "Create Banner"}
                                            </Button>
                                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                                Cancel
                                            </Button>
                                        </div>

                                        {/* Error/Success feedback */}
                                        {submitError && (
                                            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">
                                                {submitError}
                                            </div>
                                        )}
                                        {submitSuccess && (
                                            <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">
                                                {submitSuccess}
                                            </div>
                                        )}
                                    </form>
                                </TabsContent>

                                <TabsContent value="preview" className="overflow-auto">
                                    {previewData ? (
                                        <div className="rounded-none overflow-hidden" style={{ minHeight: "280px" }}>
                                            <div className={`bg-gradient-to-br ${previewData.customGradient || "from-purple-950 via-blue-950 to-purple-950"} relative w-full min-h-[280px] rounded-none overflow-hidden`}>

                                                {/* Top-left Logo */}
                                                {previewData.university?.logo && (
                                                    <div className="absolute top-3 left-4 z-20 bg-white/95 rounded-none p-1.5 shadow-lg border border-white/20">
                                                        <img
                                                            src={previewData.university.logo}
                                                            alt={previewData.university.universityName || "Logo"}
                                                            style={{ width: 44, height: 44, objectFit: "contain" }}
                                                        />
                                                    </div>
                                                )}

                                                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[280px]">
                                                    {/* LEFT SIDE */}
                                                    <div className="p-4 pl-8 lg:p-5 lg:pl-14 text-white flex flex-col justify-center">
                                                        <div className="space-y-1.5">
                                                            <div className="w-fit bg-purple-600/40 text-purple-200 border border-purple-400/50 px-2.5 py-0.5 text-[9px] font-bold tracking-wider rounded-none">
                                                                <span className="mr-1.5">🎓</span> {previewData.tagText || "FEATURED UNIVERSITY"}
                                                            </div>
                                                            <h1 className="text-xl lg:text-2xl font-extrabold leading-tight">
                                                                {previewData.heading?.split(previewData.highlightedHeading)?.[0]}
                                                                <span className="bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                                                                    {previewData.highlightedHeading}
                                                                </span>
                                                                {previewData.heading?.split(previewData.highlightedHeading)?.[1]}
                                                            </h1>
                                                            <p className="text-xs text-gray-300 max-w-md hidden sm:block">{previewData.subHeading}</p>
                                                        </div>

                                                        <div className="grid grid-cols-3 gap-3 py-3 max-w-md">
                                                            <div>
                                                                <p className="text-[8px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Intake</p>
                                                                <p className="text-[11px] font-bold text-white">{previewData.university?.intakes?.[0]?.intakeName || "Coming Soon"}</p>
                                                            </div>
                                                            <div className="border-l border-white/10 pl-3">
                                                                <p className="text-[8px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Courses</p>
                                                                <p className="text-[11px] font-bold text-white">Top Programs</p>
                                                            </div>
                                                            <div className="border-l border-white/10 pl-3">
                                                                <p className="text-[8px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Offer</p>
                                                                <p className="text-[11px] font-bold text-pink-400">{previewData.offerPercentage || "—"}</p>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-2 mt-1">
                                                            <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold px-4 py-2 rounded-none text-[11px]">
                                                                {previewData.buttonText || "Apply Now"} →
                                                            </button>
                                                            <button className="bg-white/5 text-white font-semibold px-4 py-2 rounded-none text-[11px] border border-white/10">
                                                                ▶ Book Expert
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* RIGHT SIDE - Image + Logo + Offer Card */}
                                                    <div className="relative min-h-[280px] overflow-hidden hidden lg:block">
                                                        {(previewData.customBannerImage || previewData.university?.bannerImage) && (
                                                            <>
                                                                <img
                                                                    src={previewData.customBannerImage || previewData.university?.bannerImage}
                                                                    alt="Banner"
                                                                    className="absolute inset-0 w-full h-full object-cover"
                                                                />
                                                                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-purple-950/80" />
                                                                <div className="absolute inset-0 bg-black/10" />
                                                            </>
                                                        )}

                                                        {/* Right Logo */}
                                                        {previewData.university?.logo && (
                                                            <div className="absolute top-4 right-4 z-20 bg-white/95 rounded-none p-2 shadow-xl border border-white/20">
                                                                <img
                                                                    src={previewData.university.logo}
                                                                    alt={previewData.university.universityName}
                                                                    style={{ width: 48, height: 48, objectFit: "contain" }}
                                                                />
                                                            </div>
                                                        )}

                                                        {/* Offer Card */}
                                                        <div className="absolute bottom-4 right-4 w-72 z-20 bg-gradient-to-br from-purple-600/90 to-pink-600/90 border border-white/20 rounded-none p-4 shadow-2xl">
                                                            <div className="flex items-center gap-1.5 mb-2">
                                                                <span>🔥</span>
                                                                <span className="bg-white/20 text-white border border-white/30 text-[9px] font-bold px-1.5 py-0.5 rounded-none">LIMITED TIME OFFER</span>
                                                            </div>
                                                            <div className="flex items-end justify-between gap-4">
                                                                <div>
                                                                    {previewData.offerPercentage && (
                                                                        <p className="text-2xl font-black text-white leading-none">{previewData.offerPercentage}</p>
                                                                    )}
                                                                    <p className="text-[10px] text-purple-100 mt-1">{previewData.offerText || "On Total Tuition Fees"}*</p>
                                                                </div>
                                                                {previewData.deadlineText && (
                                                                    <div className="bg-black/20 rounded-none px-3 py-1.5 border border-white/10">
                                                                        <p className="text-[9px] text-purple-200 font-bold uppercase">Deadline</p>
                                                                        <p className="text-sm font-bold text-white leading-none mt-0.5">{previewData.deadlineText}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="mt-3 pt-2 border-t border-white/10">
                                                                <p className="text-[9px] text-white italic opacity-90">*Hurry! Applications closing soon.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            Select a university to preview the banner
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Banners List */}
                <div className="bg-white rounded-lg shadow">
                    {isLoading ? (
                        <div className="p-8 text-center text-gray-500">Loading banners...</div>
                    ) : banners.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No banners yet. Create one to get started!</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead className="w-10"></TableHead>
                                        <TableHead className="font-semibold">University</TableHead>
                                        <TableHead className="font-semibold">Offer</TableHead>
                                        <TableHead className="font-semibold">Offer %</TableHead>
                                        <TableHead className="font-semibold">Deadline</TableHead>
                                        <TableHead className="font-semibold">Status</TableHead>
                                        <TableHead className="font-semibold text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {banners.map((banner) => (
                                        <TableRow
                                            key={banner._id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, banner._id)}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, banner._id)}
                                            className={`cursor-move transition-colors ${draggedId === banner._id ? "bg-blue-50" : "hover:bg-gray-50"
                                                }`}
                                        >
                                            <TableCell>
                                                <GripVertical className="w-5 h-5 text-gray-400" />
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                {banner.university?.universityName || "Unknown"}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate text-gray-600">
                                                {banner.offerText || "—"}
                                            </TableCell>
                                            <TableCell className="font-bold text-orange-600">
                                                {banner.offerPercentage || "—"}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-600">
                                                {banner.deadlineText || "—"}
                                            </TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() => toggleBannerStatus(banner)}
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold gap-1 transition-all ${banner.active
                                                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                        }`}
                                                >
                                                    {banner.active ? (
                                                        <CheckCircle className="w-3 h-3" />
                                                    ) : (
                                                        <Circle className="w-3 h-3" />
                                                    )}
                                                    {banner.active ? "Active" : "Inactive"}
                                                </button>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleEdit(banner)}
                                                        className="gap-1"
                                                    >
                                                        <Edit2 className="w-4 h-4" /> Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleDelete(banner._id)}
                                                        className="gap-1"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete
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

                {/* Tips */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-3">💡 Premium Banner System Features</h3>
                    <ul className="text-sm text-blue-800 space-y-2 grid grid-cols-2">
                        <li>✓ Drag banners to reorder carousel</li>
                        <li>✓ Live preview of changes</li>
                        <li>✓ Toggle Active/Inactive status</li>
                        <li>✓ Auto-fetch university data</li>
                        <li>✓ Fully editable text fields</li>
                        <li>✓ Custom gradient support</li>
                        <li>✓ Changes instantly on homepage</li>
                        <li>✓ Multiple banners support</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
