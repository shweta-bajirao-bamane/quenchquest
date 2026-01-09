import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCorporatePartnership,
  updateCorporatePartnership,
} from "../api/getInvolvedApi";

/* ================= THUNKS ================= */

// GET
export const fetchCorporatePartnership = createAsyncThunk(
  "corporatePartnership/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCorporatePartnership();
      return res.data; // usually array or object
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT
export const updateCorporatePartnershipData = createAsyncThunk(
  "corporatePartnership/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateCorporatePartnership(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */

const corporatePartnershipSlice = createSlice({
  name: "corporatePartnership",
  initialState: {
    data: null,          // single section data
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchCorporatePartnership.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCorporatePartnership.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCorporatePartnership.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // PUT
      .addCase(updateCorporatePartnershipData.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default corporatePartnershipSlice.reducer;
