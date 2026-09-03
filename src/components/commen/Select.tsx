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
    placeholder = "Select karo",
    options,
    value,
    onChange,
    searchPlaceholder = "Search karo...",
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
        <div ref={wrapperRef} className="relative">
            {label && <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>}

            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                className={`w-full flex items-center justify-between px-4 py-3.5 text-[15px] border border-gray-200 rounded-[15px] bg-white text-left hover:shadow-lg duration-300 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 ${
                    disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <span className={selected ? "text-gray-800" : "text-gray-400"}>
                    {selected ? selected.label : placeholder}
                </span>
                <FiChevronDown
                    className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    size={18}
                />
            </button>

            {open && (
                <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-[15px] shadow-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                        <FiSearch className="text-gray-400" size={16} />
                        <input
                            ref={searchRef}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full text-sm outline-none text-gray-700 placeholder:text-gray-400"
                        />
                    </div>

                    <div className="max-h-56 overflow-y-auto">
                        {filtered.length === 0 && (
                            <p className="px-4 py-3 text-sm text-gray-400">Koi option nathi madyu</p>
                        )}
                        {filtered.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-green-50"
                            >
                                {option.label}
                                {option.value === value && <FiCheck className="text-green-600" size={16} />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}