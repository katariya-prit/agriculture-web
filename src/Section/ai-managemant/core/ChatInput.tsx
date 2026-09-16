import { useEffect, useRef, useState } from "react";
import { ArrowUp, ImagePlus, X, Loader2, Globe, Sparkles, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SupportedLanguage } from "../../../services/ai-service";
import { useTheme } from "../../../components/theme/ThemeContext";

interface Props {
    onSend: (text: string, imageFile: File | null) => void;
    loading: boolean;
    language: SupportedLanguage;
    onLanguageChange: (lang: SupportedLanguage) => void;
}

const LANGUAGES: { code: SupportedLanguage; label: string }[] = [
    { code: "gu", label: "ગુજરાતી" },
    { code: "hi", label: "हिंदी" },
    { code: "en", label: "English" },
];

export default function ChatInput({ onSend, loading, language, onLanguageChange }: Props) {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    const [text, setText] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const langWrapperRef = useRef<HTMLDivElement>(null);

    const selectedLang = LANGUAGES.find((l) => l.code === language);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "0px";
        const nextHeight = Math.min(el.scrollHeight, 160);
        el.style.height = `${nextHeight}px`;
    }, [text]);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (langWrapperRef.current && !langWrapperRef.current.contains(e.target as Node)) {
                setIsLangOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
        e.target.value = "";
    };

    const handleImageClear = () => {
        setImageFile(null);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
    };

    const handleSend = () => {
        if (loading) return;
        if (!text.trim() && !imageFile) return;
        onSend(text.trim(), imageFile);
        setText("");
        handleImageClear();
        textareaRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleLangSelect = (code: SupportedLanguage) => {
        onLanguageChange(code);
        setIsLangOpen(false);
    };

    const canSend = (text.trim().length > 0 || imageFile) && !loading;

    return (
        <div className={`p-2 sm:p-5 transition-colors duration-300 ${isdark ? "bg-zinc-950/80 backdrop-blur-md" : "bg-linear-to-t from-emerald-50/50 via-white/80 to-transparent backdrop-blur-md"
            }`}>
            <div className="mx-auto max-w-3xl w-full">
                <div
                    className={`relative flex flex-col w-full rounded-3xl border transition-all duration-300 ${isdark
                            ? isFocused
                                ? "bg-[#1f1f1f]/90 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.15)]"
                                : "bg-[#18181b]/80 border-zinc-800 hover:border-zinc-700 shadow-xl"
                            : isFocused
                                ? "bg-white border-emerald-500/60 shadow-[0_10px_30px_rgba(16,185,129,0.12)]"
                                : "bg-[#eef2f5] border-white/80 shadow-[6px_6px_16px_#c5c9cc,-6px_-6px_16px_#ffffff]"
                        }`}
                >
                    <AnimatePresence>
                        {previewUrl && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className={`flex items-center gap-3 border-b px-3 sm:px-4 py-2.5 sm:py-3 ${isdark ? "border-zinc-800/80 bg-zinc-900/50" : "border-gray-200/60 bg-green-50/30"
                                    } rounded-t-3xl`}
                            >
                                <div className="relative group shrink-0">
                                    <img
                                        src={previewUrl}
                                        alt="Selected crop"
                                        className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl object-cover border shadow-sm transition-transform duration-200 group-hover:scale-105 ${isdark ? "border-zinc-700" : "border-emerald-300"
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleImageClear}
                                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                                        title="Remove image"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className={`text-xs font-semibold truncate ${isdark ? "text-zinc-200" : "text-gray-800"}`}>
                                        Image Attached
                                    </span>
                                    <span className={`text-[11px] truncate ${isdark ? "text-zinc-500" : "text-gray-500"}`}>
                                        AI ready to analyze this image
                                    </span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-end gap-1.5 sm:gap-2 p-2 sm:p-3 w-full">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                            className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-2xl transition-all cursor-pointer disabled:opacity-40 ${isdark
                                    ? "text-emerald-400 hover:bg-zinc-800/80 hover:text-emerald-300"
                                    : "text-emerald-700 hover:bg-emerald-100/60 hover:text-emerald-800"
                                }`}
                            title="Upload image for AI analysis"
                        >
                            <ImagePlus className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                        </motion.button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageSelect}
                        />

                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Ask AI about crops or upload an image..."
                            rows={1}
                            disabled={loading}
                            className={`no-scrollbar min-w-0 max-h-40 min-h-9 sm:min-h-10 flex-1 resize-none bg-transparent py-1.5 sm:py-2 px-1 text-sm leading-relaxed outline-none transition-colors disabled:opacity-60 ${isdark
                                    ? "text-zinc-100 placeholder:text-zinc-500"
                                    : "text-zinc-800 placeholder:text-zinc-400"
                                }`}
                        />

                        <div ref={langWrapperRef} className="relative shrink-0 select-none">
                            <motion.button
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.97 }}
                                type="button"
                                disabled={loading}
                                onClick={() => setIsLangOpen((p) => !p)}
                                title="Choose response language"
                                className={`flex h-9 sm:h-10 items-center gap-1 sm:gap-1.5 rounded-2xl border px-2 sm:px-3 text-[11px] sm:text-xs font-semibold transition-all disabled:opacity-40 cursor-pointer ${
                                    isdark
                                        ? "border-zinc-700/80 bg-zinc-800/50 text-emerald-400 hover:border-emerald-500/40"
                                        : "border-white/60 bg-[#eef2f5] text-emerald-700 shadow-[inset_2px_2px_4px_#c5c9cc,inset_-2px_-2px_4px_#ffffff] hover:text-emerald-800"
                                }`}
                            >
                                <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 opacity-80" />
                                <span className="sm:hidden">{selectedLang?.code.toUpperCase()}</span>
                                <span className="hidden sm:inline">{selectedLang?.label}</span>
                                <ChevronDown
                                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`}
                                />
                            </motion.button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                        transition={{ duration: 0.15 }}
                                        className={`absolute bottom-full right-0 z-50 mb-2 w-36 sm:w-40 overflow-hidden rounded-[20px] border p-1.5 ${
                                            isdark
                                                ? "border-zinc-800 bg-[#18181b] shadow-2xl"
                                                : "border-white/80 bg-[#eef2f5] shadow-[8px_8px_16px_#c5c9cc,-8px_-8px_16px_#ffffff]"
                                        }`}
                                    >
                                        {LANGUAGES.map((l) => (
                                            <button
                                                key={l.code}
                                                type="button"
                                                onClick={() => handleLangSelect(l.code)}
                                                className={`flex w-full items-center justify-between rounded-[12px] px-3 py-2.5 text-left text-xs transition-all duration-200 cursor-pointer ${
                                                    l.code === language
                                                        ? isdark
                                                            ? "bg-emerald-500/20 text-emerald-400 font-semibold"
                                                            : "bg-emerald-600 text-white font-semibold shadow-md"
                                                        : isdark
                                                        ? "text-zinc-300 hover:bg-zinc-800/80"
                                                        : "text-gray-700 hover:bg-[#e2e7ec]"
                                                }`}
                                            >
                                                {l.label}
                                                {l.code === language && <Check className="h-3.5 w-3.5 shrink-0" />}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.button
                            whileHover={{ scale: canSend ? 1.05 : 1 }}
                            whileTap={{ scale: canSend ? 0.95 : 1 }}
                            type="button"
                            onClick={handleSend}
                            disabled={!canSend}
                            className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${canSend
                                    ? isdark
                                        ? "bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:bg-emerald-400 cursor-pointer"
                                        : "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 hover:bg-emerald-700 cursor-pointer"
                                    : isdark
                                        ? "bg-zinc-800/50 text-zinc-600 cursor-not-allowed"
                                        : "bg-gray-200/80 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 sm:h-4.5 sm:w-4.5 animate-spin" />
                            ) : canSend ? (
                                <Sparkles className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                            ) : (
                                <ArrowUp className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                            )}
                        </motion.button>
                    </div>
                </div>

                <div className="mt-2 flex items-center justify-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] px-2 text-center">
                    <span className={isdark ? "text-zinc-500" : "text-zinc-400"}>
                        <span className="hidden sm:inline">Press </span>
                        <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${isdark ? "bg-zinc-800 border-zinc-700 text-zinc-300" : "bg-gray-100 border-gray-300 text-gray-600"
                            }`}>Enter</kbd> <span className="hidden sm:inline">to send, </span>
                        <span className="sm:hidden"> · </span>
                        <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${isdark ? "bg-zinc-800 border-zinc-700 text-zinc-300" : "bg-gray-100 border-gray-300 text-gray-600"
                                }`}>Shift+Enter</kbd> <span className="hidden sm:inline">for new line</span>
                    </span>
                </div>
            </div>
        </div>
    );
}