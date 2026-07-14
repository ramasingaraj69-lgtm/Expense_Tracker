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
import Navbar from "../components/Navbar";

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
        
<>
    <Navbar/>
        <div  className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#F8F4EF] to-[#EFE4D2] px-6 py-8">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">

            <div className="absolute left-0 top-10 h-80 w-80 rounded-full bg-[#D9B382]/20 blur-3xl"></div>

            <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-[#8B5E3C]/10 blur-3xl"></div>

            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F4E6D2]/60 blur-3xl"></div>

            </div>
            <div className="relative z-10 mx-auto max-w-7xl">

                <div className="flex justify-between items-center mb-8 ">
                                  

                    <div>
      

                        <h1 className="text-5xl font-bold  color-white">

                            Expense Tracker

                        </h1>

                        <p className="mt-3 text-lg text-[#8B6B56]">

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
group
flex
items-center
gap-3
rounded-2xl
bg-gradient-to-r
from-[#8B5E3C]
via-[#6F4E37]
to-[#4A2C2A]
px-8
py-4
font-semibold
text-white
shadow-xl
transition-all
duration-300
hover:-translate-y-2
hover:shadow-[0_20px_40px_rgba(74,44,42,.35)]
"
>
    <FaPlus className="transition-transform duration-300 group-hover:rotate-90" />
    Add Expense
</motion.button>

                            

                    </Link>

                </div>

                <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{
        y: -10,
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

    <div className="relative flex items-center justify-between border-[#D9C4A7]">

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
                <div  className="overflow-hidden rounded-3xl border border-[#E5D6C6] bg-white/90 backdrop-blur-xl shadow-[0_25px_60px_rgba(74,44,42,.08)]">
                    <div className="overflow-x-auto">
                    <table className="w-full">

                        <thead className="bg-gradient-to-r from-[#4A2C2A] via-[#6F4E37] to-[#8B5E3C] text-white">

                            <tr>

                                <th className="px-6 py-5 text-left text-sm uppercase tracking-widest">ID</th>

                                <th className="px-6 py-5 text-left text-sm uppercase tracking-widest">Title</th>

                                <th className="px-6 py-5 text-left text-sm uppercase tracking-widest">Amount</th>
                                <th className="px-6 py-5 text-left text-sm uppercase tracking-widest">Category</th>
                                <th className="px-6 py-5 text-left text-sm uppercase tracking-widest">Description</th>

                                <th className="px-6 py-5 text-left text-sm uppercase tracking-widest">Date</th>

                                <th className="px-6 py-5 text-left text-sm uppercase tracking-widest">Actions</th>

                            </tr>

                        </thead>

                        <tbody className="border-b border-[#F1E6D9] transition duration-300 hover:bg-[#FFF9F2]">

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
                                                        {expense.category}
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

        </div>
</>

    );

}

export default Expenses;