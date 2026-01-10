import { TrendingUp, Award, BookOpen } from "lucide-react";

export default function AcademicInfoPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="page-title">Öğrenim Bilgileri</h1>
                <p className="page-subtitle">Akademik performans ve transkript özeti</p>
            </div>

            {/* Stats */}
            <div className="grid gap-5 md:grid-cols-3">
                <div className="stat-card text-center">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="stat-label">Genel Not Ortalaması</p>
                    <p className="text-4xl font-bold text-blue-600 mt-1">3.45</p>
                </div>
                <div className="stat-card text-center">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                        <Award className="w-6 h-6 text-emerald-600" />
                    </div>
                    <p className="stat-label">Tamamlanan AKTS</p>
                    <p className="text-4xl font-bold text-emerald-600 mt-1">140 / 240</p>
                </div>
                <div className="stat-card text-center">
                    <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="w-6 h-6 text-violet-600" />
                    </div>
                    <p className="stat-label">Aktif Dönem</p>
                    <p className="text-4xl font-bold text-violet-600 mt-1">6</p>
                </div>
            </div>

            {/* Transcript */}
            <div className="card overflow-hidden">
                <div className="card-header">
                    <h3 className="section-title">Transkript Özeti (Son Dönem)</h3>
                </div>
                <div className="table-container border-0 rounded-none">
                    <table className="table-base">
                        <thead>
                            <tr>
                                <th>Ders Kodu</th>
                                <th>Ders Adı</th>
                                <th className="text-center">AKTS</th>
                                <th className="text-center">Harf Notu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-mono font-semibold text-slate-800">CS-301</td>
                                <td className="text-slate-700">İşletim Sistemleri</td>
                                <td className="text-center text-slate-600">5</td>
                                <td className="text-center">
                                    <span className="badge badge-green font-bold">BA</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-mono font-semibold text-slate-800">CS-303</td>
                                <td className="text-slate-700">Yazılım Mühendisliği</td>
                                <td className="text-center text-slate-600">4</td>
                                <td className="text-center">
                                    <span className="badge badge-blue font-bold">AA</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-mono font-semibold text-slate-800">MATH-201</td>
                                <td className="text-slate-700">Diferansiyel Denklemler</td>
                                <td className="text-center text-slate-600">5</td>
                                <td className="text-center">
                                    <span className="badge badge-green font-bold">BB</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
