import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import blogsReducer from "./slices/blogsSlice.js";
import adminReducer from "./slices/adminSlice.js";
const store = configureStore({
    reducer: {
auth: authReducer,
blogs: blogsReducer,
admin: adminReducer,
},
});
export default store;
