import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpense, updateExpense } from "../redux/expenseSlice";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";

function Editexpense() {

    const { id } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { expense } = useSelector((state) => state.expense);
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        description: "",
        date: "",
    });

    useEffect(() => {

        dispatch(fetchExpense({ id, userId: user?.id }));

    }, [dispatch, id]);

    useEffect(() => {

        if (expense) {

            setFormData({
                title: expense.title || "",
                amount: expense.amount || "",
                description: expense.description || "",
                date: expense.date || "",
            });

        }

    }, [expense]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await dispatch(
            updateExpense({
                id,
                expense: { ...formData, user_id: user?.id },
            })
        );

        navigate("/expenses");

    };

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center">

            <div className="bg-white shadow-xl rounded-xl p-8 w-114">

                <h2 className="text-3xl font-bold mb-6">
                    Edit Expense
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        className="w-full border p-3 rounded mb-4"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <input
                        className="w-full border p-3 rounded mb-4"
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />

                    <textarea
                        className="w-full border p-3 rounded mb-4"
                        name="description"
                        placeholder="Description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <input
                        className="w-full border p-3 rounded mb-6"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />

                    <div className="flex gap-3">

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
        flex
        items-center
        justify-center
        gap-2
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
    <FaEdit />
    Update Expense
</motion.button>

                        <button
                            type="button"
                            onClick={() => navigate("/expenses")}
                            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default Editexpense;