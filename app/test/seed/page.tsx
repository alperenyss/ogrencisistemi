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


    const createDemoScenario = async () => {
        setLoading(true);
        setStatus([]);
        log("Demo senaryosu hazırlanıyor...");

        try {
            await supabase!.auth.signOut();

            // 1. ÖĞRENCİ OLUŞTUR / GİRİŞ YAP
            const studentEmail = "ogrenci@univ.edu";
            const password = "password123";
            let studentId = "";

            log(`Öğrenci işlemi: ${studentEmail}`);
            const { data: sLoginData, error: sLoginError } = await supabase!.auth.signInWithPassword({
                email: studentEmail,
                password
            });

            if (sLoginData.user) {
                studentId = sLoginData.user.id;
                log("Öğrenci girişi başarılı.");
            } else {
                log("Öğrenci kayıt ediliyor...");
                const { data: sSignupData, error: sSignupError } = await supabase!.auth.signUp({
                    email: studentEmail,
                    password,
                    options: {
                        data: { full_name: "Ali Yılmaz", role: 'student', student_no: '20251001' }
                    }
                });
                if (sSignupError) throw new Error("Öğrenci oluşturulamadı: " + sSignupError.message);
                studentId = sSignupData.user!.id;
            }

            // 2. MAZERET TALEBİ OLUŞTURMA (İPTAL EDİLDİ - Manuel eklenecek)
            // Senaryo: 3. derste mazeret var ama henüz sisteme girilmemiş.
            // 2. MAZERET TALEBİ OLUŞTURMA (İPTAL EDİLDİ - Manuel eklenecek)
            // Senaryo: 3. derste mazeret var ama henüz sisteme girilmemiş.
            log("Mazeret talebi oluşturulmuyor (Manuel eklenecek)...");
            const courseCode = "CS-101";

            await supabase!.auth.signOut();

            // 3. PERSONEL OLUŞTUR / GİRİŞ YAP
            const staffEmail = "personel@univ.edu";
            let staffId = "";

            log(`Personel işlemi: ${staffEmail}`);
            const { data: pLoginData, error: pLoginError } = await supabase!.auth.signInWithPassword({
                email: staffEmail,
                password
            });

            if (pLoginData.user) {
                staffId = pLoginData.user.id;
                log("Personel girişi başarılı.");
            } else {
                log("Personel kayıt ediliyor...");
                const { data: pSignupData, error: pSignupError } = await supabase!.auth.signUp({
                    email: staffEmail,
                    password,
                    options: {
                        data: { full_name: "Dr. Ayşe Kaya", role: 'staff' }
                    }
                });
                if (pSignupError) throw new Error("Personel oluşturulamadı: " + pSignupError.message);
                staffId = pSignupData.user!.id;
            }

            // 4. YOKLAMA KAYITLARI OLUŞTUR (Personel olarak oturum açıkken)
            log("Yoklama kayıtları giriliyor...");

            // Önce eski yoklamaları temizle (Duplicate önlemek için)
            await supabase!
                .from('attendance')
                .delete()
                .eq('student_id', studentId)
                .eq('course_code', courseCode);

            // Tarihleri ayarla: 1. ve 2. hafta geçmişte
            const d1 = new Date(); d1.setDate(d1.getDate() - 14);
            const d2 = new Date(); d2.setDate(d2.getDate() - 7);
            const d3 = new Date(); // Bugün (mazeretli olan)

            const attendanceData = [
                {
                    student_id: studentId,
                    course_code: courseCode,
                    week_number: 1,
                    date: d1.toISOString().split('T')[0],
                    status: 'absent',
                    has_excuse: false
                },
                {
                    student_id: studentId,
                    course_code: courseCode,
                    week_number: 2,
                    date: d2.toISOString().split('T')[0],
                    status: 'absent',
                    has_excuse: false
                },
                {
                    student_id: studentId,
                    course_code: courseCode,
                    week_number: 3,
                    date: d3.toISOString().split('T')[0],
                    status: 'absent',
                    has_excuse: false // Mazeret talebi onaylanınca true olacak
                }
            ];

            const { error: attError } = await supabase!
                .from('attendance')
                .insert(attendanceData);

            if (attError) log("Yoklama ekleme uyarısı: " + attError.message);
            else log("3 haftalık devamsızlık girildi.");

            log("SENARYO HAZIR! Çıkış yapılıyor...");
            await supabase!.auth.signOut();

        } catch (err: any) {
            log("HATA: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const clearAttendance = async () => {
        setLoading(true);
        setStatus([]);
        log("Tüm yoklama kayıtları siliniyor...");

        const { error } = await supabase!
            .from('attendance')
            .delete()
            .neq('id', 0); // Hack to delete all if ID is int, or use uuid approach

        // If ID is UUID, modify accordingly. Assuming int based on schema usually or uuid.
        // Safer to use a known helper or just try deleting.
        // For attendance, usually composite key or id. 
        // Let's assume we can delete by filtering a common column like course_code not null

        // BETTER: Delete specific demo course records to be safe, or all.
        // Let's try deleting all.
        const { error: delError } = await supabase!
            .from('attendance')
            .delete()
            .neq('student_id', '00000000-0000-0000-0000-000000000000');

        if (delError) {
            log("Silme hatası: " + delError.message);
        } else {
            log("Tüm yoklamalar temizlendi.");
        }
        setLoading(false);
    };

    const clearRequests = async () => {
        setLoading(true);
        setStatus([]);
        log("Mazeret talepleri siliniyor...");

        const { error } = await supabase!
            .from('excuse_requests')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

        if (error) {
            log("Silme hatası: " + error.message);
        } else {
            log("İşlem başarılı. Talepler temizlendi.");
        }
        setLoading(false);
    };

    const resetRejected = async () => {
        setLoading(true);
        setStatus([]);
        log("Reddedilen mazeretler siliniyor...");

        const { error } = await supabase!
            .from('excuse_requests')
            .delete()
            .eq('status', 'rejected');

        if (error) {
            log("Silme hatası: " + error.message);
        } else {
            log("Reddedilenler silindi. Öğrenci tekrar talep oluşturabilir.");
        }
        setLoading(false);
    };

    return (
        <div className="p-10 max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Test Verisi Oluşturucu</h1>
            <div className="bg-yellow-50 p-4 rounded border border-yellow-200 text-yellow-800">
                Bu araç, Supabase Auth kullanarak gerçek kullanıcılar oluşturur.
            </div>

            <div className="flex flex-col gap-4">
                <button
                    onClick={runSeed}
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "İşlem sürüyor..." : "Rastgele Veri Doldur (Eski)"}
                </button>

                <button
                    onClick={createDemoScenario}
                    disabled={loading}
                    className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 font-bold"
                >
                    {loading ? "İşlem sürüyor..." : "DEMO SENARYOSU OLUŞTUR (Sunum İçin)"}
                </button>

                <button
                    onClick={clearRequests}
                    disabled={loading}
                    className="px-6 py-3 bg-red-100 text-red-700 border border-red-200 rounded hover:bg-red-200 disabled:opacity-50 font-medium"
                >
                    {loading ? "İşlem sürüyor..." : "Tüm Mazeret Taleplerini Temizle"}
                </button>

                <button
                    onClick={resetRejected}
                    disabled={loading}
                    className="px-6 py-3 bg-amber-100 text-amber-900 border border-amber-200 rounded hover:bg-amber-200 disabled:opacity-50 font-medium"
                >
                    {loading ? "İşlem sürüyor..." : "Sadece Reddedilenleri Temizle (Reset)"}
                </button>

                <button
                    onClick={clearAttendance}
                    disabled={loading}
                    className="px-6 py-3 bg-red-100 text-red-700 border border-red-200 rounded hover:bg-red-200 disabled:opacity-50 font-medium"
                >
                    {loading ? "İşlem sürüyor..." : "Tüm Yoklamaları Temizle"}
                </button>
            </div>

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
