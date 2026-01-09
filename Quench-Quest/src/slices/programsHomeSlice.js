import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getHomePrograms,
  updateHomePrograms,
} from "../api/homeApi";

/* =========================
   GET Featured Programs
========================= */
export const fetchHomePrograms = createAsyncThunk(
  "programsHome/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getHomePrograms();
      return res.data; // API returns array
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* =========================
   PUT Featured Programs
========================= */
export const updateHomeProgramsData = createAsyncThunk(
  "programsHome/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateHomePrograms(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const programsHomeSlice = createSlice({
  name: "programsHome",
  initialState: {
    programsList: [], // array from backend (all_data)
    loading: false,
    success: false,
    error: null,
    programsUpdated: false,  // prevents repeated PUT loops (if used)
  },
  reducers: {
    resetProgramsHomeState: (state) => {
      state.success = false;
      state.error = null;
      state.programsUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* -------- GET -------- */
      .addCase(fetchHomePrograms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomePrograms.fulfilled, (state, action) => {
        state.loading = false;
        // payload could be array or { all_data: [...] } or object
        let list = [];
        const payload = action.payload;
        if (Array.isArray(payload)) list = payload;
        else if (payload?.all_data && Array.isArray(payload.all_data)) list = payload.all_data;
        else if (payload?.data && Array.isArray(payload.data)) list = payload.data;

        // normalize entries
        list = list.map((it) => {
          const copy = { ...it };
          if (copy.description === "null" || copy.description === "undefined") copy.description = null;
          if (copy.sub_description === "null" || copy.sub_description === "undefined") copy.sub_description = null;
          if (copy.title === "null" || copy.title === "undefined") copy.title = null;
          if (copy.items && typeof copy.items === "string") {
            try {
              copy.items = JSON.parse(copy.items);
            } catch {
              copy.items = [];
            }
          }
          if (!Array.isArray(copy.items)) copy.items = copy.items ? [copy.items] : [];
          return copy;
        });

        state.programsList = list;
      })
      .addCase(fetchHomePrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- PUT -------- */
      .addCase(updateHomeProgramsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateHomeProgramsData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const payload = action.payload || null;

        // backend may return { updated: {...}, all_data: [...] } or updated object or array
        if (payload?.all_data && Array.isArray(payload.all_data)) {
          // replace full list
          state.programsList = payload.all_data.map((it) => {
            const copy = { ...it };
            if (copy.description === "null" || copy.description === "undefined") copy.description = null;
            if (copy.sub_description === "null" || copy.sub_description === "undefined") copy.sub_description = null;
            return copy;
          });
        } else if (Array.isArray(payload)) {
          state.programsList = payload;
        } else if (payload?.id) {
          // updated single object — replace matching id
          const idx = state.programsList.findIndex((p) => p.id === payload.id);
          const copy = { ...payload };
          if (copy.description === "null" || copy.description === "undefined") copy.description = null;
          if (copy.sub_description === "null" || copy.sub_description === "undefined") copy.sub_description = null;
          if (idx !== -1) state.programsList[idx] = copy;
          else state.programsList.push(copy);
        }
        state.programsUpdated = true;
      })
      .addCase(updateHomeProgramsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("updateHomeProgramsData rejected:", action.payload);
      });
  },
});

export const { resetProgramsHomeState } = programsHomeSlice.actions;
export default programsHomeSlice.reducer;
