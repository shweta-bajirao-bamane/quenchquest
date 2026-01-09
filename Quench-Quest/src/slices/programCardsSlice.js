import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProgramCards, updateProgramCard } from "../api/programApi";

// GET Program Cards
export const fetchProgramCards = createAsyncThunk(
  "programCards/fetchCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProgramCards();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// PUT Program Card
export const updateProgramCardData = createAsyncThunk(
  "programCards/updateCard",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateProgramCard(id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const programCardsSlice = createSlice({
  name: "programCards",
  initialState: {
    cards: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProgramCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload;
      })
      .addCase(fetchProgramCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProgramCardData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProgramCardData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Replace updated card in state.cards
        const index = state.cards.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.cards[index] = action.payload;
      })
      .addCase(updateProgramCardData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default programCardsSlice.reducer;
