import axios from "axios";
import endpoints from "./endpoints.js";
import store from "../store/index.js";
import { refreshToken } from "../store/slices/authSlice.js";
import { getStoredAuth } from "../utils/auth.js";
const api = axios.create({ baseURL: endpoints.BASE, withCredentials: true });
// Attach token
api.interceptors.request.use((config) => {
const { accessToken } = getStoredAuth();
if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
return config;
});
// Auto refresh on 401 (access token expired)
let refreshing = false;
let queue = [];
api.interceptors.response.use(
(res) => res,
async (error) => {
const original = error.config;
if (error.response?.status === 401 && !original._retry) {
if (refreshing) {
return new Promise((resolve, reject) => queue.push({ resolve,
reject }));
}
original._retry = true;
refreshing = true;
try {
await store.dispatch(refreshToken()).unwrap();
refreshing = false;
queue.forEach(({ resolve }) => resolve(api(original)));
queue = [];
return api(original);
} catch (e) {
refreshing = false;
queue.forEach(({ reject }) => reject(e));
queue = [];
}
}
return Promise.reject(error);
}
);
export default api;
