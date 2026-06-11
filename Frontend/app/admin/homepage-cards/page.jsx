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
    Sparkles,
    UploadCloud,
    Check,
    X,
    Folder,
    BookOpen,
    MapPin,
    GraduationCap,
    Sliders,
    ArrowUp,
    ArrowDown,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const CARD_TYPES = [
    { id: "career-counselling", label: "Career Guidance", icon: Sliders },
    { id: "test-prep", label: "Test Preparation", icon: GraduationCap },
    { id: "study-destination", label: "Study Destinations", icon: MapPin },
    { id: "popular-course", label: "Popular Courses", icon: BookOpen },
];

export default function HomePageCardsAdmin() {
    const [selectedTab, setSelectedTab] = useState("career-counselling");
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");

    const [formData, setFormData] = useState({
        type: "career-counselling",
        title: "",
        subtitle: "",
        description: "",
        image: "",
        iconName: "",
        buttonText: "Explore",
        buttonLink: "",
        displayOrder: 0,
        isActive: true,
        totalUniversities: 0,
    });

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/homepage-cards?all=true");
            const result = await response.json();
            if (result.success) {
                setCards(result.data);
            }
        } catch (error) {
            console.error("Error fetching homepage cards:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const filtered = cards.filter((card) => card.type === selectedTab);
        setFilteredCards(filtered);
    }, [selectedTab, cards]);

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
            body.append("folder", "homepage-cards");

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
                image: result.url,
            }));
        } catch (error) {
            console.error("Card image upload failed:", error);
            setUploadError(error.message || "Could not upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            type: selectedTab,
            displayOrder: Number(formData.displayOrder) || 0,
            totalUniversities: Number(formData.totalUniversities) || 0,
        };

        try {
            const url = editingId
                ? `/api/homepage-cards/${editingId}`
                : "/api/homepage-cards";
            const method = editingId ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (result.success) {
                setIsDialogOpen(false);
                resetForm();
                fetchCards();
            } else {
                alert("Error: " + (result.error || "Could not save card"));
            }
        } catch (error) {
            console.error("Error saving card:", error);
            alert("Error saving card.");
        }
    };

    const handleEdit = (card) => {
        setEditingId(card._id);
        setFormData({
            type: card.type || selectedTab,
            title: card.title || "",
            subtitle: card.subtitle || "",
            description: card.description || "",
            image: card.image || "",
            iconName: card.iconName || "",
            buttonText: card.buttonText || "Explore",
            buttonLink: card.buttonLink || "",
            displayOrder: card.displayOrder || 0,
            isActive: card.isActive !== undefined ? card.isActive : true,
            totalUniversities: card.totalUniversities || 0,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this card? This action is permanent!")) {
            try {
                const response = await fetch(`/api/homepage-cards/${id}`, {
                    method: "DELETE",
                });
                const result = await response.json();
                if (result.success) {
                    fetchCards();
                } else {
                    alert("Error: " + (result.error || "Could not delete card"));
                }
            } catch (error) {
                console.error("Error deleting card:", error);
            }
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            type: selectedTab,
            title: "",
            subtitle: "",
            description: "",
            image: "",
            iconName: "",
            buttonText: "Explore",
            buttonLink: "",
            displayOrder: filteredCards.length + 1,
            isActive: true,
            totalUniversities: 0,
        });
    };

    const toggleCardStatus = async (card) => {
        try {
            const response = await fetch(`/api/homepage-cards/${card._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isActive: !card.isActive }),
            });
            const result = await response.json();
            if (result.success) {
                fetchCards();
            } else {
                alert("Error: " + (result.error || "Could not update status"));
            }
        } catch (error) {
            console.error("Error toggling status:", error);
        }
    };

    const getTabTitle = (tabId) => {
        switch (tabId) {
            case "career-counselling":
                return "Career Guidance";
            case "test-prep":
                return "Test Prep";
            case "study-destination":
                return "Study Destinations";
            case "popular-course":
                return "Popular Courses";
            default:
                return "Cards";
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 sm:p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            ✨ Home Cards <span className="text-xs bg-amber-50 text-amber-600 px-2 py-1 rounded-full font-bold uppercase tracking-wider">{getTabTitle(selectedTab)}</span>
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm">Create and modify card elements featured dynamically on the homepage.</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => resetForm()}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-100 rounded-xl gap-2 h-11"
                            >
                                <Plus className="w-5 h-5" /> Add Card
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl w-[90vw] max-h-[85vh] flex flex-col p-0 overflow-hidden bg-white shadow-2xl rounded-2xl border-none">
                            <DialogHeader className="p-6 bg-slate-900 text-white relative shrink-0">
                                <DialogTitle className="text-xl font-bold tracking-wide flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-amber-400" />
                                    {editingId ? "Modify Homepage Card" : `Add new ${getTabTitle(selectedTab)} Card`}
                                </DialogTitle>
                                <p className="text-xs text-slate-300 mt-1">Configure layout, details and display logic for the card.</p>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    
                                    {/* Dynamic Inputs depending on type */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">
                                            {selectedTab === "career-counselling" && "Service Title"}
                                            {selectedTab === "test-prep" && "Exam Name"}
                                            {selectedTab === "study-destination" && "Country Name"}
                                            {selectedTab === "popular-course" && "Course Name"}
                                            <span className="text-rose-500"> *</span>
                                        </label>
                                        <Input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="e.g., IELTS, Canada, Resume Building"
                                            required
                                            className="rounded-lg border-slate-200"
                                        />
                                    </div>

                                    {selectedTab === "career-counselling" && (
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Subtitle</label>
                                            <Input
                                                name="subtitle"
                                                value={formData.subtitle}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Premium Service"
                                                className="rounded-lg border-slate-200"
                                            />
                                        </div>
                                    )}

                                    {selectedTab === "test-prep" && (
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Target score subtitle</label>
                                            <Input
                                                name="subtitle"
                                                value={formData.subtitle}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Target: 7.0+"
                                                className="rounded-lg border-slate-200"
                                            />
                                        </div>
                                    )}

                                    {selectedTab === "study-destination" && (
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Total Universities</label>
                                            <Input
                                                name="totalUniversities"
                                                type="number"
                                                value={formData.totalUniversities}
                                                onChange={handleInputChange}
                                                placeholder="e.g., 96"
                                                className="rounded-lg border-slate-200"
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-700">
                                            {selectedTab === "study-destination" ? "Short Description" : "Description"}
                                        </label>
                                        <Textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Write a brief overview to display on the card..."
                                            rows={3}
                                            className="rounded-lg border-slate-200 resize-none"
                                        />
                                    </div>

                                    {/* Upload/URL of Card Image */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700">
                                                {selectedTab === "study-destination" ? "Country Image (Flag/Landscape)" : "Card Image"}
                                            </label>
                                            <input
                                                id="card-image-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => uploadImage(e.target.files?.[0])}
                                            />
                                            <div
                                                className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/70 p-3 text-center cursor-pointer hover:bg-slate-50 transition"
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    uploadImage(e.dataTransfer.files?.[0]);
                                                }}
                                                onClick={() => document.getElementById("card-image-upload")?.click()}
                                            >
                                                <UploadCloud className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                                                <p className="text-[11px] text-slate-600 font-semibold">Click to upload file</p>
                                                <span className="text-[9px] text-slate-400">
                                                    {uploading ? "Uploading..." : "Supports PNG, JPG"}
                                                </span>
                                            </div>
                                            {uploadError && (
                                                <p className="text-[10px] font-semibold text-rose-600">{uploadError}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700">Direct Image URL</label>
                                            <Input
                                                name="image"
                                                value={formData.image}
                                                onChange={handleInputChange}
                                                placeholder="Or paste direct image link"
                                                className="rounded-lg border-slate-200 text-xs"
                                            />
                                            {formData.image && (
                                                <div className="mt-2 h-14 w-24 rounded overflow-hidden border border-slate-200 bg-white">
                                                    <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {selectedTab === "career-counselling" && (
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Lucide Icon Name</label>
                                            <select
                                                name="iconName"
                                                value={formData.iconName}
                                                onChange={handleInputChange}
                                                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select Icon...</option>
                                                <option value="UserRoundSearch">UserRoundSearch</option>
                                                <option value="FileText">FileText</option>
                                                <option value="ClipboardList">ClipboardList</option>
                                                <option value="Compass">Compass</option>
                                                <option value="GraduationCap">GraduationCap</option>
                                                <option value="Briefcase">Briefcase</option>
                                            </select>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Button Text</label>
                                            <Input
                                                name="buttonText"
                                                value={formData.buttonText}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Explore"
                                                className="rounded-lg border-slate-200"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">
                                                {selectedTab === "career-counselling" ? "Button Link" : "Link"}
                                            </label>
                                            <Input
                                                name="buttonLink"
                                                value={formData.buttonLink}
                                                onChange={handleInputChange}
                                                placeholder="e.g., /services"
                                                className="rounded-lg border-slate-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 items-center">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-700">Display Order</label>
                                            <Input
                                                name="displayOrder"
                                                type="number"
                                                value={formData.displayOrder}
                                                onChange={handleInputChange}
                                                className="rounded-lg border-slate-200"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 pt-5">
                                            <input
                                                type="checkbox"
                                                id="isActive"
                                                checked={formData.isActive}
                                                onChange={(e) => handleCheckboxChange(e.target.checked)}
                                                className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                                            />
                                            <label htmlFor="isActive" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                                                Active Status
                                            </label>
                                        </div>
                                    </div>

                                </div>

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
                                        Save Card
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Tabs selection row */}
                <div className="flex border-b border-slate-200 bg-white p-2 gap-1 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] mb-8 overflow-x-auto">
                    {CARD_TYPES.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`flex items-center gap-2 px-5 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap
                                    ${selectedTab === tab.id
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                    }`}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Table & Listings Container */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden">
                    {isLoading ? (
                        <div className="p-20 text-center text-slate-400">
                            <span className="inline-block animate-pulse font-semibold">Loading home page cards...</span>
                        </div>
                    ) : filteredCards.length === 0 ? (
                        <div className="p-20 text-center text-slate-400 font-medium flex flex-col items-center gap-3">
                            <Folder className="w-10 h-10 text-slate-300" />
                            <span>No cards registered under this category. Click "Add Card" to create one.</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-slate-50/70 border-b border-slate-100">
                                    <TableRow>
                                        <TableHead className="w-[100px]">Image/Icon</TableHead>
                                        <TableHead>Card Name</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="w-[120px] text-center">Display Order</TableHead>
                                        <TableHead className="w-[120px] text-center">Status</TableHead>
                                        <TableHead className="w-[120px] text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCards.map((card) => (
                                        <TableRow key={card._id} className="hover:bg-slate-50/50 transition-all border-b border-slate-100">
                                            <TableCell>
                                                {card.image ? (
                                                    <div className="h-10 w-16 rounded overflow-hidden border border-slate-100 bg-white flex items-center justify-center p-0.5">
                                                        <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
                                                    </div>
                                                ) : card.iconName ? (
                                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 font-bold text-xs text-blue-700 uppercase border border-blue-100">
                                                        {card.iconName.slice(0, 3)}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400 italic text-xs">No media</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-bold text-slate-900">
                                                <div>{card.title}</div>
                                                {card.subtitle && (
                                                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase mt-1 inline-block">
                                                        {card.subtitle}
                                                    </span>
                                                )}
                                                {card.totalUniversities > 0 && (
                                                    <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase mt-1 inline-block">
                                                        {card.totalUniversities} Universities
                                                    </span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-slate-600 text-xs max-w-[300px] truncate">
                                                {card.description || <span className="text-slate-400 italic">No description</span>}
                                            </TableCell>
                                            <TableCell className="text-center font-semibold text-slate-700">
                                                {card.displayOrder}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <button
                                                    onClick={() => toggleCardStatus(card)}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold transition-all border
                                                        ${card.isActive
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                                            : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                                                        }`}
                                                >
                                                    {card.isActive ? (
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
                                            <TableCell className="py-4 text-right">
                                                <div className="flex gap-1.5 justify-end">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleEdit(card)}
                                                        className="h-8 w-8 p-0 rounded-md border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                                                        title="Edit Card"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleDelete(card._id)}
                                                        className="h-8 w-8 p-0 rounded-md text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                                                        title="Delete Card"
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
