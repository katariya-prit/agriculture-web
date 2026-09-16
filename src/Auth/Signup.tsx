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
import { FaRegUser, FaUserPlus, FaUserTag } from "react-icons/fa";
import { PiPasswordFill } from "react-icons/pi";
import Button from "../components/commen/Button";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export default function SignupPage() {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [signupType, setSignupType] = useState("email");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const signupTypeOptions: SelectOption[] = [
        { value: "email", label: "Email Address" },
        { value: "phone", label: "Phone Number (Coming Soon)" },
    ];

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
        <div className="min-h-screen select-none bg-[#eef2f5] flex items-center justify-center font-sans text-gray-800 p-4 md:p-8">
            <main className="flex flex-col lg:flex-row items-center justify-center max-w-6xl w-full mx-auto gap-8 lg:gap-16">

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

                <div className="lg:w-120 w-full flex justify-center">
                    <div className="bg-[#eef2f5] border border-white/60 rounded-[50px] p-8 shadow-[12px_12px_24px_#c5c9cc,-12px_-12px_24px_#ffffff] w-full">

                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center text-green-700 bg-[#eef2f5] p-4 rounded-[24px] shadow-[inset_4px_4px_8px_#c5c9cc,inset_-4px_-4px_8px_#ffffff]">
                                <IoIosLock size={40} />
                            </div>
                        </div>

                        <form className="space-y-5 px-2 md:px-4" onSubmit={handleSubmit}>
                            <Select
                                label="Register With"
                                options={signupTypeOptions}
                                value={signupType}
                                onChange={(val) => {
                                    if (val === "phone") {
                                        toast.info("Phone registration is coming soon! Please use Email.");
                                        return;
                                    }
                                    setSignupType(val);
                                }}
                            />

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

                            <Input
                                Icons={signupType === "email" ? <MdOutlineMailLock /> : <FiPhone />}
                                label={signupType === "email" ? "Email Address" : "Phone Number"}
                                ShowPassword={false}
                                type={signupType === "email" ? "email" : "tel"}
                                placeholder={signupType === "email" ? "Enter Email" : "Enter Phone Number"}
                                name="email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />

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
                                classname={`w-full h-13 mt-2`}
                                disabled={loading}
                            />
                        </form>

                        <p className="text-center text-xs text-gray-600 mt-6">
                            Already have an account?{" "}
                            <Link to={`/login`} className="font-bold text-green-700 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}