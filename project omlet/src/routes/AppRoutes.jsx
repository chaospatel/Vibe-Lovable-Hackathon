import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export default function AdminRoute() {
const { isAuthenticated, user } = useSelector((s) => s.auth);
if (!isAuthenticated || user?.role !== "admin") return <Navigate to="/"
replace />;
return <Outlet />;
}
