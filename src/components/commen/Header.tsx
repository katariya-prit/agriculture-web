import Logo from "./Logo";
import Button from "./Button";
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (

        <header className="bg-white py-4 px-6 md:px-12 flex justify-between items-center shadow-sm z-10">
            <Logo />
            <Button
            
                name={"Back To Overview"}
                Icon={<FaBackward />}
                classname={"w-40 h-12 text-[12px]"}
                onclick={() => navigate('/')} type={undefined} disabled={false}            />
        </header>
    )
}
