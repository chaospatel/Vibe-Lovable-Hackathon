import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice.js";
import { useState } from "react";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [q, setQ] = useState("");
  
  const onSearch = (e) => {
    e.preventDefault();
    nav(`/search?q=${encodeURIComponent(q)}`);
  };
  
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="container flex items-center justify-between py-3 gap-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img src="/src/assets/logo.svg" alt="logo" className="h-7" />
          Devnovate Blog
        </Link>
        
        <form onSubmit={onSearch} className="hidden md:flex items-center gap-2 w-full max-w-md">
          <input 
            value={q} 
            onChange={(e) => setQ(e.target.value)}
            className="input" 
            placeholder="Search blogs..." 
          />
          <button className="btn btn-primary" type="submit">Search</button>
        </form>
        
        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <Link className="btn btn-outline" to="/admin">Admin</Link>
              )}
              <Link className="btn btn-outline" to="/submit">Write</Link>
              <Link className="btn btn-outline" to="/profile">
                {user?.name || "Profile"}
              </Link>
              <button 
                className="btn btn-primary" 
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/register">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
