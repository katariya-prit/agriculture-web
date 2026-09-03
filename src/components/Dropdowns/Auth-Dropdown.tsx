import { Link } from "react-router-dom";
import Button from "../commen/Button";

export default function AuthDropdown() {
    return (
        <div className="flex items-center gap-3">
            <Link to="/login">
                <Button
                    onclick={undefined}
                    name={"Login"}
                    Icon={undefined}
                    classname={`h-12 w-32 text-sm sm:w-36 sm:text-base`}
                    type={undefined}
                    disabled={false}
                />
            </Link>

            <Link to="/signup">
                <Button
                    onclick={undefined}
                    name={"Register"}
                    Icon={undefined}
                    classname={`h-12 w-32 text-sm sm:w-36 sm:text-base bg-white text-green-700 border border-green-600 hover:bg-green-50`}
                    type={undefined}
                    disabled={false}
                />
            </Link>
        </div>
    );
}