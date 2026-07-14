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
        category: "Food",
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
                category: expense.category || "Food",
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

        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#F8F4EF] to-[#EFE4D2] flex items-center justify-center px-6 py-10">"
<div className="pointer-events-none absolute inset-0 overflow-hidden">

    <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#D9B382]/20 blur-3xl"></div>

    <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-[#8B5E3C]/10 blur-3xl"></div>

</div>
            <motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:.7}}
className="relative z-10 w-full max-w-2xl rounded-[32px] border border-[#E5D6C6] bg-white/90 p-10 shadow-[0_25px_60px_rgba(74,44,42,.12)] backdrop-blur-xl"
>

                <h2 className="mb-3 text-center text-5xl font-bold text-[#2D1B14]">
                    Edit Expense
                </h2>
                <p className="mb-8 text-center text-[#8B6B56]">
Update your expense details and keep your finances accurate.
</p>

                <form onSubmit={handleSubmit}>

                    <input
                        className="mb-5 w-full rounded-2xl border border-[#D9C4A7] bg-[#FFFDF9] px-5 py-3 text-[#2D1B14] outline-none transition duration-300 focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#C89B5E]/40"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <input
                        className="mb-5 w-full rounded-2xl border border-[#D9C4A7] bg-[#FFFDF9] px-5 py-3 text-[#2D1B14] outline-none transition duration-300 focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#C89B5E]/40"
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                    <div className="mb-6">

    <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-[#6F4E37]">
        Category
    </label>

    <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full rounded-2xl border border-[#D9C4A7] bg-[#FFFDF9] px-5 py-3 text-[#2D1B14] outline-none transition duration-300 focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#C89B5E]/40"
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
                    <textarea
                        className="mb-5 w-full rounded-2xl border border-[#D9C4A7] bg-[#FFFDF9] p-4 outline-none transition duration-300 focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#C89B5E]/40"
                        name="description"
                        placeholder="Description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <input
                        className="mb-6 w-full rounded-2xl border border-[#D9C4A7] bg-[#FFFDF9] px-5 py-3 outline-none transition duration-300 focus:border-[#8B5E3C] focus:ring-2 focus:ring-[#C89B5E]/40"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />

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
        hover:-translate-y-1
    "
>
    <FaEdit />
    Update Expense
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

            </motion.div>

        </div>

    );

}

export default Editexpense;