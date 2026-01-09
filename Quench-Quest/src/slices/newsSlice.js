import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNews, updateNews } from "../api/homeApi";

/* GET Latest News */
export const fetchNews = createAsyncThunk(
  "news/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getNews();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* PUT News item */
export const updateNewsData = createAsyncThunk(
  "news/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateNews(id, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsList: [],
    loading: false,
    success: false,
    error: null,
    newsUpdated: false,
  },
  reducers: {
    resetNewsState: (state) => {
      state.success = false;
      state.error = null;
      state.newsUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        let list = [];
        const payload = action.payload;
        if (Array.isArray(payload)) list = payload;
        else if (payload?.all_data && Array.isArray(payload.all_data)) list = payload.all_data;
        else if (payload?.data && Array.isArray(payload.data)) list = payload.data;
        // normalize
        list = list.map((it) => {
          const copy = { ...it };
          if (copy.description === "null" || copy.description === "undefined") copy.description = null;
          if (copy.sub_description === "null" || copy.sub_description === "undefined") copy.sub_description = null;
          return copy;
        });
        state.newsList = list;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateNewsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNewsData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const payload = action.payload || null;
        if (payload?.all_data && Array.isArray(payload.all_data)) {
          state.newsList = payload.all_data.map((it) => {
            const copy = { ...it };
            if (copy.description === "null" || copy.description === "undefined") copy.description = null;
            return copy;
          });
        } else if (Array.isArray(payload)) {
          state.newsList = payload;
        } else if (payload?.id) {
          const idx = state.newsList.findIndex((p) => p.id === payload.id);
          const copy = { ...payload };
          if (copy.description === "null" || copy.description === "undefined") copy.description = null;
          if (idx !== -1) state.newsList[idx] = copy;
          else state.newsList.push(copy);
        }
        state.newsUpdated = true;
      })
      .addCase(updateNewsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("updateNewsData rejected:", action.payload);
      });
  },
});

export const { resetNewsState } = newsSlice.actions;
export default newsSlice.reducer;
