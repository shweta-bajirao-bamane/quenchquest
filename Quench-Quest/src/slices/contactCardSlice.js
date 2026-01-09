import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getContactCards, updateContactCard } from "../api/contactApi";

/* ================= THUNKS ================= */

// GET
export const fetchContactCards = createAsyncThunk(
  "contactCards/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getContactCards();
      return res.data; // ✅ array
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT
export const updateContactCardData = createAsyncThunk(
  "contactCards/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateContactCard(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */

const contactCardSlice = createSlice({
  name: "contactCards",
  initialState: {
    cards: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload;
      })
      .addCase(fetchContactCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateContactCardData.fulfilled, (state, action) => {
  const index = action.meta.arg.index; // pass index when dispatching
  if (index !== undefined && state.cards[index]) {
    state.cards[index] = action.payload;
  }
});

  },
});

export default contactCardSlice.reducer;
