import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getContactDetail, updateContactDetail } from "../api/contactApi";

/* ================= THUNKS ================= */

// GET purpose cards
export const fetchContactDetail = createAsyncThunk(
  "contactDetail/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getContactDetail();
      return res.data; // Expecting array of purpose cards
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT purpose cards
export const updateContactDetailData = createAsyncThunk(
  "contactDetail/update",
  async (data, { rejectWithValue }) => {
    try {
      const res = await updateContactDetail(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */

const contactDetailSlice = createSlice({
  name: "contactDetail",
  initialState: {
    cards: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload;
      })
      .addCase(fetchContactDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateContactDetailData.fulfilled, (state, action) => {
        state.cards = action.payload; // backend returns updated array
      });
  },
});

export default contactDetailSlice.reducer;
