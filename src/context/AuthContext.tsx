import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../lib/api"; // path tamara project mujab adjust karo

interface User {
    id: string;
    username: string;
    fullName: string;
    email: string;
    isEmailVerified: boolean;
    sellingAccountId: string | null;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, fullName: string, email: string, password: string) => Promise<void>;
    verifyEmail: (email: string, token: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await api.me();
                const currentUser = data?.user ?? data ?? null;
                console.log("Current user (me):", currentUser); // 👈 add karyu
                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function login(email: string, password: string) {
        const data = await api.login({ email, password });
        const loggedInUser = data?.user ?? data ?? null;
        console.log("Logged in user:", loggedInUser);
        setUser(loggedInUser);
    }

    async function signup(username: string, fullName: string, email: string, password: string) {
        const data = await api.signup({ username, fullName, email, password });
        setUser(data?.user ?? data ?? null);
    }

    async function verifyEmail(email: string, token: string) {
        const data = await api.verifyEmail({ email, token });
        setUser((prev) => (prev ? { ...prev, isEmailVerified: true } : prev));
        return data;
    }

    async function logout() {
        await api.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, verifyEmail, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}