// Auth/EmailVerification.tsx
import { useEffect, useRef, useState, type KeyboardEvent, type ClipboardEvent } from "react";
import { useLocation, useNavigate, useSearchParams, Link } from "react-router-dom";
import { Sprout, MailCheck } from "lucide-react";
import { authService } from "../services/authService";
import { toast } from "sonner";

const theme = {
    forest: "#0B3D26",
    forestSoft: "#12532F",
    leaf: "#1E8F4E",
    leafSoft: "#EAF6EE",
    ink: "#0F2B1D",
    inkSoft: "#5B6E63",
    line: "#DCE8DF",
} as const;

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;

export default function EmailVerification() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // Signup pachi navigate(..., { state: { email } }) thi aave chhe,
    // ya direct link kholay to ?email=... thi
    const email = (location.state as { email?: string })?.email ?? searchParams.get("email") ?? "";

    const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    function handleChange(index: number, value: string) {
        const clean = value.replace(/\D/g, "").slice(-1);
        setDigits((prev) => {
            const next = [...prev];
            next[index] = clean;
            return next;
        });
        if (clean && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Backspace" && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
        if (!pasted) return;
        e.preventDefault();
        const next = Array(OTP_LENGTH).fill("");
        pasted.split("").forEach((d, i) => (next[i] = d));
        setDigits(next);
        inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
    }

    async function handleSubmit() {
        const otp = digits.join("");
        if (otp.length < OTP_LENGTH) {
            toast.error("Pura 6 digit OTP nakho.");
            return;
        }
        if (!email) {
            toast.error("Email nathi malyu. Signup page par pacha jao.");
            return;
        }

        setLoading(true);
        try {
            await authService.verifyEmail({ email, token: otp });
            toast.success("Email verify thai gayu!");
            navigate("/login");
        } catch (err: any) {
            toast.error(err?.message ?? "OTP khotu chhe ke expire thai gayu.");
            setDigits(Array(OTP_LENGTH).fill(""));
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    }

    async function handleResend() {
        if (!email || cooldown > 0) return;
        setResending(true);
        try {
            await authService.resendVerification({ email });
            toast.success("Navu OTP mokli didhu chhe.");
            setCooldown(RESEND_COOLDOWN_SECONDS);
            setDigits(Array(OTP_LENGTH).fill(""));
            inputRefs.current[0]?.focus();
        } catch {
            toast.error("OTP mokalva ma error aavi.");
        } finally {
            setResending(false);
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                <div className="mb-6 flex flex-col items-center gap-2">
                    <div
                        className="grid h-12 w-12 place-items-center rounded-xl text-white"
                        style={{ background: `linear-gradient(120deg, ${theme.forest}, ${theme.forestSoft})` }}
                    >
                        <Sprout className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: theme.forest }}>
                        FarmLoop
                    </span>
                </div>

                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full" style={{ background: theme.leafSoft }}>
                        <MailCheck className="h-6 w-6" style={{ color: theme.leaf }} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold" style={{ color: theme.ink }}>
                            Email verify karo
                        </h1>
                        <p className="mt-1 text-sm" style={{ color: theme.inkSoft }}>
                            {email ? (
                                <>
                                    <span className="font-medium" style={{ color: theme.ink }}>
                                        {email}
                                    </span>{" "}
                                    par mokleli 6-digit OTP nakho
                                </>
                            ) : (
                                "Tamara email par mokleli 6-digit OTP nakho"
                            )}
                        </p>
                    </div>
                </div>

                {/* OTP boxes */}
                <div className="mt-6 flex justify-center gap-2">
                    {digits.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => {
                                inputRefs.current[i] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            onPaste={handlePaste}
                            className="h-12 w-11 rounded-xl border text-center text-lg font-semibold outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
                            style={{ borderColor: theme.line, color: theme.ink }}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-6 w-full rounded-full py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ background: theme.leaf }}
                >
                    {loading ? "Verify thai rahyu chhe..." : "Verify Karo"}
                </button>

                <p className="mt-4 text-center text-sm" style={{ color: theme.inkSoft }}>
                    OTP na malyu?{" "}
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={resending || cooldown > 0}
                        className="font-semibold hover:underline disabled:opacity-50 disabled:no-underline"
                        style={{ color: theme.forest }}
                    >
                        {cooldown > 0 ? `Fari mokalo (${cooldown}s)` : resending ? "Mokli rahya chhe..." : "Fari mokalo"}
                    </button>
                </p>

                <p className="mt-2 text-center text-xs">
                    <Link to="/login" className="hover:underline" style={{ color: theme.inkSoft }}>
                        Login page par pacha jao
                    </Link>
                </p>
            </div>
        </div>
    );
}