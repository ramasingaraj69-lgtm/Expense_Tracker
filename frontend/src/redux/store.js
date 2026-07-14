import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./budgetSlice";
import authReducer from "./authSlice";
import expenseReducer from "./expenseSlice";
import goalReducer from "./goalSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        expense: expenseReducer,
        budget: budgetReducer,
        goal: goalReducer
    },
});