import { Building2, ChevronRight, Users, BookOpen } from "lucide-react";

export default function DepartmentsPage() {
    const departments = [
        { name: "Bilgisayar Mühendisliği", faculty: "Mühendislik Fakültesi", students: 450, courses: 82 },
        { name: "Endüstri Mühendisliği", faculty: "Mühendislik Fakültesi", students: 320, courses: 68 },
        { name: "Elektrik-Elektronik Mühendisliği", faculty: "Mühendislik Fakültesi", students: 380, courses: 75 },
        { name: "Mimarlık", faculty: "Mimarlık Fakültesi", students: 290, courses: 54 },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="page-title">Akademik Birimler</h1>
                <p className="page-subtitle">Bölümler ve fakülteler</p>
            </div>

            <div className="grid gap-4">
                {departments.map((dept, i) => (
                    <div key={i} className="card group hover:border-blue-200 transition-all cursor-pointer">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                                        <Building2 className="w-5 h-5 text-slate-500 group-hover:text-blue-600 transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                            {dept.name}
                                        </h3>
                                        <p className="text-sm text-slate-500">{dept.faculty}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="hidden md:flex items-center gap-6 text-sm text-slate-500">
                                        <span className="flex items-center gap-1.5">
                                            <Users className="w-4 h-4" />
                                            {dept.students} öğrenci
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <BookOpen className="w-4 h-4" />
                                            {dept.courses} ders
                                        </span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
