"use client";

import { useState, useEffect } from "react";
import { FileText, CheckCircle, XCircle, Eye, AlertCircle, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function StaffExcuseReviewPage() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            // Fetch requests with student profile info
            const { data, error } = await supabase!
                .from('excuse_requests')
                .select(`
                    *,
                    profiles:student_id (full_name, student_no)
                `)
                .order('created_at', { ascending: false });

            if (data) {
                // Transform data structure to match UI
                const formatted = data.map((req: any) => ({
                    id: req.id,
                    student_id: req.student_id,
                    student: req.profiles?.full_name || "Bilinmeyen Öğrenci",
                    no: req.profiles?.student_no || "---",
                    course: req.course_code,
                    date: new Date(req.created_at).toLocaleDateString("tr-TR"), // Using created_at as date for now, or fetch attendance date?
                    // Ideally we should show the 'Week' or calculate date from week/semester start.
                    // For simplicity, showing Created At as "Date of Request". 
                    week: req.week_number,
                    reason: req.reason,
                    status: req.status,
                    document_url: req.document_url
                }));
                setRequests(formatted);
            }
            setLoading(false);
        };
        fetchRequests();
    }, []);

    const handleAction = async (id: string, action: 'approved' | 'rejected') => {
        // Optimistic update
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: action } : req
        ));

        // Update Request Status
        const { error } = await supabase!
            .from('excuse_requests')
            .update({ status: action })
            .eq('id', id);

        if (error) {
            alert('İşlem başarısız: ' + error.message);
            // Revert
            setRequests(prev => prev.map(req =>
                req.id === id ? { ...req, status: 'pending' } : req
            ));
            return;
        }

        // If Approved, also update Attendance record 'has_excuse' to true
        if (action === 'approved') {
            const req = requests.find(r => r.id === id);
            if (req) {
                await supabase!
                    .from('attendance')
                    .update({ has_excuse: true })
                    .eq('student_id', req.student_id)
                    .eq('course_code', req.course)
                    .eq('week_number', req.week);
            }
        }
    };

    const pendingCount = requests.filter(r => r.status === 'pending').length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-title">Mazeret Talepleri</h1>
                    <p className="page-subtitle">Öğrenci devamsızlık mazeretlerini inceleyin</p>
                </div>
                {pendingCount > 0 && (
                    <span className="badge badge-amber flex items-center gap-1.5 px-3 py-1.5">
                        <Clock className="h-4 w-4" />
                        {pendingCount} Bekleyen Talep
                    </span>
                )}
            </div>

            <div className="card overflow-hidden">
                <div className="table-container border-0 rounded-none">
                    <table className="table-base">
                        <thead>
                            <tr>
                                <th>Öğrenci</th>
                                <th>Ders</th>
                                <th>Hafta</th>
                                <th>Mazeret Türü</th>
                                <th>Belge</th>
                                <th className="text-center">İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-slate-500">Yükleniyor...</td>
                                </tr>
                            ) : requests.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-8 text-slate-500">Talep bulunamadı.</td>
                                </tr>
                            ) : (
                                requests.map((req) => (
                                    <tr key={req.id}>
                                        <td>
                                            <p className="font-medium text-slate-900">{req.student}</p>
                                            <p className="text-xs text-slate-400 font-mono">{req.no}</p>
                                        </td>
                                        <td>
                                            <span className="badge badge-gray font-mono">
                                                {req.course}
                                            </span>
                                        </td>
                                        <td className="text-slate-600">{req.week}. Hafta</td>
                                        <td className="text-slate-600 truncate max-w-[150px]" title={req.reason}>{req.reason}</td>
                                        <td>
                                            <td>
                                                <a
                                                    href={req.document_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                                                    onClick={(e) => {
                                                        if (!req.document_url || req.document_url.includes('example.com')) {
                                                            e.preventDefault();
                                                            alert("Bu bir demo verisidir. Gerçek bir dosya bulunmamaktadır.\nUrl: " + req.document_url);
                                                        }
                                                    }}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    Görüntüle
                                                </a>
                                            </td>
                                        </td>
                                        <td>
                                            {req.status === 'pending' ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleAction(req.id, 'approved')}
                                                        className="btn btn-primary py-1.5 px-3 text-xs"
                                                    >
                                                        <CheckCircle className="h-3.5 w-3.5" />
                                                        Onayla
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(req.id, 'rejected')}
                                                        className="btn btn-secondary py-1.5 px-3 text-xs text-red-600 hover:bg-red-50"
                                                    >
                                                        <XCircle className="h-3.5 w-3.5" />
                                                        Reddet
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-center">
                                                    <span className={`badge flex items-center gap-1.5 ${req.status === 'approved' ? 'badge-green' : 'badge-red'
                                                        }`}>
                                                        {req.status === 'approved' ? (
                                                            <>
                                                                <CheckCircle className="h-3.5 w-3.5" />
                                                                ONAYLANDI
                                                            </>
                                                        ) : (
                                                            <>
                                                                <XCircle className="h-3.5 w-3.5" />
                                                                REDDEDİLDİ
                                                            </>
                                                        )}
                                                    </span>
                                                </div>
                                            )}
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
