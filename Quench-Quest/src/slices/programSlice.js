import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProgramIntro, updateProgramIntro } from "../api/programApi";  // <-- updated names

// GET thunk
export const fetchProgramIntro = createAsyncThunk(
  "program/fetchIntro",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProgramIntro();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// PUT thunk
export const updateProgramHeaderData = createAsyncThunk(
  "program/updateHeader",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateProgramIntro(id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const programSlice = createSlice({
  name: "program",
  initialState: {
    header: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramIntro.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProgramIntro.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.header = action.payload;
      })
      .addCase(fetchProgramIntro.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProgramHeaderData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProgramHeaderData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.header = action.payload;
      })
      .addCase(updateProgramHeaderData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default programSlice.reducer;
