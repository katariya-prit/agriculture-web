import { useEffect, useRef } from "react";
import { LuBold, LuItalic, LuUnderline, LuList, LuListOrdered, LuHeading2 } from "react-icons/lu";

interface RichTextareaProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (html: string) => void;
}

const TOOLBAR = [
    { command: "bold", icon: LuBold, title: "Bold" },
    { command: "italic", icon: LuItalic, title: "Italic" },
    { command: "underline", icon: LuUnderline, title: "Underline" },
    { command: "insertUnorderedList", icon: LuList, title: "Bullet list" },
    { command: "insertOrderedList", icon: LuListOrdered, title: "Numbered list" },
    { command: "formatBlock:H3", icon: LuHeading2, title: "Heading" },
];

export default function RichTextarea({ label, placeholder = "Description lakho...", value, onChange }: RichTextareaProps) {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || "";
        }
    }, [value]);

    function exec(command: string) {
        editorRef.current?.focus();
        if (command.startsWith("formatBlock:")) {
            const tag = command.split(":")[1];
            document.execCommand("formatBlock", false, tag);
        } else {
            document.execCommand(command, false);
        }
        onChange(editorRef.current?.innerHTML ?? "");
    }

    function handleInput() {
        onChange(editorRef.current?.innerHTML ?? "");
    }

    return (
        <div>
            {label && <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>}

            <div className="border border-gray-200 rounded-[20px] overflow-hidden focus-within:ring-2 focus-within:ring-green-600/20 focus-within:border-green-600 hover:shadow-lg duration-300">
                <div className="flex items-center gap-1 px-2 py-1.5 border-b border-gray-100 bg-gray-50">
                    {TOOLBAR.map(({ command, icon: Icon, title }) => (
                        <button
                            key={command}
                            type="button"
                            title={title}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => exec(command)}
                            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                        >
                            <Icon size={16} />
                        </button>
                    ))}
                </div>

                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    data-placeholder={placeholder}
                    className="min-h-30 max-h-64 overflow-y-auto px-4 py-3 text-[15px] text-gray-800 outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
                />
            </div>
        </div>
    );
}