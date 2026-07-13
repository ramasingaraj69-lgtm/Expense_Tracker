import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchExpenses } from "../redux/expenseSlice";
import Navbar from "../components/Navbar";
import BudgetCard from "../components/BudgetCard";
import AddBudgetModal from "../components/AddBudgetModal";
import EditBudgetModal from "../components/EditBudgetModal";

import {
    fetchBudgets,
    addBudget,
    updateBudget,
    deleteBudget,
} from "../redux/budgetSlice";

function Budget() {
    

    const dispatch = useDispatch();

    const { budgets, loading } = useSelector(
        (state) => state.budget
    );

    const { expenses } = useSelector(
        (state) => state.expense
    );

    const { user } = useSelector(
        (state) => state.auth
    );

    const [openAdd, setOpenAdd] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);

    const [selectedBudget, setSelectedBudget] = useState(null);

    useEffect(() => {

        if (user) {

            dispatch(fetchBudgets(user.id));
            dispatch(fetchExpenses(user.id));

        }

    }, [dispatch, user]);


    const saveBudget = (data) => {

        dispatch(addBudget({
            ...data,
            user_id: user.id,
        }));

    };

    const editBudget = (budget) => {

        setSelectedBudget(budget);

        setOpenEdit(true);

    };

    const updateBudgetData = (data) => {

        dispatch(updateBudget({

            id: data.id,

            budget: {

                category: data.category,

                budget: data.budget,

                user_id: user.id,

            },

        }));

    };

    const removeBudget = (id) => {

        Swal.fire({

            title: "Delete Budget?",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete",

        }).then((result) => {

            if (result.isConfirmed) {

                dispatch(deleteBudget(id));

            }

        });

    };

    return (

        <>

            <Navbar />

            <div className="min-h-screen bg-slate-100 p-8">

                <div className="max-w-7xl mx-auto">

                    <div className="flex justify-between items-center mb-10">

                        <div>

                            <h1 className="text-4xl font-bold text-[#4A2C2A]">

                                Category Budgets

                            </h1>

                            <p className="text-gray-500 mt-2">

                                Manage your spending limits

                            </p>

                        </div>

                        <button

                            onClick={() => setOpenAdd(true)}

                            className="bg-gradient-to-r from-[#6F4E37] to-[#4A2C2A] text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"

                        >

                            + Add Budget

                        </button>

                    </div>

                    {

                        loading ?

                        (

                            <h2 className="text-center text-xl">

                                Loading...

                            </h2>

                        )

                        :

                        budgets.length === 0 ?

                        (

                            <div className="bg-white rounded-xl p-10 text-center shadow">

                                <h2 className="text-2xl font-semibold text-[#4A2C2A]">

                                    No Budgets Added

                                </h2>

                            </div>

                        )

                        :

                        (

                            <div
                                className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-3
                                xl:grid-cols-4
                                gap-6"
                            >

                                {

                                    budgets.map((budget) => {

                                        const spent = expenses

                                            .filter((expense) =>
                                                expense.category === budget.category
                                            )

                                            .reduce((sum, expense) =>
                                                sum + Number(expense.amount), 0
                                            );

                                        return (

                                            <BudgetCard

                                                key={budget.id}

                                                budget={budget}

                                                spent={spent}

                                                onEdit={editBudget}

                                                onDelete={removeBudget}

                                            />

                                        );

                                    })

                                }

                            </div>

                        )

                    }

                </div>

            </div>

            <AddBudgetModal

                open={openAdd}

                onClose={() => setOpenAdd(false)}

                onSave={saveBudget}

            />

            <EditBudgetModal

                open={openEdit}

                budget={selectedBudget}

                onClose={() => setOpenEdit(false)}

                onUpdate={updateBudgetData}

            />

        </>

    );

}

export default Budget;