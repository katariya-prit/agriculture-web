import { useEffect, useRef, useState } from "react";
import { ArrowUp, ImagePlus, X, Loader2 } from "lucide-react";
import type { SupportedLanguage } from "../../../services/ai-service";

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
    const [text, setText] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isFocused, setIsFocused] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
    }, [text]);

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

    const canSend = (text.trim().length > 0 || imageFile) && !loading;

    return (
        <div className="border-t border-green-100 bg-linear-to-b from-white to-green-50/40 p-3 sm:p-4">
            <div
                className={`mx-auto max-w-3xl rounded-2xl border bg-white shadow-sm transition-all duration-200 ${
                    isFocused ? "border-green-400 shadow-md shadow-green-100" : "border-gray-200"
                }`}
            >
                {previewUrl && (
                    <div className="flex items-center gap-2 border-b border-gray-100 px-3 pt-3">
                        <div className="relative">
                            <img src={previewUrl} alt="Selected crop" className="h-14 w-14 rounded-xl border border-green-200 object-cover" />
                            <button type="button" onClick={handleImageClear} className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600">
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400">Image attach thayu chhe</p>
                    </div>
                )}

                <div className="flex items-end gap-2 p-2.5">
                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={loading} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-green-700 transition-colors hover:bg-green-50 disabled:opacity-40" title="Image upload karo">
                        <ImagePlus className="h-5 w-5" />
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />

                    <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Pak vishe puchho athva image upload karo..."
                        rows={1}
                        disabled={loading}
                        className="max-h-36 flex-1 resize-none bg-transparent py-2 text-sm leading-relaxed text-gray-800 placeholder:text-gray-400 outline-none disabled:opacity-60"
                    />

                    {/* Language select — textarea ni sathej */}
                    <select
                        value={language}
                        onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                        disabled={loading}
                        title="Jawab ni bhasha"
                        className="h-10 shrink-0 rounded-xl border border-green-200 bg-white px-2 text-xs font-medium text-green-700 outline-none disabled:opacity-40"
                    >
                        {LANGUAGES.map((l) => (
                            <option key={l.code} value={l.code}>{l.label}</option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={!canSend}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                            canSend ? "bg-green-700 text-white shadow-sm hover:bg-green-800 active:scale-95" : "bg-gray-100 text-gray-300"
                        }`}
                    >
                        {loading ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : <ArrowUp className="h-4.5 w-4.5" />}
                    </button>
                </div>
            </div>

            <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-gray-400">
                Enter thi send karo, Shift + Enter thi navi line
            </p>
        </div>
    );
}