import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps {
    Icons: React.ReactNode;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    ShowPassword: boolean;
    type: string;
    placeholder: string;
    name: string;
    value: string;
    list?: string;
    min?: number;
}

export default function Input({
    Icons,
    label,
    ShowPassword,
    type,
    placeholder,
    name,
    value,
    onChange,
    list,
    min,
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = ShowPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="w-full select-none">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <div className="relative">
                <span className="absolute inset-y-0 text-[20px] left-0 flex items-center pl-4 text-gray-500 pointer-events-none">
                    {Icons}
                </span>

                <input
                    min={min}
                    list={list}
                    onChange={onChange}
                    value={value}
                    name={name}
                    type={inputType}
                    placeholder={placeholder}
                    className={`w-full pl-11 ${
                        ShowPassword ? "pr-12" : "pr-4"
                    } py-3.5 text-sm border border-white/60 rounded-[20px] bg-[#eef2f5] text-gray-800 placeholder:text-gray-400 shadow-[inset_3px_3px_6px_#c5c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-green-600/30 transition-all duration-300`}
                />

                {ShowPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-green-700 transition duration-200 cursor-pointer focus:outline-none focus:ring-0 active:outline-none"
                    >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                )}
            </div>
        </div>
    );
}