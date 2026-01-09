import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitContactForm } from "../api/contactApi";

/* -------- Contact Form Thunk ---------- */
export const sendContactMessage = createAsyncThunk(
    "contact/sendContactMessage",
    async (formData, thunkAPI) => {
        try {
            const response = await submitContactForm(formData);
            return response;
        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data || { message: "Something went wrong" }
            );
        }
    }
);

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        loading: false,
        success: null,
        error: null,
    },
    reducers: {
        resetContactState: (state) => {
            state.loading = false;
            state.success = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendContactMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(sendContactMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message || "Message sent successfully!";
            })
            .addCase(sendContactMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to send message";
            });
    },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
