import { useAuthState } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router";
import Loading from "@/components/ui/loading";
import { paths } from "@/config/paths";

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthState();

  if (isLoading) return <Loading className="min-dvh-100" />;

  return isAuthenticated ? <Outlet /> : <Navigate to={paths.auth.login.root()} replace />;
}

export default ProtectedRoute;

