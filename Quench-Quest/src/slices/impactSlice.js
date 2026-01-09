import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getImpact, updateImpact } from "../api/homeApi";

/* GET Impact */
export const fetchImpact = createAsyncThunk(
  "impact/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getImpact();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* PUT Impact */
export const updateImpactData = createAsyncThunk(
  "impact/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateImpact(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const impactSlice = createSlice({
  name: "impact",
  initialState: {
    impactList: [], // array of items from backend
    loading: false,
    success: false,
    error: null,
    updated: false,
  },
  reducers: {
    resetImpactState: (state) => {
      state.success = false;
      state.error = null;
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImpact.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImpact.fulfilled, (state, action) => {
        state.loading = false;
        // support payload formats: { data: [...] } or array
        let list = [];
        const payload = action.payload;
        if (Array.isArray(payload)) list = payload;
        else if (payload?.data && Array.isArray(payload.data)) list = payload.data;
        else if (payload?.all_data && Array.isArray(payload.all_data)) list = payload.all_data;

        // normalize items (ensure label/value present, handle "null"/"undefined")
        state.impactList = list.map((it) => {
          const copy = { ...it };
          if (copy.label === "null" || copy.label === "undefined") copy.label = "";
          if (copy.value === "null" || copy.value === "undefined") copy.value = "";
          return copy;
        });
      })
      .addCase(fetchImpact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateImpactData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateImpactData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const payload = action.payload || null;

        // payload could contain updated item or all_data
        if (payload?.all_data && Array.isArray(payload.all_data)) {
          state.impactList = payload.all_data.map((it) => {
            const copy = { ...it };
            if (copy.label === "null" || copy.label === "undefined") copy.label = "";
            if (copy.value === "null" || copy.value === "undefined") copy.value = "";
            return copy;
          });
        } else if (Array.isArray(payload)) {
          state.impactList = payload;
        } else if (payload?.id) {
          const idx = state.impactList.findIndex((p) => p.id === payload.id);
          const copy = { ...payload };
          if (copy.label === "null" || copy.label === "undefined") copy.label = "";
          if (copy.value === "null" || copy.value === "undefined") copy.value = "";
          if (idx !== -1) state.impactList[idx] = copy;
          else state.impactList.push(copy);
        }
        state.updated = true;
      })
      .addCase(updateImpactData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("updateImpactData rejected:", action.payload);
      });
  },
});

export const { resetImpactState } = impactSlice.actions;
export default impactSlice.reducer;
