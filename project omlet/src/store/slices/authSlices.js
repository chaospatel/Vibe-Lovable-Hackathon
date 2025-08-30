import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosClient.js";
import { getStoredAuth, setStoredAuth, clearStoredAuth } from "../../utils/auth.js";

// ✅ Fixed: Added proper error handling with try/catch
export const login = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data; // { accessToken, refreshToken, user }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// ✅ Fixed: Added missing opening brace and proper error handling
export const registerUser = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

// ✅ Fixed: Added error handling
export const refreshToken = createAsyncThunk("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/refresh");
    return data; // { accessToken }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Token refresh failed");
  }
});

// ✅ Fixed: Added fallback for potential null/undefined from getStoredAuth
const initial = getStoredAuth() || { user: null, accessToken: null };

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initial.user,
    accessToken: initial.accessToken,
    isAuthenticated: !!initial.accessToken,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null; // ✅ Fixed: Removed "8" typo
      state.isAuthenticated = false;
      state.status = "idle"; // ✅ Added: Reset status on logout
      state.error = null; // ✅ Added: Clear errors on logout
      clearStoredAuth();
    },
    setUser(state, action) {
      state.user = action.payload;
      // ✅ Fixed: Only update storage if we have an accessToken
      if (state.accessToken) {
        setStoredAuth({ user: action.payload, accessToken: state.accessToken });
      }
    },
    // ✅ Added: Useful reducer to clear errors
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => { 
        state.status = "loading"; 
        state.error = null; 
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.isAuthenticated = true;
        state.error = null; // ✅ Added: Clear any previous errors
        setStoredAuth({ user: state.user, accessToken: state.accessToken });
      })
      .addCase(login.rejected, (state, action) => { 
        state.status = "failed"; 
        state.error = action.payload || action.error.message; // ✅ Fixed: Use rejectWithValue payload
        state.isAuthenticated = false; // ✅ Added: Ensure user isn't authenticated on failed login
      })
      
      // Register cases - ✅ Added missing pending/rejected cases
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        // Optional: auto-login after registration
        if (payload.accessToken) {
          state.user = payload.user;
          state.accessToken = payload.accessToken;
          state.isAuthenticated = true;
          setStoredAuth({ user: payload.user, accessToken: payload.accessToken });
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      
      // Refresh token cases - ✅ Added missing pending/rejected cases
      .addCase(refreshToken.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.accessToken = payload.accessToken;
        state.isAuthenticated = true; // ✅ Added: Ensure authenticated state
        setStoredAuth({ user: state.user, accessToken: state.accessToken });
      })
      .addCase(refreshToken.rejected, (state, action) => {
        // ✅ Added: On refresh failure, likely means user needs to re-login
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        clearStoredAuth();
      });
  }
});

export const { logout, setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
