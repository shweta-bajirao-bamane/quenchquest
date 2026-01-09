import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUpcomingEvents,
  updateUpcomingEvent,
} from "../api/getInvolvedApi";

/* ================= THUNKS ================= */

// GET
export const fetchUpcomingEvents = createAsyncThunk(
  "upcomingEvents/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUpcomingEvents();
      return res.data; // array of events
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT
export const updateUpcomingEventData = createAsyncThunk(
  "upcomingEvents/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateUpcomingEvent(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ================= SLICE ================= */

const upcomingEventsSlice = createSlice({
  name: "upcomingEvents",
  initialState: {
    events: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // PUT
      .addCase(updateUpcomingEventData.fulfilled, (state, action) => {
        const index = state.events.findIndex(
          (event) => event.id === action.payload.id
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      });
  },
});

export default upcomingEventsSlice.reducer;
