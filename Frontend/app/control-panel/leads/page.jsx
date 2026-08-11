"use client";

import { useState, useEffect } from "react";
import { 
    Search, Download, Trash2, Mail, Phone, Calendar, 
    ExternalLink, CheckCircle2, Clock, XCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function LeadsAdminPage() {
    const [leads, setLeads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterService, setFilterService] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [selectedLead, setSelectedLead] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const SERVICES = [
        "All",
        "Career Counselling",
        "Domestic Education",
        "Overseas Education",
        "Domestic Recruitment",
        "Overseas Recruitment",
        "General Inquiry"
    ];

    const STATUSES = ["All", "New", "Contacted", "Follow Up", "Converted", "Closed"];
    const UPDATE_STATUSES = ["New", "Contacted", "Follow Up", "Converted", "Closed"];

    const fetchLeads = async () => {
        try {
            setIsLoading(true);
            const params = new URLSearchParams();
            if (searchQuery) params.append("search", searchQuery);
            if (filterService !== "All") params.append("serviceType", filterService);
            if (filterStatus !== "All") params.append("status", filterStatus);

            const res = await fetch(`/api/leads?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setLeads(data);
            }
        } catch (error) {
            console.error("Error fetching leads:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [searchQuery, filterService, filterStatus]);

    const handleStatusChange = async (leadId, newStatus) => {
        try {
            const res = await fetch(`/api/leads/${leadId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setLeads(leads.map(lead => 
                    lead._id === leadId ? { ...lead, status: newStatus } : lead
                ));
                if (selectedLead && selectedLead._id === leadId) {
                    setSelectedLead({ ...selectedLead, status: newStatus });
                }
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleDelete = async (leadId) => {
        if (!confirm("Are you sure you want to delete this lead?")) return;

        try {
            const res = await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
            if (res.ok) {
                setLeads(leads.filter(lead => lead._id !== leadId));
                setIsDialogOpen(false);
            }
        } catch (error) {
            console.error("Error deleting lead:", error);
        }
    };

    const handleExportCSV = () => {
        if (leads.length === 0) return;

        const headers = ["Date", "First Name", "Last Name", "Email", "Phone", "Service", "Source", "Status", "Message"];
        
        const csvContent = [
            headers.join(","),
            ...leads.map(lead => [
                new Date(lead.createdAt).toLocaleDateString(),
                `"${lead.firstName}"`,
                `"${lead.lastName}"`,
                `"${lead.email}"`,
                `"${lead.phone || ""}"`,
                `"${lead.serviceType}"`,
                `"${lead.sourcePage || ""}"`,
                `"${lead.status}"`,
                `"${(lead.message || "").replace(/"/g, '""')}"`
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `career_lounge_leads_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "New": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Contacted": return "bg-amber-100 text-amber-700 border-amber-200";
            case "Follow Up": return "bg-purple-100 text-purple-700 border-purple-200";
            case "Converted": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "Closed": return "bg-slate-100 text-slate-700 border-slate-200";
            default: return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Lead Management</h1>
                    <p className="text-slate-500 mt-1">Track and manage student and professional inquiries.</p>
                </div>
                <Button onClick={handleExportCSV} variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Export CSV
                </Button>
            </div>

            {/* Filters bar */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-9 bg-slate-50 border-slate-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex gap-4">
                    <Select value={filterService} onValueChange={setFilterService}>
                        <SelectTrigger className="w-[200px] bg-slate-50">
                            <SelectValue placeholder="Filter by Service" />
                        </SelectTrigger>
                        <SelectContent>
                            {SERVICES.map(service => (
                                <SelectItem key={service} value={service}>{service}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-[160px] bg-slate-50">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {STATUSES.map(status => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50 border-b border-slate-200">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-semibold text-slate-700">Lead</TableHead>
                                <TableHead className="font-semibold text-slate-700">Contact</TableHead>
                                <TableHead className="font-semibold text-slate-700">Service</TableHead>
                                <TableHead className="font-semibold text-slate-700">Date</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-center">Status</TableHead>
                                <TableHead className="font-semibold text-slate-700 text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                                        Loading leads...
                                    </TableCell>
                                </TableRow>
                            ) : leads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                                        No leads found matching your criteria.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                leads.map((lead) => (
                                    <TableRow key={lead._id} className="hover:bg-slate-50/50 cursor-pointer" onClick={() => { setSelectedLead(lead); setIsDialogOpen(true); }}>
                                        <TableCell>
                                            <div className="font-medium text-slate-900">{lead.firstName} {lead.lastName}</div>
                                            {lead.sourcePage && (
                                                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                                    <ExternalLink className="w-3 h-3" /> {lead.sourcePage}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                    {lead.email}
                                                </div>
                                                {lead.phone && (
                                                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                                                        {lead.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                                                {lead.serviceType}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="h-8">View</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Lead Details Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            Lead Details
                        </DialogTitle>
                    </DialogHeader>
                    
                    {selectedLead && (
                        <div className="space-y-6 mt-4">
                            {/* Top Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-3">
                                    <h3 className="font-semibold text-slate-900 border-b pb-2">Contact Info</h3>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-semibold">Name</div>
                                        <div className="font-medium text-slate-900">{selectedLead.firstName} {selectedLead.lastName}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-semibold">Email</div>
                                        <div className="text-slate-700 flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-slate-400" /> {selectedLead.email}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-semibold">Phone</div>
                                        <div className="text-slate-700 flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-slate-400" /> {selectedLead.phone || "Not provided"}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg space-y-3">
                                    <h3 className="font-semibold text-slate-900 border-b pb-2">Inquiry Details</h3>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-semibold">Service Area</div>
                                        <div className="font-medium text-slate-900">{selectedLead.serviceType}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-semibold">Date Submitted</div>
                                        <div className="text-slate-700 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-slate-400" /> 
                                            {new Date(selectedLead.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase font-semibold">Source Page</div>
                                        <div className="text-slate-700">{selectedLead.sourcePage || "Direct Request"}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Context Data (If applied from a University or Job) */}
                            {selectedLead.contextData && Object.keys(selectedLead.contextData).length > 0 && (
                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                                    <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> Context Data
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(selectedLead.contextData).map(([key, value]) => (
                                            <div key={key}>
                                                <div className="text-xs text-blue-700/70 uppercase font-semibold">{key}</div>
                                                <div className="font-medium text-blue-900">{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Message */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-slate-900">Message</h3>
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg whitespace-pre-wrap text-slate-700 text-sm leading-relaxed">
                                    {selectedLead.message}
                                </div>
                            </div>

                            {/* Management Actions */}
                            <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <span className="text-sm font-medium text-slate-700">Update Status:</span>
                                    <Select 
                                        value={selectedLead.status} 
                                        onValueChange={(val) => handleStatusChange(selectedLead._id, val)}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {UPDATE_STATUSES.map(status => (
                                                <SelectItem key={status} value={status}>{status}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                
                                <Button 
                                    variant="destructive" 
                                    className="w-full md:w-auto gap-2"
                                    onClick={() => handleDelete(selectedLead._id)}
                                >
                                    <Trash2 className="w-4 h-4" /> Delete Lead
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
