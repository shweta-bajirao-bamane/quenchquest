import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHomeHero, updateHomeHero } from "../api/homeApi";

// GET Hero
export const fetchHomeHero = createAsyncThunk(
  "home/fetchHero",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getHomeHero();
      return res.data; // array from API
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT Hero
export const updateHomeHeroData = createAsyncThunk(
  "home/updateHero",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateHomeHero(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const homeSlice = createSlice({
  name: "home",
  initialState: {
    hero: null, // store single hero object
    loading: false,
    success: false,
    error: null,
    updated: false, // to prevent infinite PUT loops
  },
  reducers: {
    resetHomeState: (state) => {
      state.success = false;
      state.error = null;
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchHomeHero.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeHero.fulfilled, (state, action) => {
        state.loading = false;
        state.hero = action.payload[0] || null; // take first hero object
      })
      .addCase(fetchHomeHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PUT
      .addCase(updateHomeHeroData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateHomeHeroData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.hero = action.payload;
        state.updated = true; // mark updated to prevent repeat
      })
      .addCase(updateHomeHeroData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetHomeState } = homeSlice.actions;
export default homeSlice.reducer;
