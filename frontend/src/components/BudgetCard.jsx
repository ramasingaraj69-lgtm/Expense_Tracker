import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

function BudgetCard({
    budget,
    spent,
    onEdit,
    onDelete,
}) {

    const remaining = budget.budget - spent;

    const percentage =
        budget.budget === 0
            ? 0
            : (spent / budget.budget) * 100;

    let color = "bg-green-500";

    if (percentage >= 50 && percentage < 80) {
        color = "bg-yellow-500";
    }

    if (percentage >= 80 && percentage <= 100) {
        color = "bg-[#6F4E37]";
    }

    if (percentage > 100) {
        color = "bg-red-600";
    }

    const icons = {
        Food: "🍔",
        Travel: "✈️",
        Shopping: "🛍️",
        Bills: "💡",
        Health: "🏥",
        Education: "📚",
        Entertainment: "🎬",
        Other: "📦",
    };

    return (

        <motion.div

            whileHover={{
                y: -6,
                scale: 1.02,
            }}

            className="bg-white rounded-2xl shadow-lg p-6 border border-[#E5D6C6]"

        >

            <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold text-[#4A2C2A]">

                    {icons[budget.category]} {budget.category}

                </h2>

            </div>

            <div className="mt-5 space-y-2">

                <p>

                    <span className="font-semibold">
                        Budget :
                    </span>

                    ₹ {budget.budget}

                </p>

                <p>

                    <span className="font-semibold">
                        Spent :
                    </span>

                    ₹ {spent}

                </p>

                <p>

                    <span className="font-semibold">
                        Remaining :
                    </span>

                    ₹ {remaining}

                </p>

            </div>

            <div className="mt-5">

                <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                    <div
                        className={`${color} h-full`}
                        style={{
                            width:
                                percentage > 100
                                    ? "100%"
                                    : percentage + "%",
                        }}
                    />

                </div>

                <p className="text-sm text-right mt-2 text-gray-500">

                    {percentage.toFixed(0)}%

                </p>

            </div>

            <div className="flex gap-3 mt-6">

                <button

                    onClick={() => onEdit(budget)}

                    className="flex-1 bg-[#6F4E37] text-white py-2 rounded-lg hover:bg-[#5b3d2c]"

                >

                    <FaEdit className="inline mr-2" />

                    Edit

                </button>

                <button

                    onClick={() => onDelete(budget.id)}

                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"

                >

                    <FaTrash className="inline mr-2" />

                    Delete

                </button>

            </div>

        </motion.div>

    );

}

export default BudgetCard;