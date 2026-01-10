"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isMockMode } from "@/lib/supabase";

type UserRole = "student" | "staff" | null;

interface User {
    email: string;
    id: string;
}

interface AuthContextType {
    user: User | null;
    role: UserRole;
    loading: boolean;
    login: (email: string, password?: string) => Promise<{ error: string | null }>;
    signUp: (email: string, password: string, fullName: string, role: UserRole) => Promise<{ error: string | null }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
    login: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    logout: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<UserRole>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Load user from local storage (for mock) or session
    useEffect(() => {
        const initAuth = async () => {
            setLoading(true);

            if (isMockMode) {
                // Mock persistence
                const storedUser = localStorage.getItem("obs_mock_user");
                if (storedUser) {
                    const u = JSON.parse(storedUser);
                    setUser(u);
                    setRole(u.email.includes("personel") ? "staff" : "student");
                }
            } else {
                // Supabase Auth
                const { data } = await supabase!.auth.getUser();
                if (data.user) {
                    setUser({ email: data.user.email!, id: data.user.id });
                    setRole(data.user.email?.includes("personel") ? "staff" : "student");
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email: string, password?: string) => {
        // Determine role primarily by email content
        const derivedRole = email.includes("personel") ? "staff" : "student";
        const mockUser = { email, id: Math.random().toString(36).substr(2, 9) };

        if (isMockMode) {
            // Simple Password Check
            if (password !== "123456") {
                return { error: "Hatalı şifre! (Demo için: 123456)" };
            }

            localStorage.setItem("obs_mock_user", JSON.stringify(mockUser));
            setUser(mockUser);
            setRole(derivedRole);

            // Redirect
            if (derivedRole === "staff") router.push("/staff/dashboard");
            else router.push("/student/dashboard");

            return { error: null };
        } else {
            // Supabase Magic Link Login (Original plan)
            // Switching to Password login for Supabase as well
            const { error } = await supabase!.auth.signInWithPassword({ email, password: password || "" });
            if (!error) {
                // Fetch user again to be sure
                const { data } = await supabase!.auth.getUser();
                if (data.user) {
                    setUser({ email: data.user.email!, id: data.user.id });
                    setRole(data.user.email?.includes("personel") ? "staff" : "student");
                    if (data.user.email?.includes("personel")) router.push("/staff/dashboard");
                    else router.push("/student/dashboard");
                }
            }
            return { error: error?.message || null };
        }
    };

    const signUp = async (email: string, password: string, fullName: string, role: UserRole) => {
        if (isMockMode) {
            return { error: "Demo modunda kayıt yapılamaz." };
        }

        const { data, error } = await supabase!.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: role
                }
            }
        });

        if (error) return { error: error.message };

        if (data.user) {
            setUser({ email: data.user.email!, id: data.user.id });
            setRole(role);
            if (role === 'staff') router.push('/staff/dashboard');
            else router.push('/student/dashboard');
        }

        return { error: null };
    };

    const logout = async () => {
        if (isMockMode) {
            localStorage.removeItem("obs_mock_user");
        } else {
            await supabase!.auth.signOut();
        }
        setUser(null);
        setRole(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, login, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
