import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, X, UploadCloud, Sparkles } from "lucide-react";
import { useTheme } from "../../../components/theme/ThemeContext";

interface Props {
    previewUrl: string | null;
    onImageSelect: (file: File) => void;
    onImageClear: () => void;
}

export default function ImageUploader({ previewUrl, onImageSelect, onImageClear }: Props) {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageSelect(file);
            setIsModalOpen(false);
        }
        e.target.value = "";
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {previewUrl ? (
                    <motion.div
                        key="preview-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative shrink-0"
                    >
                        <div className={`flex items-center gap-2 p-1.5 pr-3 rounded-2xl border ${
                            isdark 
                                ? "bg-zinc-900/90 border-emerald-500/40 text-emerald-400" 
                                : "bg-emerald-50/80 border-emerald-200 text-emerald-800"
                        }`}>
                            <img
                                src={previewUrl}
                                alt="Crop preview"
                                onClick={() => setIsZoomOpen(true)}
                                className="h-9 w-9 rounded-xl object-cover cursor-pointer transition-transform hover:scale-105"
                                title="Click to view full image"
                            />
                            <div className="flex flex-col text-left cursor-pointer" onClick={() => setIsZoomOpen(true)}>
                                <span className="text-[11px] font-bold leading-none">Photo Attached</span>
                                <span className={`text-[9px] ${isdark ? "text-zinc-500" : "text-gray-500"}`}>Tap to view</span>
                            </div>
                            <button
                                type="button"
                                onClick={onImageClear}
                                className="ml-1 rounded-lg p-1 transition-colors hover:bg-red-500/20 hover:text-red-500 cursor-pointer"
                                title="Remove Image"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="open-modal-btn"
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsModalOpen(true)}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-all cursor-pointer ${
                            isdark
                                ? "border-zinc-800 bg-zinc-900/80 text-emerald-400 hover:border-emerald-500/50"
                                : "border-emerald-200/80 bg-emerald-50/60 text-emerald-700 hover:bg-emerald-100/80"
                        }`}
                        title="Upload Image"
                    >
                        <ImagePlus className="h-5 w-5" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`relative w-full max-w-md rounded-3xl p-6 border shadow-2xl ${
                                isdark ? "bg-zinc-900 border-zinc-800 text-zinc-100" : "bg-white border-gray-100 text-gray-800"
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="absolute right-4 top-4 rounded-full p-2 hover:bg-zinc-800/20 cursor-pointer"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <div className="mb-5 text-center">
                                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <h3 className="text-base font-bold">Upload Crop Image</h3>
                            </div>

                            <div
                                onClick={() => inputRef.current?.click()}
                                className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-500/40 p-6 text-center cursor-pointer hover:bg-emerald-500/5 transition-all"
                            >
                                <UploadCloud className="h-8 w-8 mb-2 text-emerald-500" />
                                <p className="text-xs font-semibold">Click to select photo</p>
                            </div>

                            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isZoomOpen && previewUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsZoomOpen(false)}
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
                            <img src={previewUrl} alt="Zoomed Crop" className="max-h-[80vh] max-w-full object-contain rounded-2xl" />
                            <button
                                type="button"
                                onClick={() => setIsZoomOpen(false)}
                                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}