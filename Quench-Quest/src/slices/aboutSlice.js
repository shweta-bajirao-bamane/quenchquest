import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAboutIntro, updateAboutIntro } from "../api/aboutApi";

// GET About Intro
export const fetchAboutIntro = createAsyncThunk(
  "about/fetchIntro",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAboutIntro();
      return res.data; // array from API
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT About Intro
export const updateAboutIntroData = createAsyncThunk(
  "about/updateIntro",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateAboutIntro(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    intro: null, // store single intro object
    loading: false,
    success: false,
    error: null,
    updated: false,
  },
  reducers: {
    resetAboutState: (state) => {
      state.success = false;
      state.error = null;
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchAboutIntro.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAboutIntro.fulfilled, (state, action) => {
        state.loading = false;
        state.intro = action.payload[0] || null; // take first intro object
      })
      .addCase(fetchAboutIntro.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PUT
      .addCase(updateAboutIntroData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAboutIntroData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.intro = action.payload;
        state.updated = true;
      })
      .addCase(updateAboutIntroData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAboutState } = aboutSlice.actions;
export default aboutSlice.reducer;
