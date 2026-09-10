import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, X } from "lucide-react";
import { useTheme } from "../../../components/theme/ThemeContext";

interface Props {
    previewUrl: string | null;
    onImageSelect: (file: File) => void;
    onImageClear: () => void;
}

export default function ImageUploader({ previewUrl, onImageSelect, onImageClear }: Props) {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageSelect(file);
        }
        e.target.value = "";
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {previewUrl ? (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative w-fit"
                    >
                        <img
                            src={previewUrl}
                            alt="Selected crop"
                            className={`h-16 w-16 rounded-xl border object-cover shadow-sm ${
                                isdark ? "border-gray-700" : "border-green-200"
                            }`}
                        />
                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.85 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={onImageClear}
                            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600"
                        >
                            <X className="h-3 w-3" />
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.button
                        key="upload-btn"
                        type="button"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onClick={() => inputRef.current?.click()}
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                            isdark
                                ? "border-gray-700 text-green-400 hover:bg-gray-800"
                                : "border-green-200 text-green-700 hover:bg-green-50"
                        }`}
                        title="Image upload karo"
                    >
                        <ImagePlus className="h-4.5 w-4.5" />
                    </motion.button>
                )}
            </AnimatePresence>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </>
    );
}