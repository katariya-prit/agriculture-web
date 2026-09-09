// components/ai-management/core/ChatHistorySidebar.tsx
import { Plus, MessageSquare, Trash2 } from "lucide-react";
import type { ChatSession } from "./types";

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
    return (
        <aside className="flex h-full w-72 flex-col border-l border-green-100 bg-white">
            <div className="border-b border-green-100 p-3">
                <button
                    type="button"
                    onClick={onNewChat}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800"
                >
                    <Plus className="h-4 w-4" />
                    Navi Chat
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wide text-gray-400">
                    Chat History
                </p>

                {sessions.length === 0 ? (
                    <p className="px-2 py-4 text-center text-xs text-gray-400">
                        Hajay koi chat nathi
                    </p>
                ) : (
                    <div className="flex flex-col gap-1">
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className={`group flex items-center gap-2 rounded-lg px-2 py-2 text-sm ${
                                    activeSessionId === session.id
                                        ? "bg-green-50 text-green-800"
                                        : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => onSelectSession(session.id)}
                                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                                >
                                    <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate">{session.title}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDeleteSession(session.id)}
                                    className="shrink-0 text-gray-400 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
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