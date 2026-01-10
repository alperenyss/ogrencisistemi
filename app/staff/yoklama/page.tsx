"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Save, Calendar, BookOpen } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function StaffAttendancePage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [week, setWeek] = useState(1);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Initial Data Fetch
    useEffect(() => {
        const fetchCourses = async () => {
            const { data } = await supabase!.from('courses').select('*');
            if (data) {
                setCourses(data);
                if (data.length > 0) setSelectedCourse(data[0].code);
            }
        };
        fetchCourses();
    }, []);

    // Fetch Students and Existing Attendance
    useEffect(() => {
        if (!selectedCourse || !date) return;

        const fetchData = async () => {
            setLoading(true);

            // 1. Fetch proper students (For demo: fetch all profiles with role student)
            // In a real app, we would join with enrollments
            const { data: studentsData } = await supabase!
                .from('profiles')
                .select('*')
                .eq('role', 'student');

            if (!studentsData) {
                setLoading(false);
                return;
            }

            // 2. Fetch existing attendance for this course/date
            const { data: attendanceData } = await supabase!
                .from('attendance')
                .select('*')
                .eq('course_code', selectedCourse)
                .eq('date', date);

            // 3. Merge data
            const merged = studentsData.map(student => {
                const record = attendanceData?.find(a => a.student_id === student.id);
                return {
                    id: student.id,
                    name: student.full_name || student.email, // Fallback to email if name empty
                    number: student.student_no || "---",
                    present: record ? record.status === 'present' : true // Default to present
                };
            });

            setStudents(merged);
            setLoading(false);
        };

        fetchData();
    }, [selectedCourse, date]);

    const toggleAttendance = (id: any) => {
        setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
    };

    const saveAttendance = async () => {
        setSaving(true);
        const records = students.map(s => ({
            student_id: s.id,
            course_code: selectedCourse,
            week_number: week,
            date: date,
            status: s.present ? 'present' : 'absent'
        }));

        // We use upsert. For upsert to work properly, we usually need a unique constraint.
        // Our schema doesn't strictly explicitly name a unique constraint on (student_id, course_code, date), 
        // but let's check schema. We didn't add unique constraint in SQL! 
        // We should Delete first or rely upon ID. But we generate generic IDs.
        // Quick Fix: Delete existing for this date/course first, then Insert.

        const { error: delError } = await supabase!
            .from('attendance')
            .delete()
            .eq('course_code', selectedCourse)
            .eq('date', date);

        if (delError) {
            alert('Hata: Önceki kayıtlar silinemedi.');
            setSaving(false);
            return;
        }

        const { error } = await supabase!
            .from('attendance')
            .insert(records);

        if (error) {
            alert('Kaydetme başarısız: ' + error.message);
        } else {
            alert('Yoklama başarıyla kaydedildi!');
        }
        setSaving(false);
    };

    const presentCount = students.filter(s => s.present).length;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="page-title">Yoklama Girişi</h1>
                    <p className="page-subtitle">Ders yoklaması alın</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Hft</span>
                        <input
                            type="number"
                            min={1}
                            max={14}
                            value={week}
                            onChange={(e) => setWeek(Number(e.target.value))}
                            className="pl-8 pr-2 py-2.5 text-sm border border-slate-200 rounded-lg bg-white w-20 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                    <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 min-w-[280px]"
                        >
                            {courses.map(c => (
                                <option key={c.code} value={c.code}>{c.code} {c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="table-container border-0 rounded-none">
                    <table className="table-base">
                        <thead>
                            <tr>
                                <th>Öğrenci No</th>
                                <th>Ad Soyad</th>
                                <th className="text-center">Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="text-center py-8 text-slate-500">Yükleniyor...</td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center py-8 text-slate-500">Öğrenci bulunamadı.</td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student.id}>
                                        <td className="font-mono text-slate-500">{student.number}</td>
                                        <td className="font-medium text-slate-900">{student.name}</td>
                                        <td className="text-center">
                                            <button
                                                onClick={() => toggleAttendance(student.id)}
                                                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${student.present
                                                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                                                    }`}
                                            >
                                                {student.present ? (
                                                    <>
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        GELDİ
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle className="w-3.5 h-3.5" />
                                                        GELMEDİ
                                                    </>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                        <span className="font-medium text-slate-700">{presentCount}</span> / {students.length} öğrenci mevcut
                    </div>
                    <button
                        onClick={saveAttendance}
                        disabled={saving || loading}
                        className="btn btn-primary"
                    >
                        {saving ? <div className="loading-spinner w-4 h-4 border-white/30 border-t-white mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                        {saving ? 'Kaydediliyor...' : 'Yoklamayı Kaydet'}
                    </button>
                </div>
            </div>
        </div>
    );
}
