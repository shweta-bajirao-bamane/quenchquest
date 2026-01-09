import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAboutWho, updateAboutWho } from "../api/aboutApi";

// GET About Who We Are
export const fetchAboutWho = createAsyncThunk(
  "aboutWho/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAboutWho();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT About Who We Are
export const updateAboutWhoData = createAsyncThunk(
  "aboutWho/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateAboutWho(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const aboutWhoSlice = createSlice({
  name: "aboutWho",
  initialState: {
    aboutWho: null,
    loading: false,
    success: false,
    error: null,
    updated: false,
  },
  reducers: {
    resetAboutWhoState: (state) => {
      state.success = false;
      state.error = null;
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutWho.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAboutWho.fulfilled, (state, action) => {
        state.loading = false;
        // If API returns array, pick first item
        state.aboutWho = Array.isArray(action.payload) ? action.payload[0] : (action.payload?.[0] || action.payload) || null;
      })
      .addCase(fetchAboutWho.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateAboutWhoData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAboutWhoData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const payload = action.payload;
        if (payload && (payload.id || payload.pk || payload.slug)) {
          state.aboutWho = payload;
        }
        state.updated = true;
      })
      .addCase(updateAboutWhoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAboutWhoState } = aboutWhoSlice.actions;
export default aboutWhoSlice.reducer;
