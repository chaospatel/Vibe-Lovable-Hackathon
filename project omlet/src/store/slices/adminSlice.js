import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient.js";
export const fetchPending = createAsyncThunk("admin/pending", async () => {
const { data } = await api.get("/admin/blogs?status=pending");
return data; // { items }
});
export const approveBlog = createAsyncThunk("admin/approve", async (id) => {
const { data } = await api.post(`/admin/blogs/${id}/approve`);
return { id, data };
});
export const rejectBlog = createAsyncThunk("admin/reject", async ({ id,
reason }) => {
const { data } = await api.post(`/admin/blogs/${id}/reject`, { reason });
return { id, data };
});
export const hideBlog = createAsyncThunk("admin/hide", async (id) => {
const { data } = await api.post(`/admin/blogs/${id}/hide`);
return { id, data };
});
export const deleteBlog = createAsyncThunk("admin/delete", async (id) => {
await api.delete(`/admin/blogs/${id}`);
return id;
});
const adminSlice = createSlice({
name: "admin",
initialState: { pending: [], status: "idle", error: null },
reducers: {},
extraReducers: (builder) => {
builder
.addCase(fetchPending.pending, (s) => { s.status = "loading"; })
.addCase(fetchPending.fulfilled, (s, { payload }) => { s.status =
"succeeded"; s.pending = payload.items; })
.addCase(approveBlog.fulfilled, (s, { payload }) => { s.pending =
s.pending.filter(p => p._id !== payload.id); })
.addCase(rejectBlog.fulfilled, (s, { payload }) => { s.pending =
s.pending.filter(p => p._id !== payload.id); })
.addCase(deleteBlog.fulfilled, (s, { payload: id }) => { s.pending =
s.pending.filter(p => p._id !== id); });
}
});
export default adminSlice.reducer;