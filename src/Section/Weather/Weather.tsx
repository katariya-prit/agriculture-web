import { useState } from "react";
import { Cloud, CloudRain, CloudSun, Sun, Droplets, MapPin } from "lucide-react";
import { useTheme } from "../../components/theme/ThemeContext";

type Condition = "sunny" | "cloudy" | "partly-cloudy" | "rain";

type DayForecast = {
    day: string;
    tempC: number;
    condition: Condition;
};

type SowingStage = {
    activity: string;
    suggestedDate: string;
    condition: string;
    past?: boolean;
};

type RainfallMonth = {
    month: string;
    mm: number;
};

const conditionIcon: Record<Condition, typeof Cloud> = {
    sunny: Sun,
    cloudy: Cloud,
    "partly-cloudy": CloudSun,
    rain: CloudRain,
};

const forecast: DayForecast[] = [
    { day: "Today", tempC: 28, condition: "partly-cloudy" },
    { day: "Thu", tempC: 26, condition: "rain" },
    { day: "Fri", tempC: 25, condition: "rain" },
    { day: "Sat", tempC: 27, condition: "partly-cloudy" },
    { day: "Sun", tempC: 29, condition: "sunny" },
];

const sowingCalendar: SowingStage[] = [
    { activity: "Sowing", suggestedDate: "Oct 20-25", condition: "Ideal", past: true },
    { activity: "Fertilizer", suggestedDate: "Nov 5-8", condition: "Good" },
    { activity: "Irrigation", suggestedDate: "Nov 18", condition: "Good" },
    { activity: "Harvest", suggestedDate: "Mar 10-15", condition: "Monitor rain" },
];

const rainfallHistory: RainfallMonth[] = [
    { month: "Apr", mm: 12 },
    { month: "May", mm: 18 },
    { month: "Jun", mm: 96 },
    { month: "Jul", mm: 142 },
    { month: "Aug", mm: 88 },
    { month: "Sep", mm: 34 },
];

export default function Weather() {
    const { theme } = useTheme();
    const isdark = theme === "dark";
    const [location] = useState("Pune, MH");
    const today = forecast[0];
    const TodayIcon = conditionIcon[today.condition];
    const maxRainfall = Math.max(...rainfallHistory.map((m) => m.mm));

    const bg = isdark ? "bg-[#272727]" : "bg-[#eef2f5]";
    const raised = isdark
        ? "shadow-[6px_6px_14px_#1c1c1c,-6px_-6px_14px_#323232]"
        : "shadow-[6px_6px_14px_#c5c9cc,-6px_-6px_14px_#ffffff]";
    const raisedSm = isdark
        ? "shadow-[4px_4px_10px_#1c1c1c,-4px_-4px_10px_#323232]"
        : "shadow-[4px_4px_10px_#c5c9cc,-4px_-4px_10px_#ffffff]";
    const pressed = isdark
        ? "shadow-[inset_3px_3px_7px_#1c1c1c,inset_-3px_-3px_7px_#323232]"
        : "shadow-[inset_3px_3px_7px_#c5c9cc,inset_-3px_-3px_7px_#ffffff]";
    const textPrimary = isdark ? "text-gray-200" : "text-emerald-950";
    const textMuted = isdark ? "text-gray-400" : "text-emerald-900/60";
    const textFaint = isdark ? "text-gray-500" : "text-emerald-900/40";
    const divider = isdark ? "divide-white/5" : "divide-emerald-900/5";

    const conditionStyles: Record<string, string> = {
        Ideal: isdark ? "text-green-400" : "text-green-700",
        Good: isdark ? "text-green-400" : "text-green-700",
        "Monitor rain": isdark ? "text-amber-400" : "text-amber-600",
    };

    return (
        <div className={`min-h-full ${bg} p-4 sm:p-6 transition-colors duration-300`}>
            <div className={`mb-6 flex items-center gap-4 rounded-[28px] ${bg} ${raised} px-6 py-5 transition-all duration-300`}>
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] ${bg} ${raisedSm}`}>
                    <Cloud className={`h-6 w-6 ${isdark ? "text-sky-400" : "text-sky-600"}`} />
                </div>
                <div className="flex flex-1 items-center justify-between">
                    <div>
                        <h1 className={`text-lg font-semibold leading-tight ${textPrimary}`}>Weather Forecast</h1>
                        <p className={`text-sm ${textMuted}`}>
                            Khedut mate havaman ane pak salaha ahiya male chhe.
                        </p>
                    </div>
                    <span className={`flex items-center gap-1.5 rounded-full ${bg} ${raisedSm} px-3.5 py-1.5 text-xs font-medium ${textPrimary}`}>
                        <MapPin className={`h-3.5 w-3.5 ${isdark ? "text-green-400" : "text-green-700"}`} />
                        {location}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className={`rounded-[28px] ${bg} ${raised} p-5 sm:p-6 transition-all duration-300`}>
                    <h2 className={`mb-4 text-sm font-semibold ${textPrimary}`}>5-day forecast</h2>

                    <div className={`mb-5 flex items-center gap-4 rounded-2xl ${bg} ${pressed} px-4 py-4`}>
                        <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${bg} ${raisedSm}`}>
                            <TodayIcon className={`h-7 w-7 ${isdark ? "text-sky-400" : "text-sky-600"}`} />
                        </div>
                        <div>
                            <p className={`text-3xl font-bold ${textPrimary}`}>{today.tempC}°C</p>
                            <p className={`flex items-center gap-1 text-xs ${textMuted}`}>
                                <Droplets className="h-3.5 w-3.5" />
                                Partly cloudy · Humidity 72%
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                        {forecast.map((day) => {
                            const Icon = conditionIcon[day.condition];
                            const isToday = day.day === "Today";
                            return (
                                <div
                                    key={day.day}
                                    className={`flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3.5 transition-all duration-200 ${bg} ${isToday ? `${raisedSm} ${isdark ? "text-green-400" : "text-green-700"}` : `${pressed} ${textMuted}`
                                        }`}
                                >
                                    <span className="text-xs font-medium">{day.day}</span>
                                    <Icon className="h-5 w-5" />
                                    <span className={`text-sm font-semibold ${isToday ? "" : textPrimary}`}>{day.tempC}°</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className={`mt-4 rounded-2xl ${bg} ${pressed} px-4 py-3.5 text-sm ${isdark ? "text-amber-400" : "text-amber-700"}`}>
                        Rain expected Thu-Fri. Delay wheat harvest by 2 days to avoid loss.
                    </div>
                </div>

                <div className={`rounded-[28px] ${bg} ${raised} p-5 sm:p-6 transition-all duration-300`}>
                    <h2 className={`mb-4 text-sm font-semibold ${textPrimary}`}>AI sowing calendar — Wheat</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[420px] text-left text-sm">
                            <thead className={`text-xs uppercase tracking-wide ${textFaint}`}>
                                <tr>
                                    <th className="py-2">Activity</th>
                                    <th className="py-2">Suggested date</th>
                                    <th className="py-2">Condition</th>
                                </tr>
                            </thead>
                            <tbody className={`divide-y ${divider}`}>
                                {sowingCalendar.map((stage) => (
                                    <tr key={stage.activity} className={stage.past ? "opacity-40" : ""}>
                                        <td className={`py-2.5 font-medium ${textPrimary}`}>{stage.activity}</td>
                                        <td className={`py-2.5 ${textMuted}`}>{stage.suggestedDate}</td>
                                        <td className={`py-2.5 font-medium ${conditionStyles[stage.condition] ?? textMuted}`}>
                                            {stage.condition}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={`rounded-[28px] ${bg} ${raised} p-5 sm:p-6 transition-all duration-300`}>
                    <h2 className={`mb-4 text-sm font-semibold ${textPrimary}`}>Rainfall last 6 months</h2>

                    <div className={`flex h-40 items-end gap-3 rounded-2xl ${bg} ${pressed} p-4`}>
                        {rainfallHistory.map((month) => (
                            <div key={month.month} className="flex flex-1 flex-col items-center gap-1.5">
                                <div
                                    className={`w-full rounded-t-md ${isdark ? "bg-sky-500" : "bg-sky-400"} transition-all duration-500`}
                                    style={{ height: `${(month.mm / maxRainfall) * 100}%` }}
                                />
                                <span className={`text-xs ${textMuted}`}>{month.month}</span>
                            </div>
                        ))}
                    </div>
                    <p className={`mt-2 text-center text-xs ${textFaint}`}>mm rainfall · Pune district</p>
                </div>
            </div>
        </div>
    );
}