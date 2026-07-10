import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
    fetchExpenses,
    deleteExpense,
} from "../redux/expenseSlice";
import { FaWallet } from "react-icons/fa";
import {
    FaPlus,
    FaEdit,
    FaTrash, FaArrowLeft
} from "react-icons/fa";

import Swal from "sweetalert2";

function Expenses() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        expenses,
        loading
    } = useSelector(
        (state) => state.expense
    );
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {

        dispatch(fetchExpenses(user?.id));

    }, [dispatch, user?.id]);

    const removeExpense = (id) => {

        Swal.fire({

            title: "Delete Expense?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete",

            cancelButtonText: "Cancel"

        }).then((result) => {

            if (result.isConfirmed) {

                dispatch(deleteExpense(id));

                Swal.fire(
                    "Deleted!",
                    "Expense deleted successfully.",
                    "success"
                );

            }

        });

    };

    const totalExpense = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-8">
                                  <button
    type="button"
    onClick={() => navigate("/home")}
    className="
        flex
        items-center
        justify-center
        w-12
        h-12
        rounded-full
        bg-white
        text-[#6F4E37]
        shadow-md
        border
        border-[#D6C5B4]
        hover:bg-[#F7F3EF]
        hover:scale-105
        transition
        duration-300
    "
>
    <FaArrowLeft className="text-lg" />
</button>

                    <div>
      

                        <h1 className="text-4xl font-bold">

                            Expense Tracker

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Manage all your daily expenses.

                        </p>

                    </div>
                    
                    <Link to="/expenses/add">

                        <motion.button
    whileHover={{
        scale: 1.05,
        y: -2,
    }}
    whileTap={{
        scale: 0.97,
    }}
    className="
        flex
        items-center
        gap-3
        rounded-2xl
        bg-gradient-to-r
        from-[#6F4E37]
        via-[#8B5E3C]
        to-[#4A2C2A]
        px-7
        py-4
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:shadow-2xl
    "
>
    <FaPlus />
    Add Expense
</motion.button>

                            

                    </Link>

                </div>

                <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{
        y: -6,
        scale: 1.02,
    }}
    className="
        relative
        overflow-hidden
        mb-8
        rounded-3xl
        border
        border-[#E5D6C6]
        bg-[#FDFBF8]/90
        backdrop-blur-xl
        p-8
        shadow-xl
    "
>

    {/* Decorative Background */}

    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#D8C3A5]/30 blur-3xl"></div>

    <div className="relative flex items-center justify-between">

        <div>

            <p className="uppercase tracking-[3px] text-sm font-semibold text-[#8B6B56]">

                Total Expenses

            </p>

            <h1 className="mt-3 text-5xl font-bold text-[#4A2C2A]">

                ₹ {totalExpense}

            </h1>

            <p className="mt-2 text-[#8B6B56]">

                Overall spending across all transactions

            </p>

        </div>

        <div
            className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-3xl
                bg-gradient-to-br
                from-[#8B5E3C]
                via-[#6F4E37]
                to-[#4A2C2A]
                shadow-xl
            "
        >

            <FaWallet className="text-3xl text-white" />

        </div>

    </div>

</motion.div>
                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gradient-to-r from-[#6F4E37] via-[#8B5E3C] to-[#4A2C2A] text-white">

                            <tr>

                                <th className="p-4">ID</th>

                                <th>Title</th>

                                <th>Amount</th>

                                <th>Description</th>

                                <th>Date</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                loading ?

                                    (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center py-10"
                                            >

                                                Loading...

                                            </td>

                                        </tr>

                                    )

                                    :

                                    expenses.length === 0 ?

                                        (

                                            <tr>

                                                <td
                                                    colSpan="6"
                                                    className="text-center py-10"
                                                >

                                                    No Expenses Found

                                                </td>

                                            </tr>

                                        )

                                        :

                                        (

                                            expenses.map((expense) => (

                                                <tr
                                                    key={expense.id}
                                                    className="border-b hover:bg-gray-50"
                                                >

                                                    <td className="p-4">

                                                        {expense.id}

                                                    </td>

                                                    <td>

                                                        {expense.title}

                                                    </td>

                                                    <td>

                                                        ₹ {expense.amount}

                                                    </td>

                                                    <td>

                                                        {expense.description}

                                                    </td>

                                                    <td>

                                                        {expense.date}

                                                    </td>

                                                    <td>

                                                        <div className="flex gap-2 justify-center">

                                                            <button

                                                                onClick={() =>
                                                                    navigate(
                                                                        "/expenses/edit/" +
                                                                        expense.id
                                                                    )
                                                                }

                                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
                                                            >

                                                                <FaEdit />

                                                            </button>

                                                            <button

                                                                onClick={() =>
                                                                    removeExpense(
                                                                        expense.id
                                                                    )
                                                                }

                                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                                                            >

                                                                <FaTrash />

                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            ))

                                        )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Expenses;