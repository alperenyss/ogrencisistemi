"use client";

import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/context/auth-context";
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    AlertCircle,
    FileText,
    Mail
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const menuItems = [
    { name: "Genel Bakış", href: "/staff/dashboard", icon: LayoutDashboard },
    { name: "Öğrenci Listesi", href: "/staff/ogrenci-listesi", icon: Users },
    { name: "Yoklama", href: "/staff/yoklama", icon: ClipboardList },
    { name: "Mazeretler", href: "/staff/mazeretler", icon: AlertCircle },
    { name: "Dokümanlar", href: "/staff/dokuman-paylasimi", icon: FileText },
    { name: "Mesajlar", href: "/staff/yazismalar", icon: Mail },
];

export default function StaffLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (!loading && role !== "staff") {
            router.push("/student/dashboard");
        }
    }, [user, loading, role, router]);

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
                <div className="loading-spinner" />
            </div>
        );
    }

    return (
        <>
            <Sidebar title="Akademik" items={menuItems} />
            <main className="main-content">
                <div className="content-container animate-fade-in">
                    {children}
                </div>
            </main>
        </>
    );
}
