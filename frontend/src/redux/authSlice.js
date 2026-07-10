import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";
import axios from "axios";
import { useSelector } from "react-redux";
// Register
export const registerUser = createAsyncThunk(
    "auth/register",
    async(data, { rejectWithValue }) => {
        try {
            const res = await API.post("register/", data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Login
export const loginUser = createAsyncThunk(
    "auth/login",
    async(data, { rejectWithValue }) => {
        try {
            const res = await API.post("login/", data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",

    initialState: {
        user: null,
        loading: false,
        error: null,
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.error = null;
        },
    },

    extraReducers: (builder) => {

        builder

        // Register
            .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
        })

        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Login
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        })

        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;