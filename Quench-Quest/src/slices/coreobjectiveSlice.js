import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCoreObjective, updateCoreObjective } from "../api/homeApi";

// GET
export const fetchCoreObjective = createAsyncThunk(
  "objectives/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCoreObjective();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT
export const updateCoreObjectiveData = createAsyncThunk(
  "objectives/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateCoreObjective(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const objectivesSlice = createSlice({
  name: "objectives",
  initialState: {
    objective: null,
    loading: false,
    error: null,
    updated: false,
  },
  reducers: {
    resetObjectiveState: (state) => {
      state.updated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchCoreObjective.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoreObjective.fulfilled, (state, action) => {
        state.loading = false;
        state.objective = action.payload[0] || null;
      })
      .addCase(fetchCoreObjective.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PUT
      .addCase(updateCoreObjectiveData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCoreObjectiveData.fulfilled, (state, action) => {
        state.loading = false;
        state.objective = action.payload;
        state.updated = true;
      })
      .addCase(updateCoreObjectiveData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetObjectiveState } = objectivesSlice.actions;
export default objectivesSlice.reducer;
