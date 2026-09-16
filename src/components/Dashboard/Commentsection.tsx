import { useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";

interface Comment {
    id: string;
    name: string;
    text: string;
    time: string;
    likes: number;
}

interface Props {
    cropLabel?: string | null;
    marketLabel?: string | null;
}

const SEED_COMMENTS: Comment[] = [
    {
        id: "seed-1",
        name: "Ramesh Patel",
        text: "Aaje bhaav saras chhe, gai kaale karta thodo vadhu malyo.",
        time: "2 kalak pahela",
        likes: 12,
    },
    {
        id: "seed-2",
        name: "Kiran Chaudhary",
        text: "Kal ni sarkhaman ma quality pan saras hati mandi ma.",
        time: "5 kalak pahela",
        likes: 6,
    },
];

export default function CommentSection({ cropLabel, marketLabel }: Props) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS);
    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const submit = () => {
        if (!name.trim() || !text.trim()) return;

        const newComment: Comment = {
            id: `c${Date.now()}`,
            name: name.trim(),
            text: text.trim(),
            time: "have j",
            likes: 0,
        };

        setComments((prev) => [newComment, ...prev]);
        setText("");
    };

    return (
        <div
            className={`rounded-2xl border p-4 transition-colors duration-300 ${isDark
                    ? "border-zinc-800 bg-[#272727] text-gray-100 shadow-md"
                    : "border-white/60 bg-[#eef2f5] text-gray-900 shadow-[4px_4px_10px_#c5c9cc,-4px_-4px_10px_#ffffff]"
                }`}
        >
            <div className="mb-4 flex items-center gap-2">
                <MessageCircle
                    className={`h-4 w-4 ${isDark ? "text-green-400" : "text-green-700"}`}
                />
                <p
                    className={`text-sm font-bold ${isDark ? "text-green-300" : "text-green-950"
                        }`}
                >
                    {comments.length} Review{comments.length === 1 ? "" : "s"}
                    {cropLabel ? ` · ${cropLabel}` : ""}
                    {marketLabel ? ` · ${marketLabel}` : ""}
                </p>
            </div>

            <div
                className={`mb-5 flex flex-col gap-2 border-b pb-4 sm:flex-row ${isDark ? "border-zinc-800" : "border-gray-300/60"
                    }`}
            >
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Tamaru naam"
                    className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition-all sm:w-40 ${isDark
                            ? "border-zinc-700 bg-[#1f1f1f] text-white placeholder:text-gray-500 focus:border-green-500"
                            : "border-gray-300 bg-white/80 text-gray-800 placeholder:text-gray-400 focus:border-green-500"
                        }`}
                />
                <input
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && submit()}
                    placeholder="Bhaav vise tamaro review lakho..."
                    className={`w-full flex-1 rounded-xl border px-3 py-2 text-sm outline-none transition-all ${isDark
                            ? "border-zinc-700 bg-[#1f1f1f] text-white placeholder:text-gray-500 focus:border-green-500"
                            : "border-gray-300 bg-white/80 text-gray-800 placeholder:text-gray-400 focus:border-green-500"
                        }`}
                />
                <button
                    type="button"
                    onClick={submit}
                    className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all duration-200 ${isDark
                            ? "bg-green-600 hover:bg-green-500 active:scale-95"
                            : "bg-green-700 hover:bg-green-800 active:scale-95 shadow-md"
                        }`}
                >
                    Comment
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isDark
                                    ? "bg-zinc-800 text-green-400 border border-zinc-700"
                                    : "bg-green-100 text-green-800"
                                }`}
                        >
                            {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <p
                                    className={`text-xs font-bold ${isDark ? "text-gray-200" : "text-green-950"
                                        }`}
                                >
                                    {comment.name}
                                </p>
                                <p
                                    className={`text-[10.5px] ${isDark ? "text-gray-500" : "text-gray-400"
                                        }`}
                                >
                                    {comment.time}
                                </p>
                            </div>
                            <p
                                className={`mt-0.5 text-sm ${isDark ? "text-gray-300" : "text-gray-700"
                                    }`}
                            >
                                {comment.text}
                            </p>
                            <div
                                className={`mt-1 flex items-center gap-1 ${isDark ? "text-gray-500" : "text-gray-400"
                                    }`}
                            >
                                <ThumbsUp className="h-3 w-3" />
                                <span className="text-[10.5px]">{comment.likes}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}