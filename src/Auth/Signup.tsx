import { useState } from "react";
import {
    FiSun,
    FiShoppingCart,
    FiActivity
} from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/commen/Input";
import { MdOutlineMailLock } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { PiPasswordFill } from "react-icons/pi";
import Button from "../components/commen/Button";
import { FaUserPlus, FaUserTag } from "react-icons/fa";
import OtherAuth from "../components/commen/OtherAuth";
import LoginFutter from "../components/commen/LoginFutter";
import Header from "../components/commen/Header";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export default function SignupPage() {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!username || !fullName || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await signup(username, fullName, email, password);
            navigate("/verify-email", { state: { email } });
        } catch (err: any) {
            const message =
                err?.message ||
                err?.errors?.[0]?.message ||
                "Something went wrong. Try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen scroll select-none bg-slate-50 flex flex-col justify-between font-sans text-gray-800">
            <Header />
            <main className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-7xl w-full mx-auto p-4 md:p-8 gap-8">
                <div className="lg:w-1/2 w-full relative hidden  rounded-5xl overflow-hidden min-h-137.5 lg:flex flex-col justify-between p-8 md:p-12">
                    <div
                        className="absolute inset-0 bg-cover bg-center select-none -z-10"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop')`
                        }}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/85 to-transparent" />
                    </div>
                    <div className="max-w-md select-none">
                        <h2 className="text-3xl  md:text-4xl font-extrabold text-green-900 leading-tight mb-3">
                            Empowering Farmers, <br />
                            <span className="text-green-700">Enriching Future</span>
                        </h2>
                        <p className="text-gray-600 text-xs md:text-sm mb-8 leading-relaxed">
                            Agri Connect is your trusted partner for smarter farming, better yield, and sustainable future.
                        </p>
                        <div className="space-y-4 select-none">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-700 text-white p-2.5 rounded-full shadow-md shrink-0">
                                    <FaLeaf size={16} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-xs md:text-sm">Expert Advice</h4>
                                    <p className="text-[11px] text-gray-600">Get expert crop recommendations and farming tips.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-green-700 text-white p-2.5 rounded-full shadow-md shrink-0">
                                    <FiSun size={16} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-xs md:text-sm">Weather Updates</h4>
                                    <p className="text-[11px] text-gray-600">Real-time weather forecasts and alerts.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-green-700 text-white p-2.5 rounded-full shadow-md shrink-0">
                                    <FiShoppingCart size={16} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-xs md:text-sm">Agri Marketplace</h4>
                                    <p className="text-[11px] text-gray-600">Buy quality products and sell your produce.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-green-700 text-white p-2.5 rounded-full shadow-md shrink-0">
                                    <FiActivity size={16} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-xs md:text-sm">Soil & Crop Health</h4>
                                    <p className="text-[11px] text-gray-600">Check soil health and get best suggestions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-120 w-full flex justify-center">
                    <div className="bg-white border border-gray-100 rounded-[50px] p-6 md:p-8 shadow-xl w-full">

                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center gap-2 text-xl font-bold text-gray-800">
                                <span className="bg-green-100 p-3 shadow-lg rounded-[20px] text-green-700 text-5xl"><IoIosLock /></span>
                            </div>
                        </div>

                        <form className="space-y-5 px-5" onSubmit={handleSubmit}>
                            {/* Part 1: Username + Full Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input
                                    Icons={<FaUserTag />}
                                    label={"Username"}
                                    ShowPassword={false}
                                    type={"text"}
                                    placeholder={"Username"}
                                    name="username"
                                    value={username}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                />

                                <Input
                                    Icons={<FaRegUser />}
                                    label={"Full Name"}
                                    ShowPassword={false}
                                    type={"text"}
                                    placeholder={"Full Name"}
                                    name="fullName"
                                    value={fullName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                                />
                            </div>

                            {/* Part 2: Email */}
                            <Input
                                Icons={<MdOutlineMailLock />}
                                label={"Email"}
                                ShowPassword={false}
                                type={"email"}
                                placeholder={"Email"}
                                name="email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />

                            {/* Part 3: Password + Confirm Password */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input
                                    Icons={<PiPasswordFill />}
                                    label={"Password"}
                                    ShowPassword={true}
                                    type={"password"}
                                    placeholder={"Password"}
                                    name="password"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />

                                <Input
                                    Icons={<PiPasswordFill />}
                                    label={"Confirm Password"}
                                    ShowPassword={true}
                                    type={"password"}
                                    placeholder={"Confirm Password"}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <Button
                                type="submit"
                                name={loading ? "Creating account..." : "Sign Up"}
                                Icon={<FaUserPlus size={20} />}
                                classname={`w-full h-13`}
                                disabled={loading}
                            />
                        </form>

                        <div className="relative my-5 text-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <span className="relative bg-white px-3 text-[11px] text-gray-400">or</span>
                        </div>

                        <OtherAuth />

                        <p className="text-center text-xs text-gray-600">
                            Already have an account?{" "}
                            <Link to={`/login`} className="font-bold text-green-700 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <LoginFutter />

            <footer className="bg-[#0f281e] hidden text-white py-3.5 px-6 md:px-12 text-[11px] lg:flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="text-gray-300">© 2025 Agri Connect. All rights reserved.</div>
                <div className="flex gap-4 text-gray-300">
                    <a href="#" className="hover:text-white transition">Privacy Policy</a>
                    <span>|</span>
                    <a href="#" className="hover:text-white transition">Terms & Conditions</a>
                    <span>|</span>
                    <a href="#" className="hover:text-white transition">Help Center</a>
                </div>
            </footer>
        </div>
    );
}