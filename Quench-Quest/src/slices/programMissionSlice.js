import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProgramMission, updateProgramMission } from "../api/programApi";

/* ================= THUNKS ================= */

// GET
export const fetchProgramMission = createAsyncThunk(
  "programMission/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getProgramMission();
      return res.data;   // ✅ BACKEND RETURNS OBJECT
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// UPDATE
export const updateProgramMissionData = createAsyncThunk(
  "programMission/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateProgramMission(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */

const programMissionSlice = createSlice({
  name: "programMission",
  initialState: {
    mission: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramMission.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProgramMission.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mission = action.payload;
      })
      .addCase(fetchProgramMission.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProgramMissionData.fulfilled, (state, action) => {
        state.mission = action.payload;
      });
  },
});

export default programMissionSlice.reducer;
