import logo from "../../assets/Logo.png"
import { useTheme } from "../theme/ThemeContext";

export default function Logo() {
    const { theme } = useTheme();
    const isdark = theme === "dark";

    return (
        <div className="flex items-center gap-3">
            <div className="rounded-full">
                <img src={logo} className={`h-13 w-13`} />
            </div>
            <div>
                <h1 className={`text-xl font-extrabold tracking-wider ${isdark ? 'text-green-50' : 'text-green-800'}`}>
                    FarmLoop
                </h1>
            </div>
        </div>
    )
}