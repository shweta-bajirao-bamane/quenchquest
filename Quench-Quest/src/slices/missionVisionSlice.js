import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMissionVision, updateMissionVision } from "../api/aboutApi";

// GET mission-vision
export const fetchMissionVision = createAsyncThunk(
  "missionVision/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMissionVision();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT mission-vision
export const updateMissionVisionData = createAsyncThunk(
  "missionVision/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateMissionVision(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const missionVisionSlice = createSlice({
  name: "missionVision",
  initialState: {
    item: null,
    loading: false,
    success: false,
    error: null,
    updated: false,
  },
  reducers: {
    resetMissionVisionState: (state) => {
      state.success = false;
      state.error = null;
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissionVision.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMissionVision.fulfilled, (state, action) => {
        state.loading = false;
        // Keep the full array when API returns array.
        // If API returns an object that contains results array, prefer that.
        const payload = action.payload;
        if (Array.isArray(payload)) {
          state.item = payload;
        } else if (payload && typeof payload === "object") {
          if (Array.isArray(payload.results)) state.item = payload.results;
          else state.item = payload;
        } else {
          state.item = null;
        }
        state.error = null;
        // after a fresh fetch, clear the 'updated' flag so components can detect future updates
        state.updated = false;
      })
      .addCase(fetchMissionVision.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateMissionVisionData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMissionVisionData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const payload = action.payload;
        const id = payload?.id ?? payload?.pk;

        // If we currently hold an array, merge/replace the updated item into it.
        if (Array.isArray(state.item) && id) {
          const idx = state.item.findIndex((i) => (i?.id ?? i?.pk) === id);
          if (idx !== -1) {
            state.item[idx] = payload;
          } else {
            // not found: append to preserve both vision & mission
            state.item.push(payload);
          }
        } else if (state.item && typeof state.item === "object" && (state.item?.id ?? state.item?.pk) === id) {
          state.item = payload;
        } else {
          // fallback: set to payload (single object) — UI refetch logic will try to get full list
          state.item = payload;
        }
        state.updated = true;
      })
      .addCase(updateMissionVisionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMissionVisionState } = missionVisionSlice.actions;
export default missionVisionSlice.reducer;
