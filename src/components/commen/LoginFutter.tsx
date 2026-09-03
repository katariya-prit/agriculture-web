import { FaLeaf } from "react-icons/fa";
import { FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";

export default function LoginFutter() {
    return (
        <section className="bg-white border-t border-gray-100 py-5 px-6 hidden lg:block">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <div className="bg-green-700 text-white p-2.5 rounded-xl">
                        <FiShield size={18} />
                    </div>
                    <div>
                        <h5 className="font-bold text-xs text-gray-800">Trust & Reliability</h5>
                        <p className="text-[11px] text-gray-500">Your trust is our priority</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <div className="bg-green-700 text-white p-2.5 rounded-xl">
                        <FaLeaf size={18} />
                    </div>
                    <div>
                        <h5 className="font-bold text-xs text-gray-800">Natural & Organic</h5>
                        <p className="text-[11px] text-gray-500">Promoting natural farming</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <div className="bg-green-700 text-white p-2.5 rounded-xl">
                        <FiTrendingUp size={18} />
                    </div>
                    <div>
                        <h5 className="font-bold text-xs text-gray-800">Growth & Prosperity</h5>
                        <p className="text-[11px] text-gray-500">Together we grow</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <div className="bg-green-700 text-white p-2.5 rounded-xl">
                        <FiUsers size={18} />
                    </div>
                    <div>
                        <h5 className="font-bold text-xs text-gray-800">Community Support</h5>
                        <p className="text-[11px] text-gray-500">We are with you always</p>
                    </div>
                </div>

            </div>
        </section>
    )
}
