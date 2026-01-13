"use client";

import { useState, useEffect } from "react";
import { Search, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";


export default function StaffStudentListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDept, setSelectedDept] = useState("all");
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            const { data } = await supabase!
                .from('profiles')
                .select('*')
                .eq('role', 'student');

            if (data) {
                setStudents(data);
            }
            setLoading(false);
        };
        fetchStudents();
    }, []);

    const filteredStudents = students.filter(s => {
        const name = s.full_name || "";
        const no = s.student_no || "";
        const dept = s.department || "Genel";

        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            no.includes(searchTerm);
        const matchesDept = selectedDept === "all" || dept === selectedDept;
        return matchesSearch && matchesDept;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="page-title">Öğrenci Listesi</h1>
                    <p className="page-subtitle">Tüm kayıtlı öğrenciler</p>
                </div>

            </div>

            <div className="card overflow-hidden">
                {/* Filters */}
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Öğrenci adı veya numarası ile ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-white placeholder:text-slate-400"
                        />
                    </div>
                    <select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        className="px-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-slate-600"
                    >
                        <option value="all">Tüm Bölümler</option>
                        <option value="Bilgisayar Müh.">Bilgisayar Müh.</option>
                        <option value="Elektrik-Elektronik Müh.">Elektrik-Elektronik Müh.</option>
                    </select>
                </div>

                {/* Table */}
                <div className="table-container border-0 rounded-none">
                    <table className="table-base">
                        <thead>
                            <tr>
                                <th>Öğrenci No</th>
                                <th>Ad Soyad</th>
                                <th>Bölüm</th>
                                <th className="text-center">Kayıt Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={4} className="text-center py-8 text-slate-500">Yükleniyor...</td></tr>
                            ) : filteredStudents.length === 0 ? (
                                <tr><td colSpan={4} className="text-center py-8 text-slate-500">Öğrenci bulunamadı.</td></tr>
                            ) : (
                                filteredStudents.map(student => (
                                    <tr key={student.id} className="group">
                                        <td className="font-mono text-slate-500">{student.student_no || "---"}</td>
                                        <td className="font-medium text-slate-900">{student.full_name || student.email}</td>
                                        <td className="text-slate-600">{student.department || "-"}</td>
                                        <td className="text-center text-slate-500 text-sm">
                                            {new Date(student.created_at).toLocaleDateString("tr-TR")}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
