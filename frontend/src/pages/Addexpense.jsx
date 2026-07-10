import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../redux/expenseSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function AddExpense() {

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
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

        await dispatch(addExpense({ ...formData, user_id: user?.id }));

        navigate("/expenses");

    };

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center p-5">

            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">

                <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
                    Add Expense
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">

                        <label className="block mb-2 font-semibold">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter title"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

                    <div className="flex justify-between">

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
    "
>
    💾 Save Expense
</motion.button>

                        <button
                            type="button"
                            onClick={() => navigate("/expenses")}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddExpense;