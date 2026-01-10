import { FileText, Download, Calendar, HardDrive } from "lucide-react";

export default function DocumentsPage() {
    const documents = [
        { name: "Ders Notları - Hafta 1.pdf", course: "CS-101", size: "2.6 MB", date: "10.10.2025" },
        { name: "Laboratuvar Kılavuzu.pdf", course: "PHYS-101", size: "1.2 MB", date: "08.10.2025" },
        { name: "Ödev Talimatları.pdf", course: "CS-202", size: "450 KB", date: "05.10.2025" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="page-title">Ders Materyalleri</h1>
                <p className="page-subtitle">Paylaşılan dosyalar ve dökümanlar</p>
            </div>

            <div className="card overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {documents.map((doc, i) => (
                        <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">{doc.name}</p>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                        <span className="badge badge-gray">{doc.course}</span>
                                        <span className="flex items-center gap-1">
                                            <HardDrive className="w-3 h-3" />
                                            {doc.size}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {doc.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className="p-2.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                <Download className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
