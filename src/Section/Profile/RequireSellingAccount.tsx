import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

interface Props {
    children: React.ReactNode;
}

export default function RequireSellingAccount({ children }: Props) {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user?.sellingAccountId) {
            toast.error("Pahela selling account banavo, pachi j aa page khulse.");
        }
    }, [loading, user]);

    if (loading) return null;

    if (!user?.sellingAccountId) {
        return <Navigate to="/dashboard/profile" replace />;
    }

    return <>{children}</>;
}