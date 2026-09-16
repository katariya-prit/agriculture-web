import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SkeletonLoader from "../components/commen/SkeletonLoader";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <SkeletonLoader variant="page" />;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}