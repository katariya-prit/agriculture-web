import type { GeminiCropAnalysis } from "../../../services/ai-service";

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    text?: string;
    imagePreviewUrl?: string;
    analysis?: GeminiCropAnalysis;
    isError?: boolean;
    timestamp: string;
}

export interface ChatSession {
    id: string;
    title: string;
    messages: ChatMessage[];
    createdAt: string;
}