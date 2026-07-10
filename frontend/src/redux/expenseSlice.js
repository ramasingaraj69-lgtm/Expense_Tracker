import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

// GET ALL
export const fetchExpenses = createAsyncThunk(
    "expense/fetchExpenses",
    async(userId, { rejectWithValue }) => {
        try {
            const res = await API.get("expenses/", {
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

// GET SINGLE
export const fetchExpense = createAsyncThunk(
    "expense/fetchExpense",
    async({ id, userId }, { rejectWithValue }) => {
        try {
            const res = await API.get(`expenses/${id}/`, {
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

// CREATE
export const addExpense = createAsyncThunk(
    "expense/addExpense",
    async(expense, { rejectWithValue }) => {
        try {
            const res = await API.post("expenses/", expense);
            return res.data.data;
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
);

// UPDATE
export const updateExpense = createAsyncThunk(
    "expense/updateExpense",
    async({ id, expense }, { rejectWithValue }) => {
        try {
            const res = await API.put(`expenses/${id}/`, expense);
            return res.data.data;
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
);

// DELETE
export const deleteExpense = createAsyncThunk(
    "expense/deleteExpense",
    async(id, { rejectWithValue }) => {
        try {
            await API.delete(`expenses/${id}/`);
            return id;
        } catch (err) {
            if (err.response && err.response.data) {
                return rejectWithValue(err.response.data);
            }
            return rejectWithValue(err.message);
        }
    }
);

const expenseSlice = createSlice({
    name: "expense",

    initialState: {
        expenses: [],
        expense: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchExpenses.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchExpenses.fulfilled, (state, action) => {
            state.loading = false;
            state.expenses = action.payload;
        })

        .addCase(fetchExpense.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchExpense.fulfilled, (state, action) => {
            state.loading = false;
            state.expense = action.payload;
        })

        .addCase(addExpense.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(addExpense.fulfilled, (state, action) => {
            state.loading = false;
            state.expenses.unshift(action.payload);
        })

        .addCase(updateExpense.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(updateExpense.fulfilled, (state, action) => {
            state.loading = false;

            state.expenses = state.expenses.map((expense) => {
                if (expense.id === action.payload.id) {
                    return action.payload;
                }
                return expense;
            });
        })

        .addCase(deleteExpense.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(deleteExpense.fulfilled, (state, action) => {
            state.loading = false;

            state.expenses = state.expenses.filter((expense) => {
                return expense.id !== action.payload;
            });
        })

        .addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }
        );

    }

});

export default expenseSlice.reducer;