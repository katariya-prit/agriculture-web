// components/NatureBackground.tsx
import { motion } from "framer-motion";

export default function NatureBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f4faf6]">
            <div className="absolute inset-0 bg-linear-to-b from-[#eef8f1] via-[#f4faf6] to-[#e9f5ee]" />

            <motion.div
                className="absolute left-32 top-30 w-md h-112 rounded-full bg-green-300 blur-[120px]"
                animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute -right-24 top-10 w-88 h-88 rounded-full bg-green-400/40 blur-[100px]"
                animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[20rem] h-80 rounded-full bg-[#0d9488]/20 blur-[100px]"
                animate={{ x: [0, 25, -25, 0], y: [0, -20, 20, 0] }}
                transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute -right-32 -bottom-32 w-120 h-120 rounded-full bg-[#22c55e]/30 blur-[120px]"
                animate={{ x: [0, -35, 0], y: [0, -25, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute left-10 bottom-0 w-[16rem] h-64 rounded-full bg-[#86efac]/40 blur-[90px]"
                animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />

            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />
        </div>
    );
}