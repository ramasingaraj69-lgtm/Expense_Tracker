import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

// GET ALL BUDGETS
export const fetchBudgets = createAsyncThunk(
    "budget/fetchBudgets",
    async(userId, { rejectWithValue }) => {
        try {
            const res = await API.get("budgets/", {
                params: { user_id: userId },
            });
            return res.data.data;
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
);

// GET SINGLE BUDGET
export const fetchBudget = createAsyncThunk(
    "budget/fetchBudget",
    async({ id, userId }, { rejectWithValue }) => {
        try {
            const res = await API.get("budgets/" + id + "/", {
                params: { user_id: userId },
            });
            return res.data.data;
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
);

// CREATE BUDGET
export const addBudget = createAsyncThunk(
    "budget/addBudget",
    async(budget, { rejectWithValue }) => {
        try {
            const res = await API.post("budgets/", budget);
            return res.data.data;
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
);

// UPDATE BUDGET
export const updateBudget = createAsyncThunk(
    "budget/updateBudget",
    async({ id, budget }, { rejectWithValue }) => {
        try {
            const res = await API.put("budgets/" + id + "/", budget);
            return res.data.data;
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
);

// DELETE BUDGET
export const deleteBudget = createAsyncThunk(
    "budget/deleteBudget",
    async(id, { rejectWithValue }) => {
        try {
            await API.delete("budgets/" + id + "/");
            return id;
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
);

const budgetSlice = createSlice({
    name: "budget",

    initialState: {
        budgets: [],
        budget: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {

        builder

        // FETCH ALL
            .addCase(fetchBudgets.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchBudgets.fulfilled, (state, action) => {
            state.loading = false;
            state.budgets = action.payload;
        })

        // FETCH SINGLE
        .addCase(fetchBudget.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchBudget.fulfilled, (state, action) => {
            state.loading = false;
            state.budget = action.payload;
        })

        // ADD
        .addCase(addBudget.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(addBudget.fulfilled, (state, action) => {
            state.loading = false;
            state.budgets.unshift(action.payload);
        })

        // UPDATE
        .addCase(updateBudget.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(updateBudget.fulfilled, (state, action) => {
            state.loading = false;

            state.budgets = state.budgets.map((budget) => {
                if (budget.id === action.payload.id) {
                    return action.payload;
                }
                return budget;
            });
        })

        // DELETE
        .addCase(deleteBudget.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(deleteBudget.fulfilled, (state, action) => {
            state.loading = false;

            state.budgets = state.budgets.filter((budget) => {
                return budget.id !== action.payload;
            });
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

export default budgetSlice.reducer;