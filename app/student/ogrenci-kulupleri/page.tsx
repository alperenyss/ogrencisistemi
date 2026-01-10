import { Users, Code, Palette, Mountain } from "lucide-react";

export default function ClubsPage() {
    const clubs = [
        {
            name: "Yazılım Kulübü",
            description: "Kodlama, hackathonlar ve teknoloji sohbetleri.",
            icon: Code,
            color: "blue",
            members: 156
        },
        {
            name: "Tiyatro Kulübü",
            description: "Sahnede kendini ifade et, sanatla iç içe ol.",
            icon: Palette,
            color: "violet",
            members: 89
        },
        {
            name: "Doğa Sporları",
            description: "Kamp, yürüyüş ve macera dolu etkinlikler.",
            icon: Mountain,
            color: "emerald",
            members: 124
        },
    ];

    const colorClasses = {
        blue: { bg: "bg-blue-50", text: "text-blue-600", hover: "hover:bg-blue-100" },
        violet: { bg: "bg-violet-50", text: "text-violet-600", hover: "hover:bg-violet-100" },
        emerald: { bg: "bg-emerald-50", text: "text-emerald-600", hover: "hover:bg-emerald-100" },
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="page-title">Öğrenci Kulüpleri</h1>
                <p className="page-subtitle">Kampüs etkinliklerine katılın</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {clubs.map((club, i) => {
                    const colors = colorClasses[club.color as keyof typeof colorClasses];
                    const Icon = club.icon;

                    return (
                        <div key={i} className="card group hover:border-slate-200 transition-all">
                            <div className="card-body">
                                <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                                    <Icon className={`w-7 h-7 ${colors.text}`} />
                                </div>
                                <h3 className="font-semibold text-lg text-slate-900 mb-2">{club.name}</h3>
                                <p className="text-sm text-slate-500 mb-4 leading-relaxed">{club.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                        <Users className="w-3.5 h-3.5" />
                                        {club.members} üye
                                    </div>
                                    <button className={`px-4 py-2 rounded-lg text-sm font-medium ${colors.bg} ${colors.text} ${colors.hover} transition-colors`}>
                                        Katıl
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
