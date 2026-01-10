"use client";

import { useState } from "react";
import { UploadCloud, FileText, Trash2, Calendar, HardDrive } from "lucide-react";

export default function StaffDocumentsPage() {
    const [files, setFiles] = useState([
        { id: 1, name: "Ders Izlencesi.pdf", size: "1.2 MB", date: "05.10.2025" },
        { id: 2, name: "Hafta 1 Sunum.pptx", size: "4.8 MB", date: "08.10.2025" },
    ]);

    const handleDelete = (id: number) => {
        setFiles(files.filter(f => f.id !== id));
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="page-title">Doküman Paylaşımı</h1>
                <p className="page-subtitle">Öğrencilerle dosya paylaşın</p>
            </div>

            <div className="card">
                <div className="card-body">
                    {/* Upload Area */}
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="flex flex-col items-center justify-center py-6">
                            <UploadCloud className="w-10 h-10 mb-3 text-slate-400" />
                            <p className="mb-1 text-sm text-slate-600">
                                <span className="font-medium">Dosya yüklemek için tıklayın</span> veya sürükleyip bırakın
                            </p>
                            <p className="text-xs text-slate-400">PDF, DOCX, PPTX (Max. 10MB)</p>
                        </div>
                        <input type="file" className="hidden" />
                    </label>

                    {/* File List */}
                    <div className="mt-8">
                        <h3 className="section-title mb-4">Paylaşılan Dosyalar</h3>
                        <div className="space-y-2">
                            {files.map((file) => (
                                <div
                                    key={file.id}
                                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{file.name}</p>
                                            <div className="flex items-center gap-3 text-xs text-slate-400">
                                                <span className="flex items-center gap-1">
                                                    <HardDrive className="w-3 h-3" />
                                                    {file.size}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {file.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(file.id)}
                                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
