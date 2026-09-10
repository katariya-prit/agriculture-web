import { Plus, MessageSquare, Trash2 } from "lucide-react";
import type { ChatSession } from "./types";
import { useTheme } from "../../../components/theme/ThemeContext";

interface Props {
    sessions: ChatSession[];
    activeSessionId: string | null;
    onSelectSession: (id: string) => void;
    onNewChat: () => void;
    onDeleteSession: (id: string) => void;
}

export default function ChatHistorySidebar({ sessions, activeSessionId, onSelectSession, onNewChat, onDeleteSession }: Props) {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    return (
        <aside className={`flex h-full w-72 flex-col border-l ${isdark ? "border-gray-800 bg-gray-950" : "border-green-100 bg-white"}`}>
            <div className={`border-b p-3 ${isdark ? "border-gray-800" : "border-green-100"}`}>
                <button
                    type="button"
                    onClick={onNewChat}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white ${
                        isdark ? "bg-green-600 hover:bg-green-500" : "bg-green-700 hover:bg-green-800"
                    }`}
                >
                    <Plus className="h-4 w-4" />
                    Navi Chat
                </button>
            </div>

            <div className="no-scrollbar flex-1 overflow-y-auto p-2">
                <p className={`mb-2 px-2 text-[11px] font-bold uppercase tracking-wide ${isdark ? "text-gray-600" : "text-gray-400"}`}>Chat History</p>

                {sessions.length === 0 ? (
                    <p className={`px-2 py-4 text-center text-xs ${isdark ? "text-gray-600" : "text-gray-400"}`}>Hajay koi chat nathi</p>
                ) : (
                    <div className="flex flex-col gap-1">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className={`group flex items-center gap-2 rounded-lg px-2 py-2 text-sm ${
                                    activeSessionId === session.id
                                        ? isdark
                                            ? "bg-green-950 text-green-300"
                                            : "bg-green-50 text-green-800"
                                        : isdark
                                        ? "text-gray-400 hover:bg-gray-900"
                                        : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                <button type="button" onClick={() => onSelectSession(session.id)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
                                    <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate">{session.title}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDeleteSession(session.id)}
                                    className={`shrink-0 sm:opacity-0 sm:group-hover:opacity-100 ${isdark ? "text-gray-600 hover:text-red-400" : "text-gray-400 hover:text-red-500"}`}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
}