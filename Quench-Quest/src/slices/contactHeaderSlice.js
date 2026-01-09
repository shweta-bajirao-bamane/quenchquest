import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getContactHeader, updateContactHeader } from "../api/contactApi";

/* ================= THUNKS ================= */

// GET
export const fetchContactHeader = createAsyncThunk(
  "contactHeader/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getContactHeader();
      return res.data; // ✅ object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT
export const updateContactHeaderData = createAsyncThunk(
  "contactHeader/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateContactHeader(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */

const contactHeaderSlice = createSlice({
  name: "contactHeader",
  initialState: {
    header: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactHeader.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactHeader.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.header = action.payload;
      })
      .addCase(fetchContactHeader.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateContactHeaderData.fulfilled, (state, action) => {
        state.header = action.payload; // ✅ auto refresh UI
      });
  },
});

export default contactHeaderSlice.reducer;
