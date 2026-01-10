import { Mail, User } from "lucide-react";

export default function MessagesPage() {
    const messages = [
        {
            sender: "Öğrenci İşleri",
            time: "Bugün, 14:30",
            message: "Sayın öğrencimiz, kayıt yenileme tarihleri uzatılmıştır.",
            unread: true
        },
        {
            sender: "Prof. Dr. Ahmet Demir",
            time: "Dün, 09:15",
            message: "Proje teslim tarihini haftaya erteledim. Bilginize.",
            unread: false
        },
        {
            sender: "Kütüphane",
            time: "3 gün önce",
            message: "Ödünç aldığınız kitabın iade süresi yaklaşıyor.",
            unread: false
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="page-title">Yazışmalar</h1>
                <p className="page-subtitle">Gelen kutusu</p>
            </div>

            <div className="grid gap-3">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`card hover:border-blue-200 transition-colors cursor-pointer ${msg.unread ? 'border-l-4 border-l-blue-500' : ''}`}
                    >
                        <div className="card-body">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                        <User className="w-4 h-4 text-slate-500" />
                                    </div>
                                    <div>
                                        <span className={`font-medium ${msg.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                                            {msg.sender}
                                        </span>
                                        {msg.unread && (
                                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                                        )}
                                    </div>
                                </div>
                                <span className="text-xs text-slate-400">{msg.time}</span>
                            </div>
                            <p className={`text-sm ${msg.unread ? 'text-slate-700' : 'text-slate-500'}`}>
                                {msg.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
