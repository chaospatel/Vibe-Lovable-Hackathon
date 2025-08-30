import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slices/authSlice.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Register() {
const dispatch = useDispatch();
const nav = useNavigate();
const [form, setForm] = useState({ name: "", email: "", password: "" });
const onSubmit = async (e) => {
e.preventDefault();
try { await dispatch(registerUser(form)).unwrap();
toast.success("Registered! Please log in."); nav("/login"); }
catch (err) { toast.error(err?.message || "Registration failed"); }
};
return (
<div className="container py-10 max-w-md">
<h2 className="text-2xl font-bold mb-6">Create account</h2>
<form className="space-y-4" onSubmit={onSubmit}>
<input className="input" placeholder="Name" value={form.name}
onChange={(e) => setForm(f => ({...f, name: e.target.value}))} />
<input className="input" placeholder="Email" type="email"
value={form.email} onChange={(e) => setForm(f => ({...f, email:
e.target.value}))} />
<input className="input" placeholder="Password" type="password"
value={form.password} onChange={(e) => setForm(f => ({...f, password:
e.target.value}))} />
<button className="btn btn-primary w-full">Sign up</button>
</form>
</div>
);
}

