import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAwards, updateAward } from "../api/aboutApi";

// GET awards
export const fetchAwards = createAsyncThunk(
  "awards/fetchAwards",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAwards();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT award
export const updateAwardData = createAsyncThunk(
  "awards/updateAwardData",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateAward(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const awardsSlice = createSlice({
  name: "awards",
  initialState: {
    items: [],
    loading: false,
    error: null,
    updated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchAwards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAwards.fulfilled, (state, action) => {
        state.loading = false;
        // API may return array or { data: [] }
        state.items = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [];
      })
      .addCase(fetchAwards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PUT
      .addCase(updateAwardData.fulfilled, (state) => {
        state.updated = true;
      });
  },
});

export default awardsSlice.reducer;
