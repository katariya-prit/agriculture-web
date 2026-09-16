import React from "react";

interface ButtonProps {
    name?: string;
    Icon?: React.ReactNode;
    classname?: string;
    onclick?: () => void;
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
}

export default function Button({
    name,
    Icon,
    classname = "",
    onclick,
    type = "button",
    disabled = false,
}: ButtonProps) {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            type={type}
            className={`flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-2xl font-bold text-slate-700 bg-[#eef2f5] shadow-[5px_5px_10px_rgba(163,177,198,0.6),-5px_-5px_10px_rgba(255,255,255,0.8)] border border-white/60 hover:shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] hover:text-emerald-800 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-500 ease-out cursor-pointer ${classname}`}
        >
            {Icon && (
                <span className="text-emerald-700 transition-colors duration-500 ease-out">
                    {Icon}
                </span>
            )}
            {name && <span className="text-sm font-bold tracking-wide">{name}</span>}
        </button>
    );
}