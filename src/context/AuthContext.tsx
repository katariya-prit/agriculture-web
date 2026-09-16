import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService, type User } from "../services/authService";
import { setUnauthorizedHandler } from "../services/httpClient";

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
        setUnauthorizedHandler(() => setUser(null));

        (async () => {
            try {
                const currentUser = await authService.me();
                setUser(currentUser);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function login(email: string, password: string) {
        const loggedInUser = await authService.login({ email, password });
        setUser(loggedInUser);
    }

    async function signup(username: string, fullName: string, email: string, password: string) {
        await authService.signup({ username, fullName, email, password });
    }

    async function verifyEmail(email: string, token: string) {
        await authService.verifyEmail({ email, token });
        setUser((prev) => (prev ? { ...prev, isEmailVerified: true } : prev));
    }

    async function logout() {
        await authService.logout();
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