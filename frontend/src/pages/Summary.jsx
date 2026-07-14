import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../redux/expenseSlice";
import Navbar from "../components/Navbar";
import { FaWallet, FaChartPie, FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";
function Summary() {
    const dispatch = useDispatch();

    const { expenses, loading } = useSelector(
        (state) => state.expense
    );

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchExpenses(user.id));
        }
    }, [dispatch, user]);

    // Total Expense
    const totalExpense = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    // Category-wise totals
    const categoryTotals = {};

    expenses.forEach((expense) => {
        const category = expense.category || "Other";

        if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
        }

        categoryTotals[category] += Number(expense.amount);
    });

    // Total Categories Used
    const totalCategories = Object.keys(categoryTotals).length;

    // Highest Spending Category
    let highestCategory = "-";
    let highestAmount = 0;

    Object.entries(categoryTotals).forEach(([category, amount]) => {
        if (amount > highestAmount) {
            highestAmount = amount;
            highestCategory = category;
        }
    });

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-100 p-8">

                <div className="max-w-7xl mx-auto">

                    <h1 className="text-4xl font-bold text-[#4A2C2A]">
                        Expense Summary
                    </h1>

                    <p className="text-gray-500 mt-2 mb-8">
                        Category-wise expense analysis
                    </p>

                    {/* Top Cards */}

                    <div className="grid md:grid-cols-3 gap-6 mb-8">

                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <FaWallet className="text-3xl text-[#6F4E37] mb-3" />

                            <h3 className="text-gray-500">
                                Total Expense
                            </h3>

                            <h1 className="text-3xl font-bold text-[#4A2C2A] mt-2">
                                ₹ {totalExpense.toFixed(2)}
                            </h1>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <FaChartPie className="text-3xl text-[#6F4E37] mb-3" />

                            <h3 className="text-gray-500">
                                Categories Used
                            </h3>

                            <h1 className="text-3xl font-bold text-[#4A2C2A] mt-2">
                                {totalCategories}
                            </h1>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <FaCrown className="text-3xl text-[#6F4E37] mb-3" />

                            <h3 className="text-gray-500">
                                Highest Spending
                            </h3>

                            <h1 className="text-2xl font-bold text-[#4A2C2A] mt-2">
                                {highestCategory}
                            </h1>

                            <p className="text-lg text-[#6F4E37]">
                                ₹ {highestAmount.toFixed(2)}
                            </p>
                        </div>

                    </div>

                    {/* Category Summary */}

                    {/* Expense Distribution */}

<div className="bg-white rounded-2xl shadow-lg p-8">

    <div className="flex items-center justify-between mb-8">

        <div>

            <h2 className="text-3xl font-bold text-[#4A2C2A]">
                Expense Distribution
            </h2>

            <p className="text-gray-500">
                Category-wise spending analysis
            </p>

        </div>

        <FaChartPie className="text-4xl text-[#6F4E37]" />

    </div>

    {loading ? (

        <p>Loading...</p>

    ) : Object.keys(categoryTotals).length === 0 ? (

        <p>No Expenses Found</p>

    ) : (

        <div className="space-y-8">

            {Object.entries(categoryTotals)
                .sort((a, b) => b[1] - a[1])
                .map(([category, amount], index) => {

                    const percentage =
                        highestAmount === 0
                            ? 0
                            : (amount / highestAmount) * 100;

                    const colors = [
                        "from-[#4A2C2A] to-[#6F4E37]",
                        "from-[#5B3A29] to-[#7A5235]",
                        "from-[#6F4E37] to-[#8B5E3C]",
                        "from-[#8B5E3C] to-[#A47149]",
                        "from-[#A47149] to-[#B08968]",
                        "from-[#B08968] to-[#C6A27A]",
                        "from-[#C6A27A] to-[#D6B98C]",
                        "from-[#D6B98C] to-[#E6CFB3]",
                    ];

                    const color = colors[index % colors.length];

                    return (

                        <div key={category}>

                            <div className="flex justify-between items-center mb-3">

                                <div className="flex items-center gap-3">

                                    <div className="w-10 h-10 rounded-full bg-[#F3E8DB] flex items-center justify-center font-bold text-[#6F4E37]">

                                        {index + 1}

                                    </div>

                                    <div>

                                        <div className="flex items-center gap-2">

                                            <h3 className="text-lg font-semibold text-[#4A2C2A]">
                                                {category}
                                            </h3>

                                            {index === 0 && (
                                                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                                                    👑 Highest
                                                </span>
                                            )}

                                        </div>

                                        <p className="text-sm text-gray-500">
                                            {((amount / totalExpense) * 100).toFixed(1)}% of total spending
                                        </p>

                                    </div>

                                </div>

                                <span className="font-bold text-[#4A2C2A] text-lg">
                                    ₹ {amount.toFixed(2)}
                                </span>

                            </div>

                            <div className="w-full h-7 bg-[#EFE7DE] rounded-full overflow-hidden">

                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{
                                        duration: 1,
                                        delay: index * 0.15,
                                    }}
                                    className={`h-full rounded-full bg-gradient-to-r ${color} flex justify-end items-center pr-3 text-white font-semibold`}
                                >
                                    {percentage > 20 && `${percentage.toFixed(0)}%`}
                                </motion.div>

                            </div>

                        </div>

                    );

                })}

        </div>

    )}

</div>

                </div>

            </div>
        </>
    );
}

export default Summary;