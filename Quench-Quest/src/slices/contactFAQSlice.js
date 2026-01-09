// src/slices/contactFAQSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFAQs, updateFAQ } from "../api/contactApi";

// Async thunk to fetch FAQs
export const fetchFAQs = createAsyncThunk("faq/fetchFAQs", async () => {
  const response = await getFAQs();
  return response.data;
});

// Async thunk to update FAQ
export const updateFAQData = createAsyncThunk(
  "faq/updateFAQData",
  async ({ id, data }) => {
    const response = await updateFAQ(id, data);
    return response.data;
  }
);

const contactFAQSlice = createSlice({
  name: "faq",
  initialState: {
    faqs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFAQs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.faqs = action.payload;
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateFAQData.fulfilled, (state, action) => {
        const index = state.faqs.findIndex((faq) => faq.id === action.payload.id);
        if (index !== -1) {
          state.faqs[index] = action.payload;
        }
      });
  },
});

export default contactFAQSlice.reducer;
