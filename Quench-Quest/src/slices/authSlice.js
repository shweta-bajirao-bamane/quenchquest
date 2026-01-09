import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserLoginStatus } from "../api/authApi";

export const fetchUserLoginStatus = createAsyncThunk(
  "auth/fetchUserLoginStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserLoginStatus();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Auth check failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLoginStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLoginStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserLoginStatus.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
