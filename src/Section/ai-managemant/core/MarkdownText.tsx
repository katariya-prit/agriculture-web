import { useTheme } from "../../../components/theme/ThemeContext";

interface Props {
    text: string;
}

export default function MarkdownText({ text }: Props) {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    const lines = text.split("\n");

    const renderInline = (line: string) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return (
                    <strong key={i} className={`font-bold ${isdark ? "text-green-200" : "text-green-950"}`}>
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className="space-y-1.5">
            {lines.map((line, index) => {
                const trimmed = line.trim();

                if (trimmed === "") return <div key={index} className="h-1.5" />;

                const bulletMatch = trimmed.match(/^[-*•]\s+(.*)/);
                if (bulletMatch) {
                    return (
                        <div key={index} className="flex gap-2 pl-1">
                            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isdark ? "bg-green-500" : "bg-green-600"}`} />
                            <p className="leading-relaxed">{renderInline(bulletMatch[1])}</p>
                        </div>
                    );
                }

                const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
                if (numberedMatch) {
                    return (
                        <div key={index} className="flex gap-2 pl-1">
                            <span className={`shrink-0 font-semibold ${isdark ? "text-green-400" : "text-green-700"}`}>{numberedMatch[1]}.</span>
                            <p className="leading-relaxed">{renderInline(numberedMatch[2])}</p>
                        </div>
                    );
                }

                const headingMatch = trimmed.match(/^#{1,3}\s+(.*)/);
                if (headingMatch) {
                    return (
                        <p key={index} className={`pt-1 text-[15px] font-bold ${isdark ? "text-green-200" : "text-green-950"}`}>
                            {renderInline(headingMatch[1])}
                        </p>
                    );
                }

                return <p key={index} className="leading-relaxed">{renderInline(trimmed)}</p>;
            })}
        </div>
    );
}