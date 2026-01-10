import { TrendingUp, BookOpen, Calendar, AlertCircle, Clock, Bell } from "lucide-react";

export default function StudentDashboard() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="page-title">Genel Bakış</h1>
                <p className="page-subtitle">2025-2026 Güz Dönemi</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="stat-card">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="stat-label">Genel Not Ortalaması</p>
                            <p className="stat-value mt-1">3.45</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="badge badge-green">+0.12</span>
                        <span className="text-xs text-slate-400">geçen döneme göre</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="stat-label">Aktif Ders Sayısı</p>
                            <p className="stat-value mt-1">6</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-xs text-slate-400">18 AKTS toplam</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="stat-label">Devamsızlık Oranı</p>
                            <p className="stat-value mt-1">%4</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-xs text-slate-400">Ortalama tüm dersler</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="stat-label">Sonraki Sınav</p>
                            <p className="stat-value mt-1">3 gün</p>
                        </div>
                        <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-rose-600" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-xs text-slate-400">CS-101 Vize</span>
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Today's Schedule */}
                <div className="lg:col-span-2 card">
                    <div className="card-header flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <h2 className="section-title">Bugünkü Dersler</h2>
                        </div>
                        <span className="text-xs text-slate-400">3 ders</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {[
                            { time: "09:00", end: "10:50", code: "CS-101", name: "Bilgisayar Bilimlerine Giriş", room: "Amfi 3", status: "active" },
                            { time: "13:00", end: "14:50", code: "MATH-101", name: "Matematik I", room: "D-204", status: "upcoming" },
                            { time: "15:00", end: "16:50", code: "ENG-101", name: "İngilizce I", room: "B-102", status: "upcoming" },
                        ].map((lesson, i) => (
                            <div key={i} className="flex items-center gap-5 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                                <div className="text-right w-14">
                                    <p className="text-sm font-semibold text-slate-800">{lesson.time}</p>
                                    <p className="text-xs text-slate-400">{lesson.end}</p>
                                </div>
                                <div className={`w-1 h-12 rounded-full ${lesson.status === 'active' ? 'bg-blue-500' : 'bg-slate-200'}`} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-slate-800">{lesson.code}</span>
                                        <span className="badge badge-gray">{lesson.room}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-0.5 truncate">{lesson.name}</p>
                                </div>
                                {lesson.status === 'active' && (
                                    <span className="badge badge-blue">
                                        Devam Ediyor
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Announcements */}
                <div className="card">
                    <div className="card-header flex items-center gap-2">
                        <Bell className="w-4 h-4 text-slate-400" />
                        <h2 className="section-title">Duyurular</h2>
                    </div>
                    <div className="card-body space-y-4">
                        {[
                            { date: "10 Oca", title: "Bahar dönemi kayıt tarihleri açıklandı" },
                            { date: "08 Oca", title: "Kütüphane sınav haftası çalışma saatleri" },
                            { date: "05 Oca", title: "Öğrenci işleri duyurusu" },
                        ].map((item, i) => (
                            <div key={i} className="group cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition-colors -mx-3">
                                <p className="text-xs text-slate-400 mb-1">{item.date}</p>
                                <p className="text-sm text-slate-700 group-hover:text-blue-600 transition-colors leading-snug">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
