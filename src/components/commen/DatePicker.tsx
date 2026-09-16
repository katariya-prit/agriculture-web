import { useEffect, useRef, useState } from "react";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface DatePickerProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    minDate?: string;
    maxDate?: string;
}

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDateStr(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

function formatDisplay(dateStr: string) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    return `${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

export default function DatePicker({ label, placeholder = "Date select karo", value, onChange, minDate, maxDate }: DatePickerProps) {
    const [open, setOpen] = useState(false);
    const [viewDate, setViewDate] = useState(() => (value ? new Date(value) : new Date()));
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = [
        ...Array(firstDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    function isDisabled(day: number) {
        const d = toDateStr(new Date(year, month, day));
        if (minDate && d < minDate) return true;
        if (maxDate && d > maxDate) return true;
        return false;
    }

    function handleSelect(day: number) {
        const selected = new Date(year, month, day);
        onChange(toDateStr(selected));
        setOpen(false);
    }

    function changeMonth(offset: number) {
        setViewDate(new Date(year, month + offset, 1));
    }

    return (
        <div ref={wrapperRef} className="relative">
            {label && <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>}

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-[15px] border border-gray-200 rounded-[15px] bg-white text-left hover:shadow-lg duration-300 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
            >
                <span className={value ? "text-gray-800" : "text-gray-400"}>
                    {value ? formatDisplay(value) : placeholder}
                </span>
                <FiCalendar className="text-gray-400" size={18} />
            </button>

            {open && (
                <div className="absolute z-20 mt-2 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                        <button type="button" onClick={() => changeMonth(-1)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500">
                            <FiChevronLeft size={18} />
                        </button>
                        <span className="text-sm font-semibold text-gray-800">
                            {MONTH_NAMES[month]} {year}
                        </span>
                        <button type="button" onClick={() => changeMonth(1)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500">
                            <FiChevronRight size={18} />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-1">
                        {DAY_NAMES.map((d) => (
                            <span key={d} className="text-[11px] font-medium text-gray-400 text-center py-1">
                                {d}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {cells.map((day, i) => {
                            if (day === null) return <span key={`empty-${i}`} />;
                            const dateStr = toDateStr(new Date(year, month, day));
                            const isSelected = dateStr === value;
                            const disabled = isDisabled(day);
                            return (
                                <button
                                    key={day}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => handleSelect(day)}
                                    className={`text-sm h-8 w-8 rounded-full flex items-center justify-center mx-auto
                                        ${isSelected ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-50"}
                                        ${disabled ? "opacity-30 cursor-not-allowed hover:bg-transparent" : ""}`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}