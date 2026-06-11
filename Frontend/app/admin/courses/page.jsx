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
import { Plus, Edit2, Trash2, CheckCircle, Circle, UploadCloud, ArrowLeft, BookOpen, Clock, ChevronDown } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function CoursesAdminPage() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [uploadError, setUploadError] = useState("");

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
            const response = await fetch("/api/courses?all=true");
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
        setUploadError("");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                    <div>
                        <Link href="/admin" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 gap-1.5 mb-2 font-medium">
                            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-bold text-gray-900">Course Management</h1>
                        <p className="text-gray-600 mt-2">Create and edit popular courses and their specializations offered on the platform</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) resetForm();
                    }}>
                        <DialogTrigger asChild>
                            <Button onClick={() => resetForm()} className="gap-2 bg-blue-600 hover:bg-blue-700 w-fit">
                                <Plus className="w-4 h-4" /> Add Course
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">
                                    {editingId ? "Edit Course Information" : "Create New Course"}
                                </DialogTitle>
                            </DialogHeader>

                            <Tabs defaultValue="content" className="w-full mt-4">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="content" className="text-xs sm:text-sm px-1.5 truncate">General</TabsTrigger>
                                    <TabsTrigger value="academic" className="text-xs sm:text-sm px-1.5 truncate">Overview & Req</TabsTrigger>
                                    <TabsTrigger value="subcourses" className="text-xs sm:text-sm px-1.5 truncate">Sub-Courses</TabsTrigger>
                                </TabsList>

                                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                                    <TabsContent value="content" className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Course Category Title *</label>
                                                <Input
                                                    name="courseName"
                                                    value={formData.courseName}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., Allied Health, Medicine, Management"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Course Level *</label>
                                                <Select value={formData.category} onValueChange={handleSelectChange}>
                                                    <SelectTrigger className="w-full">
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

                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Short Description *</label>
                                            <Textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                placeholder="Brief summary for popular course card..."
                                                rows={2}
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Duration (e.g., 3-4 Years) *</label>
                                                <Input
                                                    name="duration"
                                                    value={formData.duration}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., 3 Years, 2 Years"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-gray-700">Estimated Tuition Fees *</label>
                                                <Input
                                                    name="fees"
                                                    value={formData.fees}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., $15,000 / Year"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Course Image</label>
                                            <input
                                                id="course-image-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleImageUpload(e.target.files?.[0])}
                                            />
                                            <div
                                                className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    handleImageUpload(e.dataTransfer.files?.[0]);
                                                }}
                                                onClick={() => document.getElementById("course-image-upload")?.click()}
                                            >
                                                <UploadCloud className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                                                <p className="text-sm font-medium text-gray-700">Drag & drop course banner or click to browse</p>
                                                <p className="text-xs text-gray-500 mt-1">Recommended: 800x500 px (Max 5MB)</p>
                                            </div>
                                            {isUploadingImage && <p className="text-sm text-blue-600 mt-2 font-medium">Uploading image, please wait...</p>}
                                            {formData.image && (
                                                <div className="mt-3 relative rounded-lg overflow-hidden border border-gray-200 w-fit">
                                                    <img
                                                        src={formData.image}
                                                        alt="Course preview"
                                                        className="h-28 w-44 object-cover"
                                                    />
                                                </div>
                                            )}
                                            {uploadError && (
                                                <p className="text-xs font-semibold text-rose-600 mt-2">{uploadError}</p>
                                            )}
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.status}
                                                    onChange={() => setFormData(prev => ({ ...prev, status: !prev.status }))}
                                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm font-medium text-gray-700">Show on homepage (Active)</span>
                                            </label>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="academic" className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Course Overview (Detailed) *</label>
                                            <Textarea
                                                name="overview"
                                                value={formData.overview}
                                                onChange={handleInputChange}
                                                placeholder="Provide a comprehensive course description, scope, and objectives..."
                                                rows={5}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Admission / Academic Requirements</label>
                                            <Textarea
                                                name="requirements"
                                                value={formData.requirements}
                                                onChange={handleInputChange}
                                                placeholder="Specify academic scores, prerequisite subjects, eligibility criteria..."
                                                rows={3}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Career & Placement Opportunities</label>
                                            <Textarea
                                                name="opportunities"
                                                value={formData.opportunities}
                                                onChange={handleInputChange}
                                                placeholder="What jobs or roles can graduates apply for? Placement scope..."
                                                rows={3}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Key Subjects Covered (comma-separated)</label>
                                            <Input
                                                name="subjectsInput"
                                                value={formData.subjectsInput}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Financial Accounting, Micro Economics, Business Law"
                                            />
                                            <p className="text-xs text-muted-foreground mt-1">Separate subjects with commas (e.g. Subject A, Subject B)</p>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="subcourses" className="space-y-4">
                                        {/* Add Sub-Course Form */}
                                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                                            <h4 className="font-bold text-slate-800 text-sm">Add / Edit Sub-Course (Specialization)</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1 text-slate-600">Sub-Course Name *</label>
                                                    <Input
                                                        value={newSubCourse.name}
                                                        onChange={(e) => setNewSubCourse(prev => ({ ...prev, name: e.target.value }))}
                                                        placeholder="e.g., Hotel Management"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1 text-slate-600">Duration</label>
                                                    <Input
                                                        value={newSubCourse.duration}
                                                        onChange={(e) => setNewSubCourse(prev => ({ ...prev, duration: e.target.value }))}
                                                        placeholder="e.g., 3 Years"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1 text-slate-600">Tuition Fees</label>
                                                    <Input
                                                        value={newSubCourse.fees}
                                                        onChange={(e) => setNewSubCourse(prev => ({ ...prev, fees: e.target.value }))}
                                                        placeholder="e.g., $11,500 / Year"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1 text-slate-600">Overview / Focus Area</label>
                                                    <Textarea
                                                        value={newSubCourse.overview}
                                                        onChange={(e) => setNewSubCourse(prev => ({ ...prev, overview: e.target.value }))}
                                                        placeholder="Specific courses, skills learned..."
                                                        rows={2}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-semibold mb-1 text-slate-600">Career Outcomes</label>
                                                    <Textarea
                                                        value={newSubCourse.careerOutcomes}
                                                        onChange={(e) => setNewSubCourse(prev => ({ ...prev, careerOutcomes: e.target.value }))}
                                                        placeholder="Specific job titles, salary estimates..."
                                                        rows={2}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <Button
                                                    type="button"
                                                    onClick={handleAddSubCourse}
                                                    className="bg-blue-600 text-white hover:bg-blue-700 text-xs px-4 py-2"
                                                >
                                                    {subCourseEditIndex !== null ? "Update Specialization" : "Add Specialization"}
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Added Sub-Courses List */}
                                        <div className="space-y-2 mt-4">
                                            <h4 className="font-bold text-gray-700 text-sm">Listed Sub-Courses ({subCourses.length})</h4>
                                            {subCourses.length === 0 ? (
                                                <p className="text-sm text-gray-400 italic">No sub-courses added yet. Use the form above to add some.</p>
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
                                                                                className="h-7 px-2 text-[10px]"
                                                                            >
                                                                                Edit
                                                                            </Button>
                                                                            <Button
                                                                                type="button"
                                                                                size="sm"
                                                                                variant="destructive"
                                                                                onClick={() => handleRemoveSubCourse(i)}
                                                                                className="h-7 px-2 text-[10px]"
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
                                    </TabsContent>

                                    <div className="flex gap-3 justify-end pt-4 border-t">
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6">
                                            {editingId ? "Save Changes" : "Create Course"}
                                        </Button>
                                    </div>
                                </form>
                            </Tabs>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Courses List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
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
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold gap-1 transition-all ${currentStatus
                                                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                            }`}
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
