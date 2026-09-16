import { Plus, MessageSquare, Trash2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatSession } from "./types";
import { useTheme } from "../../../components/theme/ThemeContext";

interface Props {
    sessions: ChatSession[];
    activeSessionId: string | null;
    onSelectSession: (id: string) => void;
    onNewChat: () => void;
    onDeleteSession: (id: string) => void;
}

export default function ChatHistorySidebar({
    sessions,
    activeSessionId,
    onSelectSession,
    onNewChat,
    onDeleteSession,
}: Props) {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    return (
        <aside
            className={`flex h-full w-72 flex-col border-l transition-all duration-300 select-none ${
                isdark
                    ? "border-zinc-800/80 bg-[#121214]"
                    : "border-gray-200/80 bg-[#eef2f5]"
            }`}
        >
            {/* Top Action Header */}
            <div
                className={`p-3.5 border-b ${
                    isdark ? "border-zinc-800/80" : "border-gray-200/80"
                }`}
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onNewChat}
                    className={`flex w-full items-center justify-center gap-2.5 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                        isdark
                            ? "bg-emerald-500 text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:bg-emerald-400"
                            : "bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700"
                    }`}
                >
                    <Plus className="h-4 w-4 stroke-[3]" />
                    <span>Navi Chat</span>
                </motion.button>
            </div>

            {/* Chat History List */}
            <div className="no-scrollbar flex-1 overflow-y-auto p-3">
                <div className="flex items-center justify-between mb-3 px-2">
                    <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                            isdark ? "text-zinc-500" : "text-gray-400"
                        }`}
                    >
                        Chat History
                    </span>
                    {sessions.length > 0 && (
                        <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                isdark
                                    ? "bg-zinc-800 text-zinc-400"
                                    : "bg-gray-200/80 text-gray-600"
                            }`}
                        >
                            {sessions.length}
                        </span>
                    )}
                </div>

                {sessions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-12 px-4 text-center">
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                                isdark
                                    ? "bg-zinc-800/50 text-zinc-600"
                                    : "bg-gray-200/60 text-gray-400"
                            }`}
                        >
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <p
                            className={`text-xs font-medium ${
                                isdark ? "text-zinc-500" : "text-gray-400"
                            }`}
                        >
                            Hajay koi chat nathi
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1.5">
                        <AnimatePresence>
                            {sessions.map((session) => {
                                const isActive = activeSessionId === session.id;
                                return (
                                    <motion.div
                                        key={session.id}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                                            isActive
                                                ? isdark
                                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm"
                                                    : "bg-white text-emerald-800 border border-emerald-200/80 shadow-[2px_2px_8px_rgba(0,0,0,0.04)]"
                                                : isdark
                                                ? "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                                                : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => onSelectSession(session.id)}
                                            className="flex min-w-0 flex-1 items-center gap-2.5 text-left cursor-pointer"
                                        >
                                            <MessageSquare
                                                className={`h-4 w-4 shrink-0 transition-colors ${
                                                    isActive
                                                        ? isdark
                                                            ? "text-emerald-400"
                                                            : "text-emerald-700"
                                                        : isdark
                                                        ? "text-zinc-500 group-hover:text-zinc-300"
                                                        : "text-gray-400 group-hover:text-gray-600"
                                                }`}
                                            />
                                            <span className="truncate">{session.title}</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDeleteSession(session.id);
                                            }}
                                            title="Delete Chat"
                                            className={`ml-1 shrink-0 rounded-lg p-1 transition-all opacity-0 group-hover:opacity-100 cursor-pointer ${
                                                isdark
                                                    ? "text-zinc-500 hover:bg-red-500/20 hover:text-red-400"
                                                    : "text-gray-400 hover:bg-red-50 hover:text-red-500"
                                            }`}
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </aside>
    );
}