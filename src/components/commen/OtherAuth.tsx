import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiChevronRight, FiPhone } from "react-icons/fi";

export default function OtherAuth() {
    return (
        <>
            <div className="grid grid-cols-3 mx-3 gap-2.5 mb-3">
                <button className="flex items-center justify-center gap-1.5 py-3 px-2 border border-gray-200 rounded-2xl hover:bg-gray-50 text-[15px] font-medium text-gray-700 transition cursor-pointer">
                    <FcGoogle size={20} />
                    <span className="truncate">Google</span>
                </button>
                <button className="flex items-center justify-center gap-1.5 py-3 px-2 border border-gray-200 rounded-2xl hover:bg-gray-50 text-[15px] font-medium text-gray-700 transition cursor-pointer">
                    <FaFacebook className="text-blue-600" size={20} />
                    <span className="truncate">Facebook</span>
                </button>
                <button className="flex items-center justify-center gap-1.5 py-3 px-2 border border-gray-200 rounded-2xl hover:bg-gray-50 text-[15px] font-medium text-gray-700 transition cursor-pointer">
                    <FaApple className="text-black" size={20} />
                    <span className="truncate">Apple</span>
                </button>
            </div>

            <button className="w-full flex items-center justify-between py-3 mx-3 px-4 border border-gray-200 rounded-2xl hover:bg-gray-50 text-[15px] font-medium text-gray-700 transition mb-5 cursor-pointer">
                <span className="flex items-center gap-2">
                    <FiPhone className="text-gray-500" size={20} /> Continue with Mobile Number
                </span>
                <FiChevronRight className="text-gray-400" size={20} />
            </button>
        </>
    )
}
