"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, CalendarX, UploadCloud, X, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CourseAttendanceDetail() {
    const params = useParams();
    // Normalize course code from URL (e.g. "cs-101" -> "CS-101")
    const rawCode = params.courseId?.toString().toUpperCase() || "CS-101";
    // Check if it has CS- prefix again just in case URL was raw
    const courseCode = rawCode.includes("-") ? rawCode : rawCode.replace(/([A-Z]+)(\d+)/, "$1-$2");

    const [attendanceData, setAttendanceData] = useState<any[]>([]);
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch Attendance and Excuses
    useEffect(() => {
        const fetchRecords = async () => {
            try {
                console.log("Fetching for:", courseCode);
                const { data: { user }, error: authError } = await supabase!.auth.getUser();

                if (authError || !user) {
                    console.error("Auth Error:", authError);
                    setLoading(false);
                    return;
                }

                // 1. Fetch Attendance
                const { data: att, error: attError } = await supabase!
                    .from('attendance')
                    .select('*')
                    .eq('student_id', user.id)
                    .eq('course_code', courseCode);

                if (attError) console.error("Attendance Fetch Error:", attError);

                // 2. Fetch Excuses
                const { data: excuses, error: excuseError } = await supabase!
                    .from('excuse_requests')
                    .select('*')
                    .eq('student_id', user.id)
                    .eq('course_code', courseCode);

                if (excuseError) console.error("Excuse Fetch Error:", excuseError);

                // 3. Generate 14 weeks view (or just show existing records + fills)
                // For simplicity, we just show what we have, OR we generate a list of 14 weeks and fill it.
                // Let's start with empty 14 weeks template if we want a full view, but better to just show records for now 
                // or assume records exist if Staff entered them.
                // If Staff hasn't entered data, showing empty table is correct.
                // However, to mimic the UI showing 14 weeks:

                // Map existing records to a nice format
                const merged = (att || []).map(record => {
                    const excuse = excuses?.find(e => e.week_number === record.week_number);
                    return {
                        week: record.week_number,
                        date: record.date.split("-").reverse().join("."), // YYYY-MM-DD -> DD.MM.YYYY
                        status: record.status,
                        hasExcuse: excuse ? true : false,
                        excuseStatus: excuse?.status // pending, approved, etc.
                    };
                });

                // Sort by week
                merged.sort((a, b) => a.week - b.week);

                setAttendanceData(merged);

            } catch (err) {
                console.error("Unexpected Error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecords();
    }, [courseCode]);


    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && selectedWeek) {
            setIsUploading(true);
            const file = e.target.files[0];

            // In a real app, upload to Supabase Storage:
            // await supabase.storage.from('documents').upload(...)
            // Here we just simulate it by saving the filename to the database.

            const { data: { user } } = await supabase!.auth.getUser();

            if (user) {
                const { error } = await supabase!
                    .from('excuse_requests')
                    .insert({
                        student_id: user.id,
                        course_code: courseCode,
                        week_number: selectedWeek,
                        reason: "Mazeret Belgesi: " + file.name,
                        document_url: "fake_path/" + file.name,
                        status: 'pending'
                    });

                if (error) {
                    alert('Hata: ' + error.message);
                } else {
                    // Update local state to show "Inceleniyor" immediately
                    setAttendanceData(prev => prev.map(item =>
                        item.week === selectedWeek ? { ...item, hasExcuse: true, excuseStatus: 'pending' } : item
                    ));
                }
            }

            setIsUploading(false);
            setSelectedWeek(null);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Yükleniyor...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/student/yoklama"
                    className="flex items-center justify-center h-10 w-10 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="page-title">{courseCode} - Detaylı Yoklama</h1>
                    <p className="page-subtitle">2025-2026 Güz Dönemi</p>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-100 flex p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <div className="w-24">Hafta</div>
                    <div className="w-32">Tarih</div>
                    <div className="flex-1">Durum</div>
                    <div className="w-32 text-right">İşlem</div>
                </div>
                <div className="divide-y divide-slate-100">
                    {attendanceData.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">Henüz yoklama kaydı bulunmuyor.</div>
                    ) : (
                        attendanceData.map((record) => (
                            <div key={record.week} className="flex items-center p-4 hover:bg-slate-50/50 transition-colors">
                                <div className="w-24 font-medium text-slate-800">{record.week}. Hafta</div>
                                <div className="w-32 text-sm text-slate-500">{record.date}</div>
                                <div className="flex-1">
                                    {record.status === "present" ? (
                                        <span className="badge badge-green flex items-center gap-1.5 w-fit">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            GELDİ
                                        </span>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="badge badge-red flex items-center gap-1.5">
                                                <CalendarX className="h-3.5 w-3.5" />
                                                GELMEDİ
                                            </span>
                                            {record.hasExcuse && (
                                                <span className="badge badge-blue flex items-center gap-1.5">
                                                    <FileText className="h-3.5 w-3.5" />
                                                    {record.excuseStatus === 'approved' ? 'Mazeret Onaylandı' : 'Mazeret İletildi'}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="w-32 text-right">
                                    {record.status === "absent" && !record.hasExcuse && (
                                        <button
                                            onClick={() => setSelectedWeek(record.week)}
                                            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                            Mazeret Yükle
                                        </button>
                                    )}
                                    {record.status === "absent" && record.hasExcuse && (
                                        <span className="text-sm text-slate-400">
                                            {record.excuseStatus === 'pending' ? 'İnceleniyor' : record.excuseStatus === 'rejected' ? 'Reddedildi' : 'Onaylandı'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Upload Modal (Same as before) */}
            {selectedWeek && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-slate-900">Mazeret Belgesi Yükle</h3>
                            <button
                                onClick={() => setSelectedWeek(null)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 mb-4">
                                <div className="flex gap-3">
                                    <AlertCircle className="h-5 w-5 text-blue-600 shrink-0" />
                                    <p className="text-sm text-blue-700">
                                        {selectedWeek}. Hafta devamsızlığınız için geçerli bir mazeret belgesi (Rapor, İzin Yazısı vb.) yükleyiniz.
                                    </p>
                                </div>
                            </div>

                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {isUploading ? (
                                        <div className="flex flex-col items-center">
                                            <div className="loading-spinner mb-2"></div>
                                            <p className="text-sm text-slate-500">Yükleniyor...</p>
                                        </div>
                                    ) : (
                                        <>
                                            <UploadCloud className="w-8 h-8 mb-3 text-slate-400" />
                                            <p className="mb-1 text-sm text-slate-600">
                                                <span className="font-medium">PDF Yüklemek için Tıklayın</span>
                                            </p>
                                            <p className="text-xs text-slate-400">PDF, JPG (Max. 5MB)</p>
                                        </>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileUpload}
                                    disabled={isUploading}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
