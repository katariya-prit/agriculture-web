import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatHistorySidebar from "./core/ChatHistorySidebar";
import ChatMessageList from "./core/ChatMessageList";
import ChatInput from "./core/ChatInput";
import { sendChatMessage, analyzeCropWithGemini } from "../../services/ai-service";
import type { SupportedLanguage } from "../../services/ai-service";
import type { ChatMessage, ChatSession } from "./core/types";
import { useTheme } from "../../components/theme/ThemeContext";

function generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function AiChatbot() {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [language, setLanguage] = useState<SupportedLanguage>("gu");

    const activeSession = sessions.find((s) => s.id === activeSessionId) ?? null;
    const messages = activeSession?.messages ?? [];
    const hasMessages = messages.length > 0;

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
                const result = await analyzeCropWithGemini(imageFile, text, language);
                updateSessionMessages(sessionId, (msgs) => [
                    ...msgs,
                    { id: generateId(), role: "assistant", analysis: result, timestamp: new Date().toISOString() },
                ]);
            } else {
                const history = currentMessages
                    .filter((m) => m.text)
                    .map((m) => ({ role: m.role === "user" ? ("user" as const) : ("model" as const), text: m.text! }));

                const reply = await sendChatMessage(text, history, language);
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
        <div className={`relative flex h-full overflow-hidden rounded-2xl border ${isdark ? "border-gray-800 bg-gray-950" : "border-green-100 bg-white"}`}>
            
            <div className="flex min-w-0 flex-1 flex-col relative h-full">
                
                {hasMessages ? (
                    <div className="flex-1 overflow-y-auto">
                        <ChatMessageList messages={messages} loading={loading} />
                    </div>
                ) : (
                    <div className="flex-1" />
                )}

                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`w-full flex flex-col items-center transition-all duration-300 ${
                        hasMessages
                            ? "p-4 border-t border-black/5 dark:border-white/10"
                            : "justify-center p-6 pb-20"
                    }`}
                >
                    <AnimatePresence>
                        {!hasMessages && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6 text-center max-w-lg"
                            >
                                <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${
                                    isdark ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-100 text-emerald-700"
                                }`}>
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <h2 className={`text-2xl font-bold ${isdark ? "text-gray-100" : "text-gray-800"}`}>
                                    કેમ છો, ખેડૂત મિત્ર! 👋
                                </h2>
                                <p className={`text-xs sm:text-sm mt-1.5 ${isdark ? "text-gray-400" : "text-gray-500"}`}>
                                    પાકના રોગ, ખાતર અથવા ખેતી વિશે કંઈપણ પૂછો અથવા ફોટો અપલોડ કરો.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="w-full max-w-3xl">
                        <ChatInput 
                            onSend={handleSend} 
                            loading={loading} 
                            language={language} 
                            onLanguageChange={setLanguage} 
                        />
                    </div>
                </motion.div>
            </div>

            <div className="hidden lg:block">
                <ChatHistorySidebar 
                    sessions={sessions} 
                    activeSessionId={activeSessionId} 
                    onSelectSession={handleSelectSession} 
                    onNewChat={handleNewChat} 
                    onDeleteSession={handleDeleteSession} 
                />
            </div>

            {isHistoryOpen && (
                <div className="absolute inset-0 z-20 flex lg:hidden">
                    <div className="flex-1 bg-black/30" onClick={() => setIsHistoryOpen(false)} />
                    <div className="relative w-72 max-w-[80%]">
                        <button
                            type="button"
                            onClick={() => setIsHistoryOpen(false)}
                            className={`absolute -left-10 top-3 flex h-8 w-8 items-center justify-center rounded-full shadow-sm ${
                                isdark ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"
                            }`}
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <ChatHistorySidebar 
                            sessions={sessions} 
                            activeSessionId={activeSessionId} 
                            onSelectSession={handleSelectSession} 
                            onNewChat={handleNewChat} 
                            onDeleteSession={handleDeleteSession} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
}