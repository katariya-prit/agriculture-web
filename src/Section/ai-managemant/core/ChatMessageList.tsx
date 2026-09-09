// components/ai-management/core/ChatMessageList.tsx
import { Leaf, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { ChatMessage } from "./types";
import type { GeminiCropAnalysis } from "../../../services/ai-service";
import MarkdownText from "./MarkdownText";

interface Props {
    messages: ChatMessage[];
    loading: boolean;
}

function isGeminiAnalysis(a: any): a is GeminiCropAnalysis {
    return a && typeof a.cropName === "string";
}

export default function ChatMessageList({ messages, loading }: Props) {
    return (
        <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 && !loading && (
                <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
                    <Leaf className="mb-2 h-8 w-8 text-green-300" />
                    <p className="text-sm">Pak ni image upload karo ane pucho</p>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                                msg.role === "user"
                                    ? "bg-green-700 text-white"
                                    : msg.isError
                                    ? "bg-red-50 text-red-600"
                                    : "bg-gray-50 text-gray-800"
                            }`}
                        >
                            {msg.imagePreviewUrl && (
                                <img
                                    src={msg.imagePreviewUrl}
                                    alt="uploaded crop"
                                    className="mb-2 max-h-48 rounded-lg object-cover"
                                />
                            )}

                            {msg.text && (
                                msg.role === "user" ? (
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                ) : (
                                    <MarkdownText text={msg.text} />
                                )
                            )}

                            {msg.analysis && isGeminiAnalysis(msg.analysis) && (
                                <div className="mt-2 rounded-xl border border-green-100 bg-white p-3">
                                    <div className="mb-1 flex items-center gap-1.5">
                                        {msg.analysis.isHealthy ? (
                                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                        ) : (
                                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                                        )}
                                        <p className="font-bold text-green-950">
                                            {msg.analysis.cropName}
                                        </p>
                                    </div>

                                    {!msg.analysis.isHealthy && msg.analysis.diseaseName && (
                                        <p className="text-xs font-semibold text-red-600">
                                            {msg.analysis.diseaseName} ({msg.analysis.confidence}% confidence)
                                        </p>
                                    )}

                                    <p className="mt-1 text-xs text-gray-500">
                                        {msg.analysis.description}
                                    </p>

                                    {msg.analysis.symptoms?.length > 0 && (
                                        <div className="mt-2">
                                            <p className="text-[11px] font-bold uppercase text-gray-400">
                                                Lakshano
                                            </p>
                                            <ul className="mt-1 list-inside list-disc text-xs text-gray-600">
                                                {msg.analysis.symptoms.map((s, i) => (
                                                    <li key={i}>{s}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {msg.analysis.treatment?.organic?.length > 0 && (
                                        <div className="mt-2">
                                            <p className="text-[11px] font-bold uppercase text-gray-400">
                                                Organic Upay
                                            </p>
                                            <ul className="mt-1 list-inside list-disc text-xs text-gray-600">
                                                {msg.analysis.treatment.organic.map((t, i) => (
                                                    <li key={i}>{t}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {msg.analysis.treatment?.chemical?.length > 0 && (
                                        <div className="mt-2">
                                            <p className="text-[11px] font-bold uppercase text-gray-400">
                                                Chemical Upay
                                            </p>
                                            <ul className="mt-1 list-inside list-disc text-xs text-gray-600">
                                                {msg.analysis.treatment.chemical.map((t, i) => (
                                                    <li key={i}>{t}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {msg.analysis.treatment?.prevention?.length > 0 && (
                                        <div className="mt-2">
                                            <p className="text-[11px] font-bold uppercase text-gray-400">
                                                Bachav
                                            </p>
                                            <ul className="mt-1 list-inside list-disc text-xs text-gray-600">
                                                {msg.analysis.treatment.prevention.map((t, i) => (
                                                    <li key={i}>{t}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="flex items-center gap-1.5 rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-400">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}