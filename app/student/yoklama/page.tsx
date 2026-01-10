import Link from "next/link";
import { ChevronRight, AlertTriangle, CheckCircle } from "lucide-react";

export default function AttendancePage() {
    const courses = [
        { code: "CS-101", name: "Bilgisayar Bilimlerine Giriş", percent: 92, limit: 80 },
        { code: "CS-202", name: "Veri Yapıları", percent: 85, limit: 70 },
        { code: "PHYS-101", name: "Fizik I", percent: 45, limit: 70, critical: true },
        { code: "MATH-101", name: "Matematik I", percent: 100, limit: 70 },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="page-title">Yoklama ve Devamsızlık</h1>
                <p className="page-subtitle">Detaylarını görmek istediğiniz dersi seçin</p>
            </div>

            <div className="grid gap-4">
                {courses.map((course) => (
                    <Link
                        key={course.code}
                        href={`/student/yoklama/${course.code.toLowerCase()}`}
                        className="card group hover:border-blue-200 transition-all"
                    >
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="badge badge-gray font-mono font-semibold">
                                            {course.code}
                                        </span>
                                        {course.critical && (
                                            <span className="badge badge-red flex items-center gap-1">
                                                <AlertTriangle className="w-3 h-3" />
                                                Kritik Devamsızlık
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {course.name}
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Zorunlu Katılım Sınırı: %{course.limit}
                                    </p>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 justify-end mb-1">
                                            {!course.critical && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                                            <p className={`text-3xl font-bold ${course.critical ? 'text-red-600' : 'text-emerald-600'}`}>
                                                %{course.percent}
                                            </p>
                                        </div>
                                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                            Katılım Oranı
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all ${course.critical ? 'bg-red-500' : 'bg-emerald-500'}`}
                                    style={{ width: `${course.percent}%` }}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
