// components/ai-management/core/ImageUploader.tsx
import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";

interface Props {
    previewUrl: string | null;
    onImageSelect: (file: File) => void;
    onImageClear: () => void;
}

export default function ImageUploader({ previewUrl, onImageSelect, onImageClear }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageSelect(file);
        }
        e.target.value = "";
    };

    if (previewUrl) {
        return (
            <div className="relative w-fit">
                <img
                    src={previewUrl}
                    alt="Selected crop"
                    className="h-16 w-16 rounded-lg border border-green-200 object-cover"
                />
                <button
                    type="button"
                    onClick={onImageClear}
                    className="absolute -right-1.5 -top-1.5 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600"
                >
                    <X className="h-3 w-3" />
                </button>
            </div>
        );
    }

    return (
        <>
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-green-200 text-green-700 hover:bg-green-50"
                title="Image upload karo"
            >
                <ImagePlus className="h-4.5 w-4.5" />
            </button>
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