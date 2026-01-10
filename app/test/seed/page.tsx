"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SeedDataPage() {
    const [status, setStatus] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const log = (msg: string) => setStatus(prev => [...prev, msg]);

    const runSeed = async () => {
        setLoading(true);
        setStatus([]);
        log("Test verisi oluşturuluyor...");

        try {
            // 1. Create Students
            const studentIds = [];
            for (let i = 1; i <= 10; i++) {
                const email = `ogrenci${i}_${Date.now()}@test.com`;
                const password = "password123";
                const name = `Öğrenci ${i} Yılmaz`;

                log(`Öğrenci oluşturuluyor: ${email}`);

                const { data, error } = await supabase!.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: name, role: 'student', student_no: `2025${1000 + i}` }
                    }
                });

                if (error) {
                    log(`Hata (${email}): ${error.message}`);
                } else if (data.user) {
                    studentIds.push(data.user.id);
                }
            }

            // 2. Create Staff
            for (let i = 1; i <= 2; i++) {
                const email = `ogretmen${i}_${Date.now()}@test.com`;
                const password = "password123";
                const name = `Öğretmen ${i} Kaya`;

                log(`Öğretmen oluşturuluyor: ${email}`);

                const { error } = await supabase!.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: name, role: 'staff' }
                    }
                });

                if (error) log(`Hata (${email}): ${error.message}`);
            }

            // 3. Create Random Attendance for 2 Weeks (CS-101)
            log("Yoklama kayıtları (CS-101) oluşturuluyor...");
            const attendanceRecords = [];
            const courseCode = "CS-101";

            // Add course if not exists (handling visually only, assuming Seed SQL ran)

            for (const studentId of studentIds) {
                // Week 1
                attendanceRecords.push({
                    student_id: studentId,
                    course_code: courseCode,
                    week_number: 1,
                    date: '2025-10-02',
                    status: Math.random() > 0.2 ? 'present' : 'absent'
                });
                // Week 2
                attendanceRecords.push({
                    student_id: studentId,
                    course_code: courseCode,
                    week_number: 2,
                    date: '2025-10-09',
                    status: Math.random() > 0.2 ? 'present' : 'absent'
                });
            }

            if (attendanceRecords.length > 0) {
                const { error: attError } = await supabase!
                    .from('attendance')
                    .insert(attendanceRecords);

                if (attError) log(`Yoklama hatası: ${attError.message}`);
                else log(`${attendanceRecords.length} adet yoklama kaydı eklendi.`);
            }

            log("İşlem tamamlandı!");

        } catch (err) {
            log("Beklenmeyen hata: " + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Test Verisi Oluşturucu</h1>
            <div className="bg-yellow-50 p-4 rounded border border-yellow-200 text-yellow-800">
                Bu araç, Supabase Auth kullanarak gerçek kullanıcılar (`ogrenciX...`) oluşturur ve `profiles` ile `attendance` tablolarını doldurur.
            </div>

            <button
                onClick={runSeed}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Yükleniyor..." : "10 Öğrenci, 2 Öğretmen + Yoklama Ekle"}
            </button>

            <div className="p-4 bg-slate-100 rounded text-xs font-mono">
                <p>Debug Info:</p>
                <p>URL Detect: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "OK" : "MISSING"}</p>
                <p>Key Detect: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "OK" : "MISSING"}</p>
            </div>

            <div className="bg-slate-900 text-green-400 p-4 rounded font-mono text-xs h-96 overflow-y-auto">
                {status.map((s, i) => <div key={i}>{'>'} {s}</div>)}
            </div>
        </div>
    );
}
