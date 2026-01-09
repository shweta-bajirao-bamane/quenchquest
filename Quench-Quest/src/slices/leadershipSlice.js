// leadershipSlice.js - CLEAN VERSION
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLeadership, updateLeadership } from "../api/aboutApi";

// GET leadership
export const fetchLeadership = createAsyncThunk(
  "leadership/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getLeadership();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// PUT leadership member
export const updateLeadershipData = createAsyncThunk(
  "leadership/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateLeadership(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const leadershipSlice = createSlice({
  name: "leadership",
  initialState: {
    items: [], 
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearLeadership: (state) => {
      state.items = [];
      state.error = null;
    },
    setLeadershipItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeadership.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeadership.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        // Directly set the data - no complex logic
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
        } else if (action.payload && typeof action.payload === "object") {
          // Handle different API response formats
          if (Array.isArray(action.payload.data)) {
            state.items = action.payload.data;
          } else if (Array.isArray(action.payload.results)) {
            state.items = action.payload.results;
          } else {
            // Wrap single object in array
            state.items = [action.payload];
          }
        } else {
          state.items = [];
        }
        
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchLeadership.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateLeadershipData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLeadershipData.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload;
        const id = updatedItem?.id;
        
        if (id && Array.isArray(state.items)) {
          const index = state.items.findIndex(item => item.id === id);
          if (index !== -1) {
            state.items[index] = updatedItem;
          } else {
            state.items.push(updatedItem);
          }
        }
      })
      .addCase(updateLeadershipData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLeadership, setLeadershipItems } = leadershipSlice.actions;
export default leadershipSlice.reducer;