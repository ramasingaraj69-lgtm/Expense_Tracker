import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveGoal } from "../redux/goalSlice";
import { motion } from "framer-motion";

function FinancialGoalModal({ open, onClose }) {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { goal, loading } = useSelector((state) => state.goal);

    const [formData, setFormData] = useState({
        monthly_income: "",
        monthly_saving_goal: "",
        yearly_saving_goal: "",
    });

    useEffect(() => {

        if (goal) {

            setFormData({

                monthly_income: goal.monthly_income,

                monthly_saving_goal: goal.monthly_saving_goal,

                yearly_saving_goal: goal.yearly_saving_goal,

            });

        }

    }, [goal]);

    if (!open) {
        return null;
    }

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await dispatch(
            saveGoal({

                ...formData,

                user_id: user.id,

            })
        );

        onClose();

    };

    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

            <motion.div

                initial={{ scale: 0.8, opacity: 0 }}

                animate={{ scale: 1, opacity: 1 }}

                className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8"

            >

                <h2 className="text-3xl font-bold text-[#4A2C2A] mb-6">

                    Financial Goal

                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>

                        <label className="font-semibold">

                            Monthly Income

                        </label>

                        <input

                            type="number"

                            name="monthly_income"

                            value={formData.monthly_income}

                            onChange={handleChange}

                            className="w-full border rounded-lg p-3 mt-2"

                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Monthly Saving Goal

                        </label>

                        <input

                            type="number"

                            name="monthly_saving_goal"

                            value={formData.monthly_saving_goal}

                            onChange={handleChange}

                            className="w-full border rounded-lg p-3 mt-2"

                        />

                    </div>

                    <div>

                        <label className="font-semibold">

                            Yearly Saving Goal

                        </label>

                        <input

                            type="number"

                            name="yearly_saving_goal"

                            value={formData.yearly_saving_goal}

                            onChange={handleChange}

                            className="w-full border rounded-lg p-3 mt-2"

                        />

                    </div>

                    <div className="flex gap-4">

                        <button

                            className="flex-1 bg-[#6F4E37] text-white py-3 rounded-xl"

                        >

                            {loading ? "Saving..." : "Save"}

                        </button>

                        <button

                            type="button"

                            onClick={onClose}

                            className="flex-1 bg-gray-500 text-white py-3 rounded-xl"

                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </motion.div>

        </div>

    );

}

export default FinancialGoalModal;