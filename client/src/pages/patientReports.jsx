import React, { useState, useEffect } from "react";
import { Upload, FileText, Image, Calendar, User, Eye, File, Download, Search, Filter, Plus } from "lucide-react";
import ApiConstants from "../constants/apiConstants";
import Cookies from "js-cookie";

const buildViewUrl = (reportId) => {
    return `${ApiConstants.API_VIEW_REPORT}/${reportId}`;
};

const PatientReports = () => {
    const [reports, setReports] = useState([]);
    const [file, setFile] = useState(null);
    const [notes, setNotes] = useState("");
    const [scan, setScan] = useState(true);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [expandedReport, setExpandedReport] = useState(null);
    const [patientId, setPatientId] = useState(null);
    const token = Cookies.get("jwt");

    // Mock data for demo - replace with actual API call
    const mockReports = [
        {
            _id: "1",
            title: "Blood Test Results - January 2025",
            fileUrl: "/reports/blood-test-jan-2025.pdf",
            fileType: "application/pdf",
            uploadedAt: "2025-01-15T10:30:00Z",
            notes: "Routine blood work showing normal values across all parameters",
            scanResult: "**Blood Test Results**\n\n- Hemoglobin: 14.2 g/dL (Normal)\n- White Blood Cells: 6,800/μL (Normal)\n- Platelets: 250,000/μL (Normal)\n\n*All values within normal range*"
        },
        {
            _id: "2",
            title: "X-Ray Chest - December 2024",
            fileUrl: "/reports/xray-chest-dec-2024.png",
            fileType: "image/png",
            uploadedAt: "2024-12-20T14:15:00Z",
            notes: "Follow-up chest X-ray after pneumonia treatment",
            scanResult: "**Chest X-Ray Report**\n\nFindings:\n- Clear lung fields bilaterally\n- No signs of consolidation\n- Heart size within normal limits\n\n**Impression:** Normal chest radiograph"
        },
        {
            _id: "3",
            title: "MRI Brain Scan",
            fileUrl: "/reports/mri-brain-2024.pdf",
            fileType: "application/pdf",
            uploadedAt: "2024-11-10T09:45:00Z",
            notes: null,
            scanResult: null
        }
    ];

    // Fetch reports (replace with actual API call)
    const fetchReports = async () => {
        try {
            const response = await fetch(ApiConstants.API_ALL_REPORTS, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });

            const data = await response.json();

            if (data.error || response.status !== 200) throw new Error("Failed to get response");
            setReports(data.reports);
        } catch (err) {
            console.error("Error fetching reports", err);
        }
    };

    const fetchPatient = async () => {
        try {
            const response = await fetch(ApiConstants.API_ME, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });
            const data = await response.json();
            if (data.error || response.status !== 200) throw new Error("Failed to get patient data");
            setPatientId(data._id);
        } catch (err) {
            console.error("Error fetching patient data", err);
        }
    }

    useEffect(() => {
        fetchPatient();
        fetchReports();
    }, []);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);

        // If it's an image, enable scan by default
        if (selected && selected.type.startsWith("image/")) {
            setScan(true);
        } else {
            setScan(false);
        }
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file.");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("notes", notes);
        formData.append("scan", scan);
        formData.append("title", file.name);
        formData.append("patientId", patientId);

        setLoading(true);
        try {
            const res = await fetch(ApiConstants.API_UPLOAD_REPORT, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");
            await fetchReports(); // Refresh list
            setFile(null);
            setNotes("");
            setScan(true);
            setShowUploadForm(false);
        } catch (err) {
            console.error("Upload error", err);
            alert("Failed to upload report");
        } finally {
            setLoading(false);
        }
    };

    const getFileIcon = (fileType) => {
        if (fileType.startsWith("image/")) {
            return <Image className="w-5 h-5 text-blue-500" />;
        } else if (fileType === "application/pdf") {
            return <FileText className="w-5 h-5 text-red-500" />;
        }
        return <File className="w-5 h-5 text-gray-500" />;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const renderMarkdown = (text) => {
        if (!text) return null;

        // Simple markdown renderer for basic formatting
        const lines = text.split('\n');
        return lines.map((line, index) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return <h4 key={index} className="font-semibold text-gray-800 mt-2 mb-1">{line.slice(2, -2)}</h4>;
            } else if (line.startsWith('- ')) {
                return <li key={index} className="ml-4 text-gray-700">{line.slice(2)}</li>;
            } else if (line.startsWith('*') && line.endsWith('*')) {
                return <p key={index} className="italic text-gray-600 mt-1">{line.slice(1, -1)}</p>;
            } else if (line.trim()) {
                return <p key={index} className="text-gray-700 mt-1">{line}</p>;
            }
            return <br key={index} />;
        });
    };

    const filteredReports = reports.filter(report => {
        const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.notes.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === "all" ||
            (filterType === "pdf" && report.fileType === "application/pdf") ||
            (filterType === "image" && report.fileType.startsWith("image/"));
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-6xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Patient Reports</h1>
                    <p className="text-gray-600">Manage and view your medical reports</p>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search reports..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-500" />
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Types</option>
                                <option value="pdf">PDF Files</option>
                                <option value="image">Images</option>
                            </select>
                        </div>

                        {/* Upload Button */}
                        <button
                            onClick={() => setShowUploadForm(!showUploadForm)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            Upload Report
                        </button>
                    </div>
                </div>

                {/* Upload Form */}
                {showUploadForm && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-l-4 border-blue-500">
                        <div className="flex items-center gap-2 mb-4">
                            <Upload className="w-6 h-6 text-blue-600" />
                            <h2 className="text-xl font-semibold text-gray-800">Upload New Report</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select File
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:font-medium border border-gray-300 rounded-lg cursor-pointer"
                                />
                                {file && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Notes (Optional)
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add any relevant notes about this report..."
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    rows={3}
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="scan"
                                    checked={scan}
                                    onChange={(e) => setScan(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label htmlFor="scan" className="text-sm text-gray-700 flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    Scan image for text description/translation (OCR)
                                </label>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={handleUpload}
                                    disabled={loading || !file}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${loading || !file
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`}
                                >
                                    <Upload className="w-4 h-4" />
                                    {loading ? "Uploading..." : "Upload Report"}
                                </button>
                                <button
                                    onClick={() => setShowUploadForm(false)}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reports List */}
                <div className="space-y-6">
                    {filteredReports.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-500 mb-2">No reports found</h3>
                            <p className="text-gray-400">Upload your first medical report to get started</p>
                        </div>
                    ) : (
                        filteredReports.map((report) => (
                            <div
                                key={report._id}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {getFileIcon(report.fileType)}
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                                    {report.title}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(report.uploadedAt)}
                                                    </div>
                                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                                                        {report.fileType.split('/')[1].toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <a
                                                href={`${ApiConstants.API_VIEW_REPORT}/${report._id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View
                                            </a>
                                            <button
                                                onClick={() => setExpandedReport(expandedReport === report._id ? null : report._id)}
                                                className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded transition-colors"
                                            >
                                                {expandedReport === report._id ? "Less" : "More"}
                                            </button>
                                        </div>
                                    </div>

                                    {report.notes && (
                                        <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium text-yellow-800">Notes:</span> {report.notes}
                                            </p>
                                        </div>
                                    )}

                                    {expandedReport === report._id && !report.scanResult && !report.fileType.startsWith("image/") && (
                                        <div className="text-sm text-gray-500 italic">
                                            No scanned result available for this report.
                                        </div>
                                    )}

                                    {expandedReport === report._id && (report.fileType.startsWith("image/") || report.scanResult) && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {report.fileType?.startsWith("image/") && (
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                            Image
                                                        </h4>
                                                        <img
                                                            src={buildViewUrl(report._id)}
                                                            alt="Report"
                                                            className="w-full max-h-[500px] object-contain rounded-md border"
                                                        />
                                                    </div>
                                                )}

                                                {report.scanResult && (
                                                    <div className="flex-1 overflow-auto">
                                                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                                            <Eye className="w-4 h-4" />
                                                            Scanned result (Image Description)
                                                        </h4>
                                                        <div className="text-sm prose prose-sm max-w-none">
                                                            {renderMarkdown(report.scanResult)}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientReports;