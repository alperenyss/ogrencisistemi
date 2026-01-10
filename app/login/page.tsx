"use client";

import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { GraduationCap, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const { login, signUp, loading } = useAuth();
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState<'student' | 'staff'>('student');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        const res = mode === 'login'
            ? await login(email, password)
            : await signUp(email, password, fullName, role);
        if (res.error) {
            setError(res.error);
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50">
            <div className="loading-spinner" />
        </div>
    );

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-[420px]">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500 shadow-lg shadow-blue-200 mb-4">
                        <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Öğrenci Bilgi Sistemi
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Üniversite Portalına Giriş Yapın
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                    <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
                        <button
                            type="button"
                            onClick={() => { setMode('login'); setError(null); }}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Giriş Yap
                        </button>
                        <button
                            type="button"
                            onClick={() => { setMode('register'); setError(null); }}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            Kayıt Ol
                        </button>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {error && (
                            <div className="rounded-lg bg-red-50 border border-red-100 p-3 text-sm text-red-600 text-center font-medium">
                                {error}
                            </div>
                        )}

                        {mode === 'register' && (
                            <>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">Ad Soyad</label>
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="input-base w-full"
                                        placeholder="Adınız Soyadınız"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setRole('student')}
                                        className={`p-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center gap-2 ${role === 'student' ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                                    >
                                        <GraduationCap className="w-5 h-5" />
                                        Öğrenci
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole('staff')}
                                        className={`p-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center gap-2 ${role === 'staff' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                                    >
                                        <Lock className="w-5 h-5" />
                                        Personel
                                    </button>
                                </div>
                            </>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700">E-posta Adresi</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-[18px] w-[18px]" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-base w-full pl-10"
                                    placeholder="mail@ornek.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700">Şifre</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-[18px] w-[18px]" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-base w-full pl-10"
                                    placeholder="••••••••"
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary w-full py-3"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    İşlem Yapılıyor...
                                </>
                            ) : (
                                <>
                                    {mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Demo Info */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400 mb-2">
                        Demo giriş bilgileri • Şifre: <span className="font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">password123</span>
                    </p>
                    <div className="flex justify-center gap-4 text-xs text-slate-400">
                        <span className="bg-slate-100 px-2 py-1 rounded">ogrenci@univ.edu</span>
                        <span className="bg-slate-100 px-2 py-1 rounded">personel@univ.edu</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
