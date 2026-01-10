"use client";

import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/context/auth-context";
import {
    LayoutDashboard,
    User,
    GraduationCap,
    BookOpen,
    Calendar,
    ClipboardList,
    FileText,
    Mail,
    Users,
    Building
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const menuItems = [
    { name: "Genel Bakış", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Özlük Bilgileri", href: "/student/ozluk-bilgileri", icon: User },
    { name: "Öğrenim Bilgileri", href: "/student/ogrenim-bilgileri", icon: GraduationCap },
    { name: "Derslerim", href: "/student/dersler", icon: BookOpen },
    { name: "Ders Programı", href: "/student/ders-programi", icon: Calendar },
    { name: "Yoklama Durumu", href: "/student/yoklama", icon: ClipboardList },
    { name: "Belgelerim", href: "/student/dokumanlar", icon: FileText },
    { name: "Mesajlar", href: "/student/yazismalarim", icon: Mail },
    { name: "Kulüpler", href: "/student/ogrenci-kulupleri", icon: Users },
    { name: "Bölümler", href: "/student/bolumler", icon: Building },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        } else if (!loading && role !== "student") {
            router.push("/staff/dashboard");
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
            <Sidebar title="Öğrenci" items={menuItems} />
            <main className="main-content">
                <div className="content-container animate-fade-in">
                    {children}
                </div>
            </main>
        </>
    );
}
