const KEY = "devnovate_auth";
export const getStoredAuth = () => {
const raw = localStorage.getItem(KEY);
try { return raw ? JSON.parse(raw) : { user: null, accessToken: null }; }
catch { return { user: null, accessToken: null }; }
};
export const setStoredAuth = ({ user, accessToken }) => {
localStorage.setItem(KEY, JSON.stringify({ user, accessToken }));
};
export const clearStoredAuth = () => localStorage.removeItem(KEY);