import { useState } from "react";
import { motion } from "framer-motion";

function AddBudgetModal({ open, onClose, onSave }) {

    const [formData, setFormData] = useState({
        category: "Food",
        budget: "",
    });

    const categories = [
        "Food",
        "Travel",
        "Shopping",
        "Bills",
        "Health",
        "Education",
        "Entertainment",
        "Other",
    ];

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        onSave(formData);

        setFormData({
            category: "Food",
            budget: "",
        });

        onClose();
    };

    return (

        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.8,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                exit={{
                    opacity: 0,
                    scale: 0.8,
                }}
                transition={{
                    duration: 0.25,
                }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8"
            >

                <h2 className="text-3xl font-bold text-center text-[#4A2C2A] mb-8">

                    Add Category Budget

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div>

                        <label className="block font-semibold mb-3">

                            Category

                        </label>

                        <div className="grid grid-cols-2 gap-3">

                            {categories.map((item) => (

                                <label
                                    key={item}
                                    className={`cursor-pointer rounded-lg border p-3 text-center transition
                                    ${
                                        formData.category === item
                                            ? "bg-[#6F4E37] text-white border-[#6F4E37]"
                                            : "border-gray-300 hover:border-[#6F4E37]"
                                    }`}
                                >

                                    <input
                                        type="radio"
                                        value={item}
                                        name="category"
                                        checked={formData.category === item}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                category: e.target.value,
                                            })
                                        }
                                        className="hidden"
                                    />

                                    {item}

                                </label>

                            ))}

                        </div>

                    </div>

                    <div>

                        <label className="block font-semibold mb-2">

                            Budget Amount

                        </label>

                        <input
                            type="number"
                            value={formData.budget}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    budget: e.target.value,
                                })
                            }
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#6F4E37]"
                            placeholder="Enter Budget"
                        />

                    </div>

                    <div className="flex gap-4">

                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-[#6F4E37] to-[#4A2C2A] text-white py-3 rounded-xl"
                        >

                            Save

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

export default AddBudgetModal;