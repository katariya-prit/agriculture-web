import React from "react";
import Logo from "../../components/commen/Logo";
import AuthDropdown from "../../components/Dropdowns/Auth-Dropdown";
import InteractiveBackground from "../../components/commen/InteractiveBackground";
import Scroll3DCanvas from "../../components/commen/Scroll3DCanvas";

function GlassPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`backdrop-blur-xl bg-white/75 border border-emerald-500/25 shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-3xl p-6 md:p-10 transition-all duration-300 hover:border-emerald-500/45 ${className}`}
    >
      {children}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-500/30 uppercase shadow-sm">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      {children}
    </span>
  );
}

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
      className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5 transition-all duration-200"
    >
      {children}
    </a>
  );
}

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
      className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-emerald-900 bg-emerald-50/90 border border-emerald-500/30 hover:bg-emerald-100 hover:text-emerald-950 transition-all duration-200"
    >
      {children}
    </a>
  );
}

export default function Overview() {
  return (
    <div className="relative min-h-screen bg-white text-slate-800 overflow-x-hidden font-sans w-full">
      {/* Interactive Grid Background Canvas */}
      <InteractiveBackground />

      {/* 🌿 3D Moving Grass Layer (Bottom Fixed Background) */}
      <Scroll3DCanvas />

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-emerald-500/10 w-full">
        <div className="max-w-full mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {[
              "Home",
              "About Us",
              "Services",
              "Marketplace",
              "Contact Us",
            ].map((label, i) => (
              <a
                key={i}
                href={`#${label.toLowerCase().replace(/\s/g, "")}`}
                className="text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          <AuthDropdown />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-20 max-w-full mx-auto px-6 md:px-12 py-12 space-y-32 w-full">
        {/* HERO SECTION */}
        <section id="home" className="pt-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            <GlassPanel className="lg:col-span-7 space-y-8">
              <Pill>EST. FIELD TO BUYER</Pill>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-slate-900">
                Empowering <br />
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
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

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-500/20">
                {[
                  ["🌱", "Better Crops"],
                  ["🤝", "Direct Trade"],
                  ["💰", "Better Value"],
                ].map(([icon, label], i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-2xl p-2 rounded-xl bg-emerald-50 border border-emerald-500/20">
                      {icon}
                    </span>
                    <p className="text-sm font-bold text-slate-800">{label}</p>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <div className="hidden lg:block lg:col-span-5 h-[350px]" />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="aboutus" className="w-full">
          <GlassPanel className="max-w-3xl">
            <div className="space-y-6">
              <Pill>ABOUT AGRICONNECT</Pill>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                One platform for the complete farming journey
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                From improving crop growth to selling harvested grains,
                AgriConnect connects farmers and buyers in one simple digital
                platform.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-500/20">
                  <h3 className="font-bold text-emerald-800 mb-1">👨‍🌾 For Farmers</h3>
                  <p className="text-xs text-slate-600">Direct trade and guidance tools.</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-500/20">
                  <h3 className="font-bold text-emerald-800 mb-1">🛒 For Buyers</h3>
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
              <h2 className="text-3xl font-extrabold text-slate-900">Everything farmers need</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["🌱", "Crop Improvement"],
                ["💧", "Smart Farming"],
                ["🌾", "Grain Selling"],
                ["🤝", "Direct Connection"],
              ].map(([icon, title], i) => (
                <div key={i} className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-500/20 flex items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <span className="text-sm font-bold text-slate-800">{title}</span>
                </div>
              ))}
            </div>
          </GlassPanel>
        </section>

        {/* MARKETPLACE SECTION */}
        <section id="marketplace" className="w-full">
          <GlassPanel className="max-w-3xl space-y-6">
            <Pill>AGRI MARKETPLACE</Pill>
            <h2 className="text-3xl font-extrabold text-slate-900">From farmer directly to buyer</h2>
            <p className="text-slate-600 text-base">
              Direct connection without middlemen for seamless transactions and maximum profit.
            </p>
          </GlassPanel>
        </section>

        {/* CTA & FOOTER SECTION */}
        <section id="contactus" className="space-y-12 w-full">
          <GlassPanel className="text-center max-w-2xl mx-auto space-y-6 bg-white/80 border-emerald-500/30">
            <div className="text-5xl">🌾</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
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

          <GlassPanel className="p-6 bg-white/90 border-emerald-500/30">
            <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
              <div>
                <p className="font-bold text-emerald-700">🌱 AgriConnect</p>
                <p className="text-xs text-slate-500">Smart solutions for better farming</p>
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