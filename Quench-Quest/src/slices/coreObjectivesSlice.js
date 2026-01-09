import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCoreObjectives, updateCoreObjective } from "../api/aboutApi";

// GET core objectives list
export const fetchCoreObjectives = createAsyncThunk(
  "coreObjectives/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCoreObjectives();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT core objective
export const updateCoreObjectiveData = createAsyncThunk(
  "coreObjectives/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateCoreObjective(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const coreObjectivesSlice = createSlice({
  name: "coreObjectives",
  initialState: {
    items: null, // array or null
    loading: false,
    success: false,
    error: null,
    updated: false,
  },
  reducers: {
    resetCoreObjectivesState: (state) => {
      state.success = false;
      state.error = null;
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoreObjectives.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoreObjectives.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        if (Array.isArray(payload)) {
          state.items = payload;
        } else if (payload && typeof payload === "object") {
          if (Array.isArray(payload.results)) state.items = payload.results;
          else state.items = Array.isArray(payload) ? payload : [payload];
        } else {
          state.items = null;
        }
        state.error = null;
        state.updated = false;
      })
      .addCase(fetchCoreObjectives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCoreObjectiveData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCoreObjectiveData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const payload = action.payload;
        const id = payload?.id ?? payload?.pk;

        if (Array.isArray(state.items) && id) {
          const idx = state.items.findIndex((i) => (i?.id ?? i?.pk) === id);
          if (idx !== -1) state.items[idx] = payload;
          else state.items.push(payload);
        } else if (state.items && typeof state.items === "object" && (state.items?.id ?? state.items?.pk) === id) {
          state.items = [payload];
        } else {
          state.items = [payload];
        }
        state.updated = true;
      })
      .addCase(updateCoreObjectiveData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCoreObjectivesState } = coreObjectivesSlice.actions;
export default coreObjectivesSlice.reducer;
