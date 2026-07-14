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
<div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9]/95 via-[#F8F4EF]/90 to-[#EFE4D2]/95 backdrop-blur-[2px]"></div>
            <div
    className="relative min-h-screen overflow-hidden bg-cover bg-center bg-fixed"
    style={{
        backgroundImage:
            "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=80')",
    }}
>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-12">

                        <div>

                            <h1 className="text-5xl font-bold text-[#f1c0bc]">

                                Category Budgets

                            </h1>

                            <p className="mt-3 max-w-xl text-lg text-[#7B5E4A]">

                                Manage your spending limits

                            </p>

                        </div>

                        <button

                            onClick={() => setOpenAdd(true)}

                            className="
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
hover:-translate-y-1
hover:scale-105
hover:shadow-2xl
"

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

                            <div className="rounded-[30px] border border-[#E7D8C7] bg-white/80 p-16 text-center shadow-2xl backdrop-blur-xl">

                                <h2 className="text-3xl font-bold text-[#4A2C2A]">

                                    No Budgets Added

                                </h2>
                                <p className="mt-4 text-[#8B6B56]">
Create your first category budget and start tracking your spending intelligently.
</p>

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
gap-8
"
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