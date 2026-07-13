import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

// GET Financial Goal
export const fetchGoal = createAsyncThunk(
    "goal/fetchGoal",
    async(userId, { rejectWithValue }) => {
        try {

            const res = await API.get(
                "financial-goal/", {
                    params: {
                        user_id: userId,
                    },
                }
            );

            if (res.data.status) {
                return res.data.data;
            }

            return null;

        } catch (err) {

            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }

            return rejectWithValue(err.message);
        }
    }
);

// SAVE / UPDATE Financial Goal
export const saveGoal = createAsyncThunk(
    "goal/saveGoal",
    async(goal, { rejectWithValue }) => {
        try {

            const res = await API.post(
                "financial-goal/",
                goal
            );

            return res.data.data;

        } catch (err) {

            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }

            return rejectWithValue(err.message);
        }
    }
);

const goalSlice = createSlice({

    name: "goal",

    initialState: {

        goal: null,

        loading: false,

        error: null,

    },

    reducers: {},

    extraReducers: (builder) => {

        builder

        // FETCH

            .addCase(fetchGoal.pending, (state) => {

            state.loading = true;

            state.error = null;

        })

        .addCase(fetchGoal.fulfilled, (state, action) => {

            state.loading = false;

            state.goal = action.payload;

        })

        // SAVE

        .addCase(saveGoal.pending, (state) => {

            state.loading = true;

            state.error = null;

        })

        .addCase(saveGoal.fulfilled, (state, action) => {

            state.loading = false;

            state.goal = action.payload;

        })

        // REJECTED

        .addMatcher(

            (action) => action.type.endsWith("/rejected"),

            (state, action) => {

                state.loading = false;

                state.error = action.payload;

            }

        );

    },

});

export default goalSlice.reducer;