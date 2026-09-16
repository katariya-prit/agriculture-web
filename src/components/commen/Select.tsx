import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiSearch, FiCheck } from "react-icons/fi";

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    searchPlaceholder?: string;
    disabled?: boolean;
}

export default function Select({
    label,
    placeholder = "Select option",
    options,
    value,
    onChange,
    searchPlaceholder = "Search...",
    disabled = false,
}: SelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const selected = options.find((o) => o.value === value);
    const filtered = options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (open) {
            setTimeout(() => searchRef.current?.focus(), 50);
        }
    }, [open]);

    function handleSelect(optionValue: string) {
        onChange(optionValue);
        setOpen(false);
        setSearch("");
    }

    return (
        <div ref={wrapperRef} className="relative w-full select-none">
            {label && (
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between px-5 py-3.5 text-sm border border-white/60 rounded-[20px] bg-[#eef2f5] text-left transition-all duration-300 shadow-[inset_3px_3px_6px_#c5c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-green-600/30 ${
                    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
            >
                <span className={selected ? "text-gray-800 font-medium" : "text-gray-400"}>
                    {selected ? selected.label : placeholder}
                </span>
                <FiChevronDown
                    className={`text-gray-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    size={18}
                />
            </button>

            {open && (
                <div className="absolute z-50 mt-3 w-full bg-[#eef2f5] border border-white/80 rounded-[24px] shadow-[8px_8px_16px_#c5c9cc,-8px_-8px_16px_#ffffff] overflow-hidden p-2">
                    
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#eef2f5] border border-white/60 rounded-[15px] shadow-[inset_2px_2px_4px_#c5c9cc,inset_-2px_-2px_4px_#ffffff] mb-2">
                        <FiSearch className="text-gray-400 shrink-0" size={16} />
                        <input
                            ref={searchRef}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full text-xs outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
                        />
                    </div>

                    <div className="max-h-48 overflow-y-auto space-y-1">
                        {filtered.length === 0 && (
                            <p className="px-4 py-3 text-xs text-gray-400 text-center">No options found</p>
                        )}
                        {filtered.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-xs rounded-[12px] text-left transition-all duration-200 ${
                                    option.value === value
                                        ? "bg-green-700 text-white shadow-md font-semibold"
                                        : "text-gray-700 hover:bg-[#e2e7ec]"
                                }`}
                            >
                                {option.label}
                                {option.value === value && <FiCheck className="text-white shrink-0" size={16} />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}