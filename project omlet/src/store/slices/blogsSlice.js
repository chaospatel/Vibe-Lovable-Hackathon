import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient.js";
export const fetchHome = createAsyncThunk("blogs/fetchHome", async ({ page = 1,
q = "" } = {}) => {
export const fetchHome = createAsyncThunk("blogs/fetchHome", async ({ page = 1, q = "" } = {}) => {
  const { data } = await api.get(`/blogs?status=published&page=${page}&q=${encodeURIComponent(q)}`);
  return data; // { items, total, trending }
});
return data; // { items, total, trending }
});
export const fetchBlog = createAsyncThunk("blogs/fetchBlog", async (id) => {
const { data } = await api.get(`/blogs/${id}`);
return data; // single blog
});
export const submitBlog = createAsyncThunk("blogs/submit", async (payload) => {
const { data } = await api.post("/blogs", payload); // status=pending
return data;
});
export const likeBlog = createAsyncThunk("blogs/like", async (id) => {
const { data } = await api.post(`/blogs/${id}/like`);
return { id, data };
});
const blogsSlice = createSlice({
name: "blogs",
initialState: {
items: [],
trending: [],
total: 0,
current: null,
status: "idle",
error: null
},
reducers: {},
extraReducers: (builder) => {
builder
.addCase(fetchHome.pending, (s) => { s.status = "loading"; })
.addCase(fetchHome.fulfilled, (s, { payload }) => {
s.status = "succeeded";
s.items = payload.items;
s.trending = payload.trending || [];
s.total = payload.total;
})
.addCase(fetchHome.rejected, (s, a) => { s.status = "failed"; s.error =
a.error.message; })
.addCase(fetchBlog.fulfilled, (s, { payload }) => { s.current =
payload; })
.addCase(likeBlog.fulfilled, (s, { payload }) => {
const idx = s.items.findIndex((b) => b._id === payload.id);
if (idx >= 0) s.items[idx].likes = payload.data.likes;
if (s.current?._id === payload.id) s.current.likes = payload.data.likes;
});
}
});
export default blogsSlice.reducer;

