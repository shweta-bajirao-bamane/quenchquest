import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWhoWeAre, updateWhoWeAre } from "../api/homeApi";

/* GET who-we-are */
export const fetchWhoWeAre = createAsyncThunk(
  "who/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getWhoWeAre();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* PUT who-we-are */
export const updateWhoWeAreData = createAsyncThunk(
  "who/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateWhoWeAre(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const whoSlice = createSlice({
  name: "whoWeAre",
  initialState: {
    who: null,
    loading: false,
    success: false,
    error: null,
    updated: false, // prevents repeated auto-PUT
  },
  reducers: {
    resetWhoState: (state) => {
      state.success = false;
      state.error = null;
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWhoWeAre.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWhoWeAre.fulfilled, (state, action) => {
        state.loading = false;
        // backend may return array or object; pick first item if array
        const payload = Array.isArray(action.payload) ? action.payload[0] : (action.payload?.[0] || action.payload);
        if (payload) {
          // normalize "null"/"undefined"
          if (payload.description === "null" || payload.description === "undefined") payload.description = null;
        }
        state.who = payload || null;
      })
      .addCase(fetchWhoWeAre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateWhoWeAreData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWhoWeAreData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const payload = action.payload;
        if (payload?.id) {
          state.who = payload;
        }
        state.updated = true;
      })
      .addCase(updateWhoWeAreData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("updateWhoWeAreData rejected:", action.payload);
      });
  },
});

export const { resetWhoState } = whoSlice.actions;
export default whoSlice.reducer;
