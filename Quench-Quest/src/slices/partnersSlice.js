// slices/partnersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPartnersApi, updatePartnersApi } from "../api/aboutApi";

// Async thunk to fetch partners
export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPartnersApi();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Async thunk to update partners (PUT)
export const updatePartnersData = createAsyncThunk(
  "partners/updatePartners",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updatePartnersApi(id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const partnersSlice = createSlice({
  name: "partners",
  initialState: {
    items: [],
    loading: false,
    error: null,
    updated: false,
  },
  reducers: {
    resetPartnersUpdated: (state) => {
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UPDATE
      .addCase(updatePartnersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePartnersData.fulfilled, (state, action) => {
        state.loading = false;
        state.updated = true;
      })
      .addCase(updatePartnersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPartnersUpdated } = partnersSlice.actions;

export default partnersSlice.reducer;
