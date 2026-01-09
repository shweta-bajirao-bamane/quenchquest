import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProgramSlider, updateProgramSlider } from "../api/programApi";

// GET sliders
export const fetchProgramSlider = createAsyncThunk(
  "programSlider/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProgramSlider();
      return res.data; // <-- ARRAY
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// PUT slider
export const updateProgramSliderData = createAsyncThunk(
  "programSlider/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateProgramSlider(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const programSliderSlice = createSlice({
  name: "programSlider",
  initialState: {
    sliders: [],      // ✅ ARRAY
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramSlider.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProgramSlider.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sliders = action.payload; // ✅ ARRAY STORED
      })
      .addCase(fetchProgramSlider.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProgramSliderData.fulfilled, (state, action) => {
        const index = state.sliders.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.sliders[index] = action.payload;
        }
      });
  },
});

export default programSliderSlice.reducer;
