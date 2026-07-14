import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../redux/expenseSlice";
import { fetchExpenses } from "../redux/expenseSlice";
import { fetchBudgets } from "../redux/budgetSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Swal from "sweetalert2";
function AddExpense() {

    const dispatch = useDispatch();

    const navigate = useNavigate();
  
    const { user } = useSelector((state) => state.auth);

const { expenses } = useSelector((state) => state.expense);

const { budgets } = useSelector((state) => state.budget);
useEffect(() => {
    if (user) {
        dispatch(fetchBudgets(user.id));
        dispatch(fetchExpenses(user.id));
    }
}, [dispatch, user]);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category:"Food",
        description: "",
        date: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const validate = () => {

        let err = {};

        if (formData.title.trim() === "") {
            err.title = "Title is required";
        }

        if (formData.amount === "") {
            err.amount = "Amount is required";
        }

        if (formData.date === "") {
            err.date = "Date is required";
        }

        setErrors(err);

        return Object.keys(err).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) {
            return;
        }

        const action = await dispatch(
    addExpense({
        ...formData,
        user_id: user.id,
    })
);

if (action.meta.requestStatus === "fulfilled") {

    const budget = budgets.find(
        (b) => b.category === formData.category
    );

    if (budget) {

        const previousSpent = expenses
            .filter((e) => e.category === formData.category)
            .reduce((sum, e) => sum + Number(e.amount), 0);

        const totalSpent =
            previousSpent + Number(formData.amount);

        const budgetAmount = Number(budget.budget);

        const percentage =
            (totalSpent / budgetAmount) * 100;

        let icon = "success";
        let title = "Healthy Spending";
        let status = "You are spending wisely.";

        if (percentage >= 80 && percentage <= 100) {
            icon = "warning";
            title = "Near Budget Limit";
            status = "You're close to your category budget.";
        }

        if (percentage > 100) {
            icon = "error";
            title = "Budget Exceeded";
            status = `Exceeded by ₹${(
                totalSpent - budgetAmount
            ).toFixed(2)}`;
        }

        await Swal.fire({

            icon,

            title,

            html: `
                <b>Expense Saved Successfully</b><br><br>

                Category : ${formData.category}<br>

                Budget : ₹${budgetAmount}<br>

                Total Spent : ₹${totalSpent}<br>

                Remaining : ₹${Math.max(
                    budgetAmount - totalSpent,
                    0
                )}<br><br>

                <b>${status}</b>
            `,

            confirmButtonColor: "#6F4E37",

        });
    }
    else {

        await Swal.fire({
            icon: "success",
            title: "Expense Added",
            text: "Expense saved successfully.",
            confirmButtonColor: "#6F4E37",
        });

    }

    navigate("/expenses");
}

    };

    return (

        <>
        
        <div className="min-h-screen bg-slate-100 flex justify-center items-center p-5">

            
<div className="pointer-events-none absolute inset-0 overflow-hidden">

    <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-[#D9B382]/20 blur-3xl"></div>

    <div className="absolute -right-16 bottom-10 h-96 w-96 rounded-full bg-[#8B5E3C]/10 blur-3xl"></div>

</div>
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

                <h2 className="mb-3 text-center text-5xl font-bold text-[#2D1B14]">
                    Add Expense
                </h2>
                <p className="mb-8 text-center text-[#8B6B56]">
Record today's spending and keep your finances organized.
</p>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">

                        <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-[#6F4E37]">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                            className="w-full rounded-2xl border border-[#D9C4A7] bg-[#FFFDF9] px-5 py-3 text-[#2D1B14] transition duration-300 focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#C89B5E]/40 outline-none"
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {errors.title}
                        </p>

                    </div>

                    <div className="mb-4">

                        <label className="block mb-2 font-semibold">
                            Amount
                        </label>

                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {errors.amount}
                        </p>

                    </div>
                    <div className="mb-6">

    <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-[#6F4E37]">
        Category
    </label>

    <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full rounded-2xl border border-[#D9C4A7] bg-[#FFFDF9] px-5 py-3 text-[#2D1B14] transition duration-300 focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#C89B5E]/40 outline-none"
    >
        <option value="Food">🍔 Food</option>
        <option value="Travel">✈️ Travel</option>
        <option value="Shopping">🛍 Shopping</option>
        <option value="Bills">📄 Bills</option>
        <option value="Health">❤️ Health</option>
        <option value="Education">📚 Education</option>
        <option value="Entertainment">🎬 Entertainment</option>
        <option value="Other">📦 Other</option>
    </select>

</div>
                    <div className="mb-4">

                        <label className="block mb-2 font-semibold">
                            Description
                        </label>

                        <textarea
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="w-full rounded-2xl border border-[#D9C4A7] bg-[#FFFDF9] p-4 transition duration-300 focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#C89B5E]/40 outline-none"
                        />

                    </div>

                    <div className="mb-6">

                        <label className="block mb-2 font-semibold">
                            Date
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {errors.date}
                        </p>

                    </div>

                    <div className="mt-8 flex gap-4">

                       <motion.button
    type="submit"
    whileHover={{
        scale: 1.04,
        y: -2,
    }}
    whileTap={{
        scale: 0.97,
    }}
    className="
        flex-1
        rounded-2xl
        bg-gradient-to-r
        from-[#6F4E37]
        via-[#8B5E3C]
        to-[#4A2C2A]
        px-8
        py-3.5
        font-semibold
        text-white
        shadow-xl
        transition-all
        duration-300
        hover:shadow-2xl
        hover:brightness-110
        hover:-translate-y-1
    "
>
    💾 Save Expense
</motion.button>

                        <button
                            type="button"
                            onClick={() => navigate("/expenses")}
                            className="rounded-2xl border border-[#D9C4A7] bg-white px-8 py-3.5 font-semibold text-[#6F4E37] transition-all duration-300 hover:-translate-y-1 hover:bg-[#EFE4D2]"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
        
</>
    );

}

export default AddExpense;