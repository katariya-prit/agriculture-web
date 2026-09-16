import { useState } from "react";
import { Leaf, AlertTriangle, CheckCircle2, Bot, User, ShieldCheck, Sprout, Bug, Stethoscope, X, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatMessage } from "./types";
import type { GeminiCropAnalysis } from "../../../services/ai-service";
import MarkdownText from "./MarkdownText";
import { useTheme } from "../../../components/theme/ThemeContext";

interface Props {
    messages: ChatMessage[];
    loading: boolean;
}

function isGeminiAnalysis(a: any): a is GeminiCropAnalysis {
    return a && typeof a.cropName === "string";
}

function AnalysisCard({ analysis, isdark }: { analysis: GeminiCropAnalysis; isdark: boolean }) {
    return (
        <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                        isdark ? "bg-emerald-500/15 text-emerald-400" : "bg-emerald-100 text-emerald-700"
                    }`}>
                        <Sprout className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="font-bold leading-tight">{analysis.cropName}</p>
                        <p className={`text-[10px] ${isdark ? "text-zinc-500" : "text-gray-400"}`}>
                            Confidence: {Math.round(analysis.confidence)}%
                        </p>
                    </div>
                </div>

                <div
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        analysis.isHealthy
                            ? isdark
                                ? "bg-emerald-500/15 text-emerald-400"
                                : "bg-emerald-100 text-emerald-700"
                            : isdark
                            ? "bg-red-500/15 text-red-400"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {analysis.isHealthy ? (
                        <>
                            <CheckCircle2 className="h-3 w-3" /> Healthy
                        </>
                    ) : (
                        <>
                            <AlertTriangle className="h-3 w-3" /> {analysis.diseaseName || "Disease Detected"}
                        </>
                    )}
                </div>
            </div>

            {analysis.description && (
                <div className={`rounded-2xl p-3 ${isdark ? "bg-white/5" : "bg-gray-50"}`}>
                    <MarkdownText text={analysis.description} />
                </div>
            )}

            {analysis.symptoms && analysis.symptoms.length > 0 && (
                <div>
                    <div className="mb-1.5 flex items-center gap-1.5 font-semibold text-[11px] uppercase tracking-wide opacity-70">
                        <Stethoscope className="h-3.5 w-3.5" /> Symptoms
                    </div>
                    <ul className="space-y-1">
                        {analysis.symptoms.map((s, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${isdark ? "bg-zinc-500" : "bg-gray-400"}`} />
                                <span>{s}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {analysis.treatment && (
                <div className="space-y-2.5">
                    {analysis.treatment.organic?.length > 0 && (
                        <div className={`rounded-2xl border p-3 ${isdark ? "border-emerald-500/20 bg-emerald-500/5" : "border-emerald-100 bg-emerald-50/60"}`}>
                            <div className="mb-1.5 flex items-center gap-1.5 font-semibold text-[11px] uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                                <Leaf className="h-3.5 w-3.5" /> Organic Treatment
                            </div>
                            <ul className="space-y-1">
                                {analysis.treatment.organic.map((t, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {analysis.treatment.chemical?.length > 0 && (
                        <div className={`rounded-2xl border p-3 ${isdark ? "border-amber-500/20 bg-amber-500/5" : "border-amber-100 bg-amber-50/60"}`}>
                            <div className="mb-1.5 flex items-center gap-1.5 font-semibold text-[11px] uppercase tracking-wide text-amber-600 dark:text-amber-400">
                                <Bug className="h-3.5 w-3.5" /> Chemical Treatment
                            </div>
                            <ul className="space-y-1">
                                {analysis.treatment.chemical.map((t, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {analysis.treatment.prevention?.length > 0 && (
                        <div className={`rounded-2xl border p-3 ${isdark ? "border-sky-500/20 bg-sky-500/5" : "border-sky-100 bg-sky-50/60"}`}>
                            <div className="mb-1.5 flex items-center gap-1.5 font-semibold text-[11px] uppercase tracking-wide text-sky-600 dark:text-sky-400">
                                <ShieldCheck className="h-3.5 w-3.5" /> Prevention
                            </div>
                            <ul className="space-y-1">
                                {analysis.treatment.prevention.map((t, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-500" />
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function ChatMessageList({ messages, loading }: Props) {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className={`no-scrollbar flex-1 overflow-y-auto p-4 sm:p-6 transition-colors duration-300 ${
            isdark ? "bg-[#09090b]" : "bg-linear-to-b from-slate-50 via-white to-slate-50"
        }`}>
            {messages.length === 0 && !loading && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex h-full flex-col items-center justify-center text-center p-6"
                >
                    <div className={`relative flex h-16 w-16 items-center justify-center rounded-3xl mb-4 transition-all ${
                        isdark
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                            : "bg-emerald-100/80 text-emerald-700 shadow-lg shadow-emerald-500/10"
                    }`}>
                        <Leaf className="h-8 w-8 animate-pulse" />
                    </div>
                    <h3 className={`text-base font-bold mb-1 ${isdark ? "text-zinc-200" : "text-gray-800"}`}>
                        Crop Care AI Assistant
                    </h3>
                    <p className={`max-w-xs text-xs leading-relaxed ${isdark ? "text-zinc-500" : "text-gray-500"}`}>
                        Pak ni image upload karo અથવા તમારા ખેતી સંબંધિત પ્રશ્નો પૂછો.
                    </p>
                </motion.div>
            )}

            <div className="mx-auto max-w-3xl space-y-6">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
                                msg.role === "user"
                                    ? isdark ? "bg-zinc-800 text-zinc-300 border border-zinc-700" : "bg-gray-200 text-gray-700"
                                    : isdark ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-emerald-600 text-white shadow-md"
                            }`}>
                                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>

                            <div className={`relative max-w-[85%] sm:max-w-[80%] rounded-3xl p-4 transition-all ${
                                msg.role === "user"
                                    ? isdark ? "bg-emerald-600 text-white rounded-tr-sm" : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-sm"
                                    : isdark ? "bg-[#18181b] border border-zinc-800 text-zinc-200 rounded-tl-sm" : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm"
                            }`}>
                                {msg.imagePreviewUrl && (
                                    <div
                                        onClick={() => setSelectedImage(msg.imagePreviewUrl!)}
                                        className="mb-3 cursor-pointer overflow-hidden rounded-2xl border border-black/10 group relative"
                                    >
                                        <img
                                            src={msg.imagePreviewUrl}
                                            alt="uploaded crop"
                                            className="max-h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold backdrop-blur-[2px]">
                                            Click to Zoom 🔍
                                        </div>
                                    </div>
                                )}

                                {msg.text && (
                                    <div className="text-xs sm:text-sm leading-relaxed">
                                        {msg.role === "user" ? (
                                            <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
                                        ) : (
                                            <MarkdownText text={msg.text} />
                                        )}
                                    </div>
                                )}

                                {msg.analysis && isGeminiAnalysis(msg.analysis) && (
                                    <AnalysisCard analysis={msg.analysis} isdark={isdark} />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3"
                    >
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl shadow-sm ${
                            isdark ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-emerald-600 text-white shadow-md"
                        }`}>
                            <Bot className="h-4 w-4" />
                        </div>
                        <div className={`rounded-3xl rounded-tl-sm p-4 ${isdark ? "bg-[#18181b] border border-zinc-800" : "bg-white border border-gray-100"}`}>
                            <div className="flex items-center gap-1.5">
                                <span className={`h-1.5 w-1.5 rounded-full animate-bounce ${isdark ? "bg-zinc-500" : "bg-gray-400"}`} style={{ animationDelay: "0ms" }} />
                                <span className={`h-1.5 w-1.5 rounded-full animate-bounce ${isdark ? "bg-zinc-500" : "bg-gray-400"}`} style={{ animationDelay: "150ms" }} />
                                <span className={`h-1.5 w-1.5 rounded-full animate-bounce ${isdark ? "bg-zinc-500" : "bg-gray-400"}`} style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.7, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.7, y: 20 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-3xl border border-white/20 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedImage} alt="Crop view" className="max-h-[80vh] max-w-full object-contain rounded-2xl" />
                            <button
                                type="button"
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}