import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice.js";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Login() {
const dispatch = useDispatch();
const { status } = useSelector((s) => s.auth);
const nav = useNavigate();
const location = useLocation();
const [form, setForm] = useState({ email: "", password: "" });
const onSubmit = async (e) => {
e.preventDefault();
try {
await dispatch(login(form)).unwrap();
toast.success("Welcome back!");
const to = location.state?.from?.pathname || "/";
nav(to);
} catch (err) {
toast.error(err?.message || "Login failed");
}
}
return (
<div className="container py-10 max-w-md">
<h2 className="text-2xl font-bold mb-6">Login</h2>
<form className="space-y-4" onSubmit={onSubmit}>
<input className="input" placeholder="Email" type="email"
value={form.email} onChange={(e) => setForm(f => ({...f, email:
e.target.value}))} />
<input className="input" placeholder="Password" type="password"
value={form.password} onChange={(e) => setForm(f => ({...f, password:
e.target.value}))} />
<button className="btn btn-primary w-full" disabled={status ===
"loading"}>Sign in</button>
<p className="text-sm text-gray-600">No account? <Link to="/register"
className="underline">Create one</Link></p>
</form>
</div>
);
}
