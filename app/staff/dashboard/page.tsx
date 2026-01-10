import { Users, BookOpen, AlertCircle, ArrowUpRight, FileBarChart } from "lucide-react";

export default function StaffDashboard() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-title">Genel Bakış</h1>
                    <p className="page-subtitle">Güz 2025 Dönemi</p>
                </div>
                <button className="btn btn-primary">
                    <FileBarChart className="w-4 h-4" />
                    Rapor Oluştur
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="stat-card">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="stat-label">Aktif Ders Sayısı</p>
                            <p className="stat-value mt-1">4</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="stat-label">Toplam Öğrenci</p>
                            <p className="stat-value mt-1">142</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <Users className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="stat-label">Bekleyen Mazeret</p>
                            <p className="stat-value mt-1">2</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Table */}
            <div className="card overflow-hidden">
                <div className="card-header flex items-center justify-between">
                    <h2 className="section-title">Derslerim</h2>
                    <span className="text-xs text-slate-400">Bu dönem</span>
                </div>
                <div className="table-container border-0 rounded-none">
                    <table className="table-base">
                        <thead>
                            <tr>
                                <th>Ders Kodu</th>
                                <th>Ders Adı</th>
                                <th>Bölüm</th>
                                <th className="text-right">Öğrenci</th>
                                <th className="w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { code: "CS-101", name: "Bilgisayar Bilimlerine Giriş", dept: "Bilgisayar Müh.", count: 45 },
                                { code: "CS-202", name: "Veri Yapıları", dept: "Bilgisayar Müh.", count: 38 },
                                { code: "MATH-102", name: "Calculus II", dept: "Ortak", count: 59 },
                            ].map((course) => (
                                <tr key={course.code} className="group">
                                    <td>
                                        <span className="font-mono font-semibold text-slate-800">{course.code}</span>
                                    </td>
                                    <td className="text-slate-700">{course.name}</td>
                                    <td className="text-slate-500">{course.dept}</td>
                                    <td className="text-right">
                                        <span className="font-semibold text-slate-800">{course.count}</span>
                                    </td>
                                    <td className="text-right">
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-700 p-1">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
