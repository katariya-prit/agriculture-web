import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import Button from "../commen/Button";
import { useAuth } from "../../context/AuthContext";

export default function AuthDropdown() {
    const { user, loading } = useAuth();

    // AuthContext hajun /auth/me check kari rahyu chhe — flash avoid karva
    if (loading) return null;

    if (user) {
        return (
            <div className="flex items-center gap-3">
                <Link to="/dashboard">
                    <Button
                        onclick={undefined}
                        name={"Dashboard"}
                        Icon={<LayoutDashboard className="h-4 w-4" />}
                        classname={`h-12 w-32 text-sm sm:w-40 sm:text-base`}
                        type={undefined}
                        disabled={false}
                    />
                </Link>
            </div>
        );
    }

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
                    classname={`h-12 w-32 text-sm sm:w-36 sm:text-base text-green-700 border border-green-600 hover:bg-green-50`}
                    type={undefined}
                    disabled={false}
                />
            </Link>
        </div>
    );
}