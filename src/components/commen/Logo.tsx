import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { useTheme } from "../theme/ThemeContext";

export default function Logo() {
    const { theme } = useTheme();
    const isdark = theme === "dark";
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3.5 group cursor-pointer"
        >
            <div
                className={`p-2 rounded-2xl border flex items-center justify-center transition-all duration-500 ease-out ${isdark
                        ? "bg-[#1c1c1c] border-white/10 shadow-[5px_5px_10px_rgba(0,0,0,0.5),-5px_-5px_10px_rgba(255,255,255,0.03)] group-hover:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.03)]"
                        : "bg-[#eef2f5] border-white/60 shadow-[5px_5px_10px_rgba(163,177,198,0.6),-5px_-5px_10px_rgba(255,255,255,0.8)] group-hover:shadow-[inset_3px_3px_6px_rgba(163,177,198,0.5),inset_-3px_-3px_6px_rgba(255,255,255,0.8)]"
                    }`}
            >
                <img
                    src={logo}
                    alt="FarmLoop Logo"
                    className="h-10 w-10 object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                />
            </div>

            <div>
                <h1
                    className={`text-xl font-black tracking-wider transition-colors duration-500 ease-out ${isdark ? "text-green-50" : "text-emerald-900"
                        }`}
                >
                    FarmLoop
                </h1>
            </div>
        </div>
    );
}