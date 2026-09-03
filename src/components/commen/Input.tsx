import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps {
    Icons: React.ReactNode,
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    ShowPassword: boolean
    type: string
    placeholder: string
    name: string
    value: string
    list?: string
    min?: number
}

export default function Input({ Icons, label, ShowPassword, type, placeholder, name, value, onChange, list, min }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = ShowPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
            <div className="relative hover:shadow-lg duration-300 bg-white rounded-[15px]">
                <span className="absolute inset-y-0 text-[20px] left-0 flex items-center pl-4 text-gray-400">
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
                    className="w-full pl-11 pr-4 py-3.5 text-[15px] border border-gray-200 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 text-gray-800"
                />
                {ShowPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-2 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                )}
            </div>
        </div>
    )
}