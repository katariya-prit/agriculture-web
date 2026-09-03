// components/Dashboard/CommentSection.tsx
import { useState } from "react";
import { ThumbsUp, MessageCircle } from "lucide-react";

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
        <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">

            <div className="mb-4 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-700" />
                <p className="text-sm font-bold text-green-950">
                    {comments.length} Review{comments.length === 1 ? "" : "s"}
                    {cropLabel ? ` · ${cropLabel}` : ""}
                    {marketLabel ? ` · ${marketLabel}` : ""}
                </p>
            </div>

            <div className="mb-5 flex flex-col gap-2 border-b border-gray-100 pb-4 sm:flex-row">
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Tamaru naam"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-400 sm:w-40"
                />
                <input
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={(event) => event.key === "Enter" && submit()}
                    placeholder="Bhaav vise tamaro review lakho..."
                    className="w-full flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-400"
                />
                <button
                    type="button"
                    onClick={submit}
                    className="shrink-0 rounded-xl bg-green-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-800"
                >
                    Comment
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                            {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <p className="text-xs font-bold text-green-950">
                                    {comment.name}
                                </p>
                                <p className="text-[10.5px] text-gray-400">{comment.time}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-700">{comment.text}</p>
                            <div className="mt-1 flex items-center gap-1 text-gray-400">
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