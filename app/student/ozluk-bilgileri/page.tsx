import { User, Mail, Calendar, Building2, GraduationCap, BadgeCheck } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="page-title">Özlük Bilgileri</h1>
                <p className="page-subtitle">Kişisel ve akademik bilgileriniz</p>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="flex items-start gap-8">
                        {/* Photo */}
                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100">
                            <User className="w-12 h-12 text-blue-400" />
                        </div>

                        {/* Info Grid */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Ad Soyad
                                </label>
                                <p className="text-lg font-semibold text-slate-900">Ali Yılmaz</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    Öğrenci No
                                </label>
                                <p className="text-lg font-semibold text-slate-900 font-mono">2021123456</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Building2 className="w-3.5 h-3.5" />
                                    Bölüm
                                </label>
                                <p className="text-lg font-semibold text-slate-900">Bilgisayar Mühendisliği</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <GraduationCap className="w-3.5 h-3.5" />
                                    Sınıf
                                </label>
                                <p className="text-lg font-semibold text-slate-900">3. Sınıf</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Kayıt Tarihi
                                </label>
                                <p className="text-lg font-semibold text-slate-900">15.09.2023</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <BadgeCheck className="w-3.5 h-3.5" />
                                    Danışman
                                </label>
                                <p className="text-lg font-semibold text-slate-900">Prof. Dr. Ahmet Demir</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Card */}
            <div className="card">
                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="section-title">Öğrencilik Durumu</h3>
                            <p className="text-sm text-slate-500 mt-1">Aktif öğrenci statüsünde bulunmaktasınız.</p>
                        </div>
                        <span className="badge badge-green text-sm px-4 py-2">
                            Aktif
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
