import { useState } from "react";
import { History, X } from "lucide-react";
import ChatHistorySidebar from "./core/ChatHistorySidebar";
import ChatMessageList from "./core/ChatMessageList";
import ChatInput from "./core/ChatInput";
import { sendChatMessage, analyzeCropWithGemini } from "../../services/ai-service";
import type { SupportedLanguage } from "../../services/ai-service";
import type { ChatMessage, ChatSession } from "./core/types";

function generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function AiChatbot() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [language, setLanguage] = useState<SupportedLanguage>("gu"); // ← navu

    const activeSession = sessions.find((s) => s.id === activeSessionId) ?? null;

    const handleNewChat = () => {
        const newSession: ChatSession = { id: generateId(), title: "Navi Chat", messages: [], createdAt: new Date().toISOString() };
        setSessions((prev) => [newSession, ...prev]);
        setActiveSessionId(newSession.id);
        setIsHistoryOpen(false);
    };

    const handleSelectSession = (id: string) => {
        setActiveSessionId(id);
        setIsHistoryOpen(false);
    };

    const handleDeleteSession = (id: string) => {
        setSessions((prev) => prev.filter((s) => s.id !== id));
        if (activeSessionId === id) setActiveSessionId(null);
    };

    const updateSessionMessages = (sessionId: string, updater: (msgs: ChatMessage[]) => ChatMessage[]) => {
        setSessions((prev) => prev.map((s) => (s.id === sessionId ? { ...s, messages: updater(s.messages) } : s)));
    };

    const handleSend = async (text: string, imageFile: File | null) => {
        let sessionId = activeSessionId;
        let currentMessages: ChatMessage[] = [];

        if (!sessionId) {
            const newSession: ChatSession = { id: generateId(), title: text.slice(0, 30) || "Image Analysis", messages: [], createdAt: new Date().toISOString() };
            setSessions((prev) => [newSession, ...prev]);
            sessionId = newSession.id;
            setActiveSessionId(sessionId);
        } else {
            currentMessages = sessions.find((s) => s.id === sessionId)?.messages ?? [];
        }

        const userMessage: ChatMessage = {
            id: generateId(),
            role: "user",
            text: text || undefined,
            imagePreviewUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
            timestamp: new Date().toISOString(),
        };

        updateSessionMessages(sessionId, (msgs) => [...msgs, userMessage]);

        setSessions((prev) =>
            prev.map((s) => (s.id === sessionId && s.messages.length <= 1 ? { ...s, title: text.slice(0, 30) || "Image Analysis" } : s))
        );

        setLoading(true);

        try {
            if (imageFile) {
                const result = await analyzeCropWithGemini(imageFile, text, language); // ← language add
                updateSessionMessages(sessionId, (msgs) => [
                    ...msgs,
                    { id: generateId(), role: "assistant", analysis: result, timestamp: new Date().toISOString() },
                ]);
            } else {
                const history = currentMessages
                    .filter((m) => m.text)
                    .map((m) => ({ role: m.role === "user" ? ("user" as const) : ("model" as const), text: m.text! }));

                const reply = await sendChatMessage(text, history, language); // ← language add
                updateSessionMessages(sessionId, (msgs) => [
                    ...msgs,
                    { id: generateId(), role: "assistant", text: reply, timestamp: new Date().toISOString() },
                ]);
            }
        } catch (err) {
            updateSessionMessages(sessionId, (msgs) => [
                ...msgs,
                { id: generateId(), role: "assistant", text: err instanceof Error ? err.message : "Kaik galat thayu", isError: true, timestamp: new Date().toISOString() },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-full overflow-hidden rounded-2xl border border-green-100">
            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center justify-between border-b border-green-100 p-3">
                    <div>
                        <p className="text-sm font-bold text-green-950">AI Pak Sahayak</p>
                        <p className="text-xs text-gray-400">Sawal pucho athva image upload karo</p>
                    </div>
                    <button type="button" onClick={() => setIsHistoryOpen(true)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-green-200 text-green-700 hover:bg-green-50 lg:hidden">
                        <History className="h-4.5 w-4.5" />
                    </button>
                </div>

                <ChatMessageList messages={activeSession?.messages ?? []} loading={loading} />
                <ChatInput onSend={handleSend} loading={loading} language={language} onLanguageChange={setLanguage} />
            </div>

            <div className="hidden lg:block">
                <ChatHistorySidebar sessions={sessions} activeSessionId={activeSessionId} onSelectSession={handleSelectSession} onNewChat={handleNewChat} onDeleteSession={handleDeleteSession} />
            </div>

            {isHistoryOpen && (
                <div className="absolute inset-0 z-20 flex lg:hidden">
                    <div className="flex-1 bg-black/30" onClick={() => setIsHistoryOpen(false)} />
                    <div className="relative w-72 max-w-[80%]">
                        <button type="button" onClick={() => setIsHistoryOpen(false)} className="absolute -left-10 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm">
                            <X className="h-4 w-4" />
                        </button>
                        <ChatHistorySidebar sessions={sessions} activeSessionId={activeSessionId} onSelectSession={handleSelectSession} onNewChat={handleNewChat} onDeleteSession={handleDeleteSession} />
                    </div>
                </div>
            )}
        </div>
    );
}