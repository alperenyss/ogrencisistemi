import { BookOpen, User, Award } from "lucide-react";

export default function CoursesPage() {
    const courses = [
        { code: "CS-201", name: "Veri Yapıları", instructor: "Dr. Öğr. Üyesi Mehmet Yılmaz", type: "Zorunlu", akts: 6 },
        { code: "CS-202", name: "Algoritma Analizi", instructor: "Prof. Dr. Ayşe Kaya", type: "Zorunlu", akts: 5 },
        { code: "MATH-201", name: "Lineer Cebir", instructor: "Doç. Dr. Can Demir", type: "Zorunlu", akts: 4 },
        { code: "CS-301", name: "Yazılım Mühendisliği", instructor: "Dr. Öğr. Üyesi Zeynep Öz", type: "Seçmeli", akts: 3 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-title">Alınan Dersler</h1>
                    <p className="page-subtitle">2025-2026 Güz Dönemi</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="badge badge-blue">
                        <Award className="w-3.5 h-3.5 mr-1" />
                        18 AKTS
                    </span>
                </div>
            </div>

            <div className="grid gap-4">
                {courses.map((course) => (
                    <div key={course.code} className="card group hover:border-blue-200 transition-colors">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                        <BookOpen className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-sm font-semibold text-slate-400">{course.code}</span>
                                            <h3 className="font-semibold text-slate-900">{course.name}</h3>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                            <User className="w-3.5 h-3.5" />
                                            {course.instructor}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right flex items-center gap-3">
                                    <span className={`badge ${course.type === 'Zorunlu' ? 'badge-blue' : 'badge-gray'}`}>
                                        {course.type}
                                    </span>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-slate-800">{course.akts}</p>
                                        <p className="text-xs text-slate-400">AKTS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
