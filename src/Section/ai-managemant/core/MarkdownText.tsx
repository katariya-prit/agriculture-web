// components/ai-management/core/MarkdownText.tsx

interface Props {
    text: string;
}

/**
 * Halki markdown renderer - **bold**, bullet points (- ke *), ane line breaks handle kare chhe.
 * Full markdown library ni jarur nathi, chat responses mate aatlu j basic support besh chhe.
 */
export default function MarkdownText({ text }: Props) {
    const lines = text.split("\n");

    const renderInline = (line: string) => {
        // **bold** ne <strong> ma convert karo
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return (
                    <strong key={i} className="font-bold text-green-950">
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

                if (trimmed === "") {
                    return <div key={index} className="h-1.5" />;
                }

                // bullet points: "- " ya "* " ya "• "
                const bulletMatch = trimmed.match(/^[-*•]\s+(.*)/);
                if (bulletMatch) {
                    return (
                        <div key={index} className="flex gap-2 pl-1">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                            <p className="leading-relaxed">{renderInline(bulletMatch[1])}</p>
                        </div>
                    );
                }

                // numbered list: "1. " etc
                const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
                if (numberedMatch) {
                    return (
                        <div key={index} className="flex gap-2 pl-1">
                            <span className="shrink-0 font-semibold text-green-700">
                                {numberedMatch[1]}.
                            </span>
                            <p className="leading-relaxed">{renderInline(numberedMatch[2])}</p>
                        </div>
                    );
                }

                // headings: "### " etc -> just bold larger
                const headingMatch = trimmed.match(/^#{1,3}\s+(.*)/);
                if (headingMatch) {
                    return (
                        <p key={index} className="pt-1 text-[15px] font-bold text-green-950">
                            {renderInline(headingMatch[1])}
                        </p>
                    );
                }

                return (
                    <p key={index} className="leading-relaxed">
                        {renderInline(trimmed)}
                    </p>
                );
            })}
        </div>
    );
}