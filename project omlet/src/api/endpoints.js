const BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";
export default {
BASE,
LOGIN: "/auth/login",
REGISTER: "/auth/register",
REFRESH: "/auth/refresh",
};
