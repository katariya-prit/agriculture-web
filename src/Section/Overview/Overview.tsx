import React from "react";
import Logo from "../../components/commen/Logo";
import AuthDropdown from "../../components/Dropdowns/Auth-Dropdown";
import InteractiveBackground from "../../components/commen/InteractiveBackground";
import Scroll3DCanvas from "../../components/commen/Scroll3DCanvas";
import Button from "../../components/commen/Button";

/* React Icons Implemented */
import {
    FiBook,
    FiSmartphone,
    FiUsers,
    FiDollarSign,
    FiUserCheck,
    FiShoppingBag,
    FiDroplet,
    FiGlobe
} from "react-icons/fi";

/* Soft UI / Neomorphism Panel Component */
function GlassPanel({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`bg-[#eef2f5] rounded-4xl p-6 md:p-10 shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.8)] border border-white/60 transition-all duration-500 ease-out hover:shadow-[14px_14px_24px_rgba(163,177,198,0.7),-14px_-14px_24px_rgba(255,255,255,0.95)] hover:-translate-y-1 ${className}`}
        >
            {children}
        </div>
    );
}

/* Soft UI Pill Component */
function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider text-emerald-800 bg-[#eef2f5] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] uppercase transition-all duration-500 ease-out">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)] animate-pulse" />
            {children}
        </span>
    );
}

/* Soft UI Primary Button */
function PrimaryButton({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-2xl font-bold text-emerald-900 bg-[#eef2f5] shadow-[6px_6px_12px_rgba(163,177,198,0.6),-6px_-6px_12px_rgba(255,255,255,0.8)] hover:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] active:scale-[0.97] transition-all duration-500 ease-out"
        >
            {children}
        </a>
    );
}

/* Soft UI Ghost Button */
function GhostButton({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-2xl font-semibold text-slate-700 bg-[#eef2f5] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] hover:shadow-[6px_6px_12px_rgba(163,177,198,0.5),-6px_-6px_12px_rgba(255,255,255,0.8)] active:scale-[0.97] transition-all duration-500 ease-out"
        >
            {children}
        </a>
    );
}

export default function Overview() {
    return (
        <div className="relative min-h-screen bg-[#eef2f5] text-slate-700 overflow-x-hidden font-sans w-full">
            {/* Interactive Grid Background Canvas */}
            <InteractiveBackground />

            <Scroll3DCanvas />

            {/* Soft Floating Header */}
            <header className="fixed top-0 z-50 bg-[#eef2f5]/90 backdrop-blur-md shadow-[0_8px_16px_rgba(163,177,198,0.3)] w-full transition-all duration-500 ease-out">
                <div className="max-w-full mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                    <Logo />

                    <nav className="hidden md:flex items-center gap-8">
                        {["About Us", "Services"].map((label) => (
                            <Button
                                key={label}
                                Icon={<FiBook />}
                                classname={`h-10 w-20 text-sm rounded-xl sm:w-30 sm:text-base bg-[#eef2f5] shadow-[4px_4px_8px_rgba(163,177,198,0.5),-4px_-4px_8px_rgba(255,255,255,0.8)] hover:shadow-[inset_2px_2px_5px_rgba(163,177,198,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out`}
                                type={undefined}
                                disabled={false}
                                name={`${label}`}
                            />
                        ))}
                    </nav>

                    <AuthDropdown />
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="relative z-20 max-w-full mx-auto px-6 md:px-12 py-12 mt-20 space-y-32 w-full">
                {/* HERO SECTION */}
                <section id="home" className="pt-6 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
                        <GlassPanel className="lg:col-span-7 space-y-8">
                            <Pill>EST. FIELD TO BUYER</Pill>

                            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-slate-800">
                                Empowering <br />
                                <span className="bg-linear-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
                                    farmers,
                                </span>{" "}
                                <br />
                                enriching the future
                            </h1>

                            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
                                AgriConnect helps farmers grow better crops, make informed
                                decisions, and sell grains directly to buyers, with no
                                unnecessary middlemen.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-2">
                                <PrimaryButton href="#services">
                                    Explore Services
                                </PrimaryButton>
                                <GhostButton href="#marketplace">
                                    Visit Marketplace
                                </GhostButton>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-300/50">
                                {[
                                    [<FiSmartphone className="text-emerald-600" />, "Better Crops"],
                                    [<FiUsers className="text-emerald-600" />, "Direct Trade"],
                                    [<FiDollarSign className="text-emerald-600" />, "Better Value"],
                                ].map(([icon, label], i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-xl p-3 rounded-2xl bg-[#eef2f5] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out">
                                            {icon}
                                        </span>
                                        <p className="text-sm font-bold text-slate-700">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassPanel>

                        <div className="hidden lg:block lg:col-span-5 h-87.5" />
                    </div>
                </section>

                {/* ABOUT SECTION */}
                <section id="aboutus" className="w-full">
                    <GlassPanel className="max-w-3xl">
                        <div className="space-y-6">
                            <Pill>ABOUT AGRICONNECT</Pill>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
                                One platform for the complete farming journey
                            </h2>
                            <p className="text-slate-600 text-base leading-relaxed">
                                From improving crop growth to selling harvested grains,
                                AgriConnect connects farmers and buyers in one simple digital
                                platform.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                <div className="p-5 rounded-2xl bg-[#eef2f5] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out">
                                    <h3 className="font-bold text-emerald-800 mb-1 flex items-center gap-2">
                                        <FiUserCheck className="text-emerald-600" /> For Farmers
                                    </h3>
                                    <p className="text-xs text-slate-600">Direct trade and guidance tools.</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-[#eef2f5] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out">
                                    <h3 className="font-bold text-emerald-800 mb-1 flex items-center gap-2">
                                        <FiShoppingBag className="text-emerald-600" /> For Buyers
                                    </h3>
                                    <p className="text-xs text-slate-600">Buy fresh grains directly from source.</p>
                                </div>
                            </div>
                        </div>
                    </GlassPanel>
                </section>

                {/* SERVICES SECTION */}
                <section id="services" className="flex justify-end w-full">
                    <GlassPanel className="max-w-3xl space-y-8">
                        <div className="space-y-3">
                            <Pill>OUR SERVICES</Pill>
                            <h2 className="text-3xl font-extrabold text-slate-800">Everything farmers need</h2>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                [<FiSmartphone className="text-emerald-600 text-xl" />, "Crop Improvement"],
                                [<FiDroplet className="text-emerald-600 text-xl" />, "Smart Farming"],
                                [<FiGlobe className="text-emerald-600 text-xl" />, "Grain Selling"],
                                [<FiUsers className="text-emerald-600 text-xl" />, "Direct Connection"],
                            ].map(([icon, title], i) => (
                                <div key={i} className="p-4 rounded-2xl bg-[#eef2f5] shadow-[4px_4px_8px_rgba(163,177,198,0.5),-4px_-4px_8px_rgba(255,255,255,0.8)] flex items-center gap-3 transition-all duration-500 ease-out hover:shadow-[inset_2px_2px_5px_rgba(163,177,198,0.4),inset_-2px_-2px_5px_rgba(255,255,255,0.8)]">
                                    <span>{icon}</span>
                                    <span className="text-sm font-bold text-slate-700">{title}</span>
                                </div>
                            ))}
                        </div>
                    </GlassPanel>
                </section>

                {/* MARKETPLACE SECTION */}
                <section id="marketplace" className="w-full">
                    <GlassPanel className="max-w-3xl space-y-6">
                        <Pill>AGRI MARKETPLACE</Pill>
                        <h2 className="text-3xl font-extrabold text-slate-800">From farmer directly to buyer</h2>
                        <p className="text-slate-600 text-base">
                            Direct connection without middlemen for seamless transactions and maximum profit.
                        </p>
                    </GlassPanel>
                </section>

                {/* CTA & FOOTER SECTION */}
                <section id="contactus" className="space-y-12 w-full">
                    <GlassPanel className="text-center max-w-2xl mx-auto space-y-6">
                        <div className="inline-flex p-4 rounded-3xl bg-[#eef2f5] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] text-emerald-600 text-4xl">
                            <FiSmartphone />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
                            Let's build a better future for farming
                        </h2>
                        <p className="text-slate-600 font-medium">
                            AgriConnect brings farmers and buyers together with smart tools.
                        </p>
                        <div>
                            <PrimaryButton href="#marketplace">
                                Explore AgriConnect
                            </PrimaryButton>
                        </div>
                    </GlassPanel>

                    <GlassPanel className="p-6">
                        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <FiSmartphone className="text-emerald-700 text-lg" />
                                <div>
                                    <p className="font-bold text-emerald-700">AgriConnect</p>
                                    <p className="text-xs text-slate-500">Smart solutions for better farming</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 font-medium">
                                © 2026 AGRICONNECT, ALL RIGHTS RESERVED
                            </p>
                        </footer>
                    </GlassPanel>
                </section>
            </main>
        </div>
    );
}