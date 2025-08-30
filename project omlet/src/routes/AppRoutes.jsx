import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import SubmitBlog from "../pages/SubmitBlog.jsx";
import BlogDetail from "../pages/BlogDetail.jsx";
import Profile from "../pages/Profile.jsx";
import Search from "../pages/Search.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import PendingQueue from "../pages/admin/PendingQueue.jsx";
import ManagePosts from "../pages/admin/ManagePosts.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<Search />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      
      {/* Authenticated Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/submit" element={<SubmitBlog />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      
      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/pending" element={<PendingQueue />} />
        <Route path="/admin/manage" element={<ManagePosts />} />
      </Route>
    </Routes>
  );
}
