import { Calendar } from "lucide-react";

export default function SchedulePage() {
    const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

    const schedule: Record<string, Record<string, { code: string; room: string } | null>> = {
        'Pazartesi': {
            '09:00': { code: 'CS-201', room: 'D-204' },
            '13:00': { code: 'MATH-201', room: 'A-101' },
        },
        'Salı': {
            '10:00': { code: 'CS-202', room: 'B-302' },
            '14:00': { code: 'ENG-101', room: 'C-105' },
        },
        'Çarşamba': {
            '09:00': { code: 'CS-201', room: 'D-204' },
            '15:00': { code: 'PHYS-101', room: 'Lab-1' },
        },
        'Perşembe': {
            '11:00': { code: 'CS-301', room: 'D-301' },
            '13:00': { code: 'MATH-201', room: 'A-101' },
        },
        'Cuma': {
            '10:00': { code: 'CS-202', room: 'B-302' },
        },
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-title">Haftalık Ders Programı</h1>
                    <p className="page-subtitle">2025-2026 Güz Dönemi</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    Bu hafta
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-20">
                                    Saat
                                </th>
                                {days.map(d => (
                                    <th key={d} className="p-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                        {d}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map(h => (
                                <tr key={h} className="border-b border-slate-100 last:border-0">
                                    <td className="p-4 font-medium text-slate-500 bg-slate-50/50">
                                        {h}
                                    </td>
                                    {days.map((d) => {
                                        const lesson = schedule[d]?.[h];
                                        return (
                                            <td key={d} className="p-2 text-center">
                                                {lesson ? (
                                                    <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-left hover:bg-blue-100 transition-colors cursor-pointer">
                                                        <div className="font-semibold text-blue-700 text-sm">{lesson.code}</div>
                                                        <div className="text-xs text-blue-500 mt-0.5">{lesson.room}</div>
                                                    </div>
                                                ) : null}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
