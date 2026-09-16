import { useState } from "react";
import {
    FiSun,
    FiShoppingCart,
    FiActivity,
    FiPhone
} from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/commen/Input";
import Select, { type SelectOption } from "../components/commen/Select";
import { MdOutlineMailLock } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import Button from "../components/commen/Button";
import { TbLogin2 } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loginType, setLoginType] = useState("email");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const loginTypeOptions: SelectOption[] = [
        { value: "email", label: "Email Address" },
        { value: "phone", label: "Phone Number" },
    ];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!identifier || !password) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            await login(identifier, password);
            navigate("/dashboard");
        } catch (err: any) {
            const message =
                err?.message ||
                err?.errors?.[0]?.message ||
                (err?.status === 400
                    ? `Invalid ${loginType} or password.`
                    : "Something went wrong. Try again.");
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen select-none bg-[#eef2f5] flex items-center justify-center font-sans text-gray-800 p-4 md:p-8">
            <main className="flex flex-col lg:flex-row items-center justify-center max-w-6xl w-full mx-auto gap-8 lg:gap-16">

                {/* Left Side Section - Text Only */}
                <div className="lg:w-1/2 w-full hidden lg:flex flex-col justify-center p-6">
                    <div className="max-w-md select-none">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 leading-tight mb-3">
                            Empowering Farmers, <br />
                            <span className="text-green-700">Enriching Future</span>
                        </h2>
                        <p className="text-gray-600 text-xs md:text-sm mb-8 leading-relaxed">
                            Agri Connect is your trusted partner for smarter farming, better yield, and sustainable future.
                        </p>

                        <div className="space-y-6 select-none">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-700 text-white p-3 rounded-full shadow-md shrink-0">
                                    <FaLeaf size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Expert Advice</h4>
                                    <p className="text-xs text-gray-600">Get expert crop recommendations and farming tips.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-green-700 text-white p-3 rounded-full shadow-md shrink-0">
                                    <FiSun size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Weather Updates</h4>
                                    <p className="text-xs text-gray-600">Real-time weather forecasts and alerts.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-green-700 text-white p-3 rounded-full shadow-md shrink-0">
                                    <FiShoppingCart size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Agri Marketplace</h4>
                                    <p className="text-xs text-gray-600">Buy quality products and sell your produce.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-green-700 text-white p-3 rounded-full shadow-md shrink-0">
                                    <FiActivity size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">Soil & Crop Health</h4>
                                    <p className="text-xs text-gray-600">Check soil health and get best suggestions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Login Box with Theme UI */}
                <div className="lg:w-120 w-full flex justify-center">
                    <div className="bg-[#eef2f5] border border-white/60 rounded-[50px] p-8 shadow-[12px_12px_24px_#c5c9cc,-12px_-12px_24px_#ffffff] w-full">

                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center text-green-700 bg-[#eef2f5] p-4 rounded-[24px] shadow-[inset_4px_4px_8px_#c5c9cc,inset_-4px_-4px_8px_#ffffff]">
                                <IoIosLock size={40} />
                            </div>
                        </div>

                        <form className="space-y-6 px-2 md:px-4" onSubmit={handleSubmit}>
                            {/* Select Dropdown */}
                            <Select
                                label="Login Type"
                                options={loginTypeOptions}
                                value={loginType}
                                onChange={(val) => {
                                    setLoginType(val);
                                    setIdentifier("");
                                }}
                            />

                            {/* Email / Phone Input */}
                            <Input
                                Icons={loginType === "email" ? <MdOutlineMailLock /> : <FiPhone />}
                                label={loginType === "email" ? "Email Address" : "Phone Number"}
                                ShowPassword={false}
                                type={loginType === "email" ? "email" : "tel"}
                                placeholder={loginType === "email" ? "Enter Email" : "Enter Phone Number"}
                                name="identifier"
                                value={identifier}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdentifier(e.target.value)}
                            />

                            {/* Password Input */}
                            <div>
                                <Input
                                    Icons={<PiPasswordFill />}
                                    label={"Password"}
                                    ShowPassword={true}
                                    type={"password"}
                                    placeholder={"Enter Password"}
                                    name="password"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />
                                <div className="text-right mt-2">
                                    <a href="#" className="text-[12px] font-semibold text-green-700 hover:underline">
                                        Forgot Password ?
                                    </a>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                name={loading ? "Logging in..." : "Login"}
                                Icon={<TbLogin2 size={24} />}
                                classname={`w-full h-13`}
                                disabled={loading}
                            />
                        </form>

                        <p className="text-center text-xs text-gray-600 mt-6">
                            Don't have an account?{" "}
                            <Link to={`/signup`} className="font-bold text-green-700 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}