import Logo from "../../components/commen/Logo";
import heroFarm from "../../assets/natalie-kovach-ph7QQq63lCs-unsplash.jpg"
import AuthDropdown from "../../components/Dropdowns/Auth-Dropdown";
import "../../App.css";

function GlassPanel({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`glass-surface-highlight rounded-4xl border border-white/30 bg-white/20 shadow-[0_8px_32px_rgba(15,46,29,0.15),inset_0_1px_0_rgba(255,255,255,0.3),inset_0_0_0_1px_rgba(255,255,255,0.04)] ${className}`}
        >
            {children}
        </div>
    );
}

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-block rounded-full border border-emerald-700/20 bg-white/30 px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-emerald-800 backdrop-blur-md">
            {children}
        </span>
    );
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className="inline-block rounded-full bg-linear-to-r from-emerald-500 to-green-600 px-7 py-3.5 font-semibold text-white shadow-[0_8px_24px_rgba(22,101,52,0.3)] transition hover:scale-[1.03] hover:shadow-[0_10px_28px_rgba(22,101,52,0.4)]"
        >
            {children}
        </a>
    );
}

function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className="inline-block rounded-full border border-[#0f2e1d]/20 bg-white/20 px-7 py-3.5 font-semibold text-[#0f2e1d] backdrop-blur-md transition hover:bg-white/35"
        >
            {children}
        </a>
    );
}

/* =========================================================
   PAGE
========================================================= */

export default function Overview() {
    return (
        <div className="relative min-h-screen w-full text-[#0f2e1d]" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div
                className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroFarm})` }}
                aria-hidden="true"
            />
            {/* Green-and-white wash over the photo — this is the theme layer.
               Light and airy up top, easing into a deeper emerald toward the bottom. */}
            <div
                className="fixed inset-0 -z-10 bg-linear-to-b from-white/15 via-emerald-50/10 to-emerald-900/25"
                aria-hidden="true"
            />

            {/* Shared SVG filter powering the refraction on every glass-surface element below.
               Rendered once, referenced by class name — doesn't need to be repeated per panel. */}
            <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
                <filter id="glass-distortion" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.015" numOctaves={2} seed={7} result="noise" />
                    <feGaussianBlur in="noise" stdDeviation="2.5" result="soft" />
                    <feDisplacementMap in="SourceGraphic" in2="soft" scale={14} xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>

            {/* Header */}
            <header className="fixed top-4 z-50 w-full px-4">
                <div className="glass-surface mx-auto flex h-20 max-w-full items-center justify-between rounded-2xl border border-white/30 bg-white/25 px-6 shadow-[0_8px_32px_rgba(15,46,29,0.15)]">
                    <Logo />
                    <nav className="hidden items-center gap-2 md:flex">
                        {["Home", "About Us", "Services", "Marketplace", "Contact Us"].map((label, i) => (
                            <a
                                key={i}
                                href={`#${label.toLowerCase().replace(/\s/g, "")}`}
                                className="rounded-full px-4 py-2 text-sm font-medium text-[#0f2e1d]/75 transition hover:bg-white/25 hover:text-[#0f2e1d]"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>
                    <AuthDropdown />
                </div>
            </header>

            <main className="mx-auto max-w-full space-y-10 px-4 pb-10 pt-32 md:px-6">
                <section id="home" className="flex min-h-[70vh] items-center">
                    <div className="grid w-300 items-center gap-16 md:grid-cols-2">
                        <GlassPanel className="p-8 md:p-10">
                            <Pill>EST. FIELD TO BUYER</Pill>
                            <h1 className="mt-6 text-5xl font-bold leading-[1.05] md:text-6xl">
                                Empowering
                                <br />
                                <span className="bg-linear-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                                    farmers,
                                </span>
                                <br />
                                enriching the future
                            </h1>
                            <p className="mt-6 max-w-lg text-base leading-7 text-[#0f2e1d]/70">
                                AgriConnect helps farmers grow better crops, make informed
                                decisions, and sell grains directly to buyers, no unnecessary
                                middlemen.
                            </p>
                            <div className="mt-9 flex flex-wrap gap-4">
                                <PrimaryButton href="#services">Explore Services</PrimaryButton>
                                <GhostButton href="#marketplace">Visit Marketplace</GhostButton>
                            </div>

                            <div className="mt-12 flex max-w-md gap-8 border-t border-[#0f2e1d]/10 pt-6">
                                {[
                                    ["🌱", "Better Crops"],
                                    ["🤝", "Direct Trade"],
                                    ["💰", "Better Value"],
                                ].map(([icon, label], i) => (
                                    <div key={i}>
                                        <div className="text-2xl">{icon}</div>
                                        <p className="mt-1 text-xs font-medium text-[#0f2e1d]/60">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </GlassPanel>

                        {/* Right column kept open so the fixed plant scene is visible behind it */}
                        <div className="hidden md:block" aria-hidden="true" />
                    </div>
                </section>

                {/* About Section */}
                <GlassPanel className="p-10 md:p-16">
                    <section id="aboutus" className="flex min-h-[70vh] items-center">
                        <div className="mx-auto text-center">
                            <Pill>ABOUT AGRICONNECT</Pill>
                            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                                One platform for the complete farming journey
                            </h2>
                            <p className="mx-auto mt-5 max-w-2xl text-[#0f2e1d]/65">
                                From improving crop growth to selling harvested grains, AgriConnect
                                connects farmers and buyers in one simple digital platform.
                            </p>
                        </div>

                        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2">
                            {[
                                {
                                    icon: "👨‍🌾",
                                    title: "For Farmers",
                                    desc: "Get tools to improve crop growth, manage farming activities, and sell harvested grains directly through the platform.",
                                    points: [
                                        "Crop improvement guidance",
                                        "Farming recommendations",
                                        "Better crop management",
                                        "Sell grains online",
                                        "Connect directly with buyers",
                                    ],
                                },
                                {
                                    icon: "🛒",
                                    title: "For Buyers",
                                    desc: "Discover agricultural products and purchase grains directly from farmers, a transparent, simple marketplace.",
                                    points: [
                                        "Browse available grains",
                                        "View farmer listings",
                                        "Direct farmer connection",
                                        "Purchase agricultural products",
                                        "Reduced dependency on middlemen",
                                    ],
                                },
                            ].map((card, i) => (
                                <div
                                    key={i}
                                    className="glass-surface-highlight rounded-3xl border border-white/25 bg-white/15 p-8 transition hover:bg-white/22"
                                >
                                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/20 text-3xl">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold">{card.title}</h3>
                                    <p className="mt-3 leading-7 text-[#0f2e1d]/70">{card.desc}</p>
                                    <ul className="mt-6 space-y-2.5 text-sm text-[#0f2e1d]/75">
                                        {card.points.map((p, j) => (
                                            <li key={j} className="flex items-center gap-2">
                                                <span className="text-emerald-700">✓</span> {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </GlassPanel>

                {/* Services */}
                <GlassPanel className="p-10 md:p-16">
                    <section id="services">
                        <div className="text-center">
                            <Pill>OUR SERVICES</Pill>
                            <h2 className="mt-5 text-3xl font-bold md:text-4xl">Everything farmers need</h2>
                        </div>

                        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                ["🌱", "Crop Improvement", "Get recommendations to help improve crop growth and farming decisions."],
                                ["💧", "Smart Farming", "Make better farming decisions with information that helps manage crops."],
                                ["🌾", "Grain Selling", "List harvested grains and make them available directly to buyers."],
                                ["🤝", "Direct Connection", "Connect farmers and buyers directly, cutting out unnecessary middlemen."],
                            ].map(([icon, title, desc], i) => (
                                <div
                                    key={i}
                                    className="glass-surface-highlight rounded-3xl border border-white/25 bg-white/15 p-6 transition hover:-translate-y-1 hover:bg-white/22"
                                >
                                    <div className="text-3xl">{icon}</div>
                                    <h3 className="mt-4 text-lg font-bold">{title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-[#0f2e1d]/65">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </GlassPanel>

                {/* Marketplace */}
                <GlassPanel className="p-10 md:p-16">
                    <section id="marketplace">
                        <div className="grid items-center gap-14 md:grid-cols-2">
                            <div>
                                <Pill>AGRI MARKETPLACE</Pill>
                                <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                                    From farmer directly to buyer
                                </h2>
                                <p className="mt-5 leading-7 text-[#0f2e1d]/65">
                                    AgriConnect creates a direct line between farmers and buyers.
                                    Farmers list their grains, buyers discover and purchase products
                                    straight from the source.
                                </p>

                                <div className="glass-surface-highlight mt-8 flex items-center justify-center gap-4 rounded-3xl border border-white/25 bg-white/15 p-6">
                                    <div className="text-center">
                                        <div className="text-3xl">👨‍🌾</div>
                                        <p className="mt-2 text-xs font-semibold">FARMER</p>
                                    </div>
                                    <div className="text-xl text-emerald-700">-&gt;</div>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600/20 text-lg">
                                        🤝
                                    </div>
                                    <div className="text-xl text-emerald-700">-&gt;</div>
                                    <div className="text-center">
                                        <div className="text-3xl">🛒</div>
                                        <p className="mt-2 text-xs font-semibold">BUYER</p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-surface-highlight rounded-3xl border border-white/25 bg-white/15 p-9">
                                <div className="text-4xl">🌾</div>
                                <h3 className="mt-4 text-2xl font-bold">Direct Grain Marketplace</h3>
                                <p className="mt-4 leading-7 text-[#0f2e1d]/70">
                                    Farmers list their products and buyers directly discover
                                    agricultural grains available on the platform.
                                </p>

                                <div className="mt-8 space-y-3 font-mono text-sm">
                                    {["Farmer lists grain", "Buyer discovers product", "Direct connection", "Direct transaction"].map(
                                        (step, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 rounded-2xl border border-white/25 bg-white/15 px-4 py-3"
                                            >
                                                <span className="text-emerald-700">0{i + 1}</span> {step}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </GlassPanel>

                {/* Why AgriConnect */}
                <GlassPanel className="p-10 text-center md:p-16">
                    <h2 className="text-3xl font-bold md:text-4xl">Why AgriConnect?</h2>
                    <p className="mx-auto mt-4 max-w-xl text-[#0f2e1d]/70">
                        Our goal: smarter farming, easier selling, more direct trade.
                    </p>

                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {[
                            ["🌱", "Better Farming", "Help farmers make better decisions for their crops."],
                            ["🤝", "Direct Connection", "Connect farmers directly with potential buyers."],
                            ["📈", "Better Opportunities", "Create better opportunities for farmers and buyers."],
                        ].map(([icon, title, desc], i) => (
                            <div key={i} className="glass-surface-highlight rounded-3xl border border-white/25 bg-white/15 p-7">
                                <div className="text-3xl">{icon}</div>
                                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                                <p className="mt-3 text-sm text-[#0f2e1d]/65">{desc}</p>
                            </div>
                        ))}
                    </div>
                </GlassPanel>

                {/* CTA */}
                <GlassPanel className="p-10 text-center md:p-16">
                    <section id="contactus">
                        <div className="text-4xl">🌾</div>
                        <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                            Let's build a better future for farming
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-[#0f2e1d]/65">
                            AgriConnect brings farmers and buyers together with the tools
                            needed for smarter, better farming.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <PrimaryButton href="#marketplace">Explore AgriConnect</PrimaryButton>
                        </div>
                    </section>
                </GlassPanel>

                {/* Footer */}
                <GlassPanel className="p-6">
                    <footer className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div>
                            <p className="font-bold">🌱 AgriConnect</p>
                            <p className="mt-1 text-xs text-[#0f2e1d]/50">Smart solutions for better farming</p>
                        </div>
                        <p className="font-mono text-xs text-[#0f2e1d]/50">© 2026 AGRICONNECT, LOT AGC-2026</p>
                    </footer>
                </GlassPanel>
            </main>
        </div>
    );
}