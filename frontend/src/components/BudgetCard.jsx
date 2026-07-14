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

            className="
relative
overflow-hidden
rounded-[28px]
border
border-[#E7D8C7]
bg-gradient-to-br
from-[#FFFDF9]
via-[#FCF7F1]
to-[#F5EEE4]
p-7
shadow-[0_20px_50px_rgba(74,44,42,.12)]
backdrop-blur-xl
transition-all
duration-500
hover:-translate-y-2
hover:shadow-[0_30px_70px_rgba(74,44,42,.18)]
"

        >
<div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#D9B382]/20 blur-3xl"></div>

<div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#8B5E3C]/10 blur-2xl"></div>
            <div className="relative flex items-center justify-between">

                <h2 className="text-3xl font-bold tracking-wide text-[#3F291F]">

                    {icons[budget.category]} {budget.category}
                    <p className="mt-2 inline-flex rounded-full bg-[#F3E5D4] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#8B5E3C]">
    Monthly Budget
</p>

                </h2>

            </div>

            <div className="relative mt-8 space-y-4 rounded-2xl bg-white/70 p-5 backdrop-blur-sm">

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

                <div className="mt-6 h-4 overflow-hidden rounded-full bg-[#E9DDD0]">

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

            <div className="relative mt-8 flex gap-4">

                <button

                    onClick={() => onEdit(budget)}

                    className="
flex-1
rounded-2xl
bg-gradient-to-r
from-[#8B5E3C]
via-[#6F4E37]
to-[#4A2C2A]
py-3
font-semibold
text-white
shadow-lg
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
"

                >

                    <FaEdit className="inline mr-2" />

                    Edit

                </button>

                <button

                    onClick={() => onDelete(budget.id)}

                    className="
flex-1
rounded-2xl
bg-gradient-to-r
from-red-500
to-red-700
py-3
font-semibold
text-white
shadow-lg
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
"

                >

                    <FaTrash className="inline mr-2" />

                    Delete

                </button>

            </div>

        </motion.div>

    );

}

export default BudgetCard;