export type SupportedLanguage = "gu" | "hi" | "en";

export interface GeminiCropAnalysis {
    cropName: string;
    isHealthy: boolean;
    diseaseName: string | null;
    confidence: number;
    symptoms: string[];
    description: string;
    treatment: {
        organic: string[];
        chemical: string[];
        prevention: string[];
    };
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3333";

export async function analyzeCropWithGemini(
    imageFile: File,
    message: string,
    language: SupportedLanguage = "gu"
): Promise<GeminiCropAnalysis> {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("language", language);
    if (message) formData.append("message", message);

    const res = await fetch(`${API_BASE}/api/ai/crop-analysis`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Crop analysis failed");
    return data.data;
}

export async function sendChatMessage(
    message: string,
    history: { role: "user" | "model"; text: string }[],
    language: SupportedLanguage = "gu"
): Promise<string> {
    const res = await fetch(`${API_BASE}/api/ai/gemini/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message, history, language }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Chat failed");
    return data.data.reply;
}