"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon, LogOut, GraduationCap } from "lucide-react";
import { useAuth } from "@/context/auth-context";

interface SidebarItem {
    name: string;
    href: string;
    icon: LucideIcon;
}

interface SidebarProps {
    title: string;
    items: SidebarItem[];
}

export function Sidebar({ title, items }: SidebarProps) {
    const pathname = usePathname();
    const { logout, user, role } = useAuth();

    const roleLabel = role === 'student' ? 'Öğrenci' : 'Personel';
    const roleColor = role === 'student' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600';

    return (
        <aside className="sidebar">
            {/* Logo & Brand */}
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center shadow-sm">
                        <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <span className="font-semibold text-slate-800 text-[15px] block leading-tight">
                            Üniversite OBS
                        </span>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${roleColor}`}>
                            {roleLabel}
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 overflow-hidden">
                <ul className="flex flex-col gap-1">
                    {items.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        const Icon = item.icon;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`
                                        flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium 
                                        transition-all duration-150 ease-out
                                        ${isActive
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }
                                    `}
                                >
                                    <Icon 
                                        className={`w-[18px] h-[18px] flex-shrink-0 transition-colors duration-150 
                                            ${isActive ? 'text-blue-500' : 'text-slate-400'}`} 
                                        strokeWidth={isActive ? 2 : 1.75}
                                    />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 transition-colors duration-150 hover:bg-slate-100">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-sm font-semibold text-white">
                            {user?.email?.[0]?.toUpperCase() || 'U'}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-slate-800 truncate">
                            {user?.email?.split('@')[0] || 'Kullanıcı'}
                        </p>
                        <button
                            onClick={() => logout()}
                            className="text-[11px] text-slate-400 hover:text-red-500 transition-colors duration-150 flex items-center gap-1 mt-0.5"
                        >
                            <LogOut className="w-3 h-3" />
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
