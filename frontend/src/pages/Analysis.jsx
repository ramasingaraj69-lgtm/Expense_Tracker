import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import FinancialGoalModal from "../components/FinancialGoalModal";
import { fetchExpenses } from "../redux/expenseSlice";
import { fetchBudgets } from "../redux/budgetSlice";
import { fetchGoal } from "../redux/goalSlice";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line,
    Legend,
} from "recharts";
import {
    FaWallet,
    FaChartPie,
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaBullseye,
    FaMedal
} from "react-icons/fa6";

import { motion } from "framer-motion";
function Analysis() {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    const { expenses } = useSelector(state => state.expense);

    const { budgets } = useSelector(state => state.budget);

    const { goal } = useSelector(state => state.goal);

    const [showGoalModal, setShowGoalModal] = useState(false);

    const COLORS = ["#4A2C2A","#6F4E37","#8B5E3C","#A47149","#B08968","#C6A27A","#D8C3A5","#E8D8C4",];

    useEffect(() => {

        if(user){

            dispatch(fetchExpenses(user.id));

            dispatch(fetchBudgets(user.id));

            dispatch(fetchGoal(user.id));

        }

    },[dispatch,user]);
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"];

const currentMonth=new Date().getMonth();

const currentYear=new Date().getFullYear();

const[selectedMonth,setSelectedMonth]=useState(currentMonth);

const[selectedYear,setSelectedYear]=useState(currentYear);

const filteredExpenses=useMemo(()=>{

return expenses.filter(exp=>{

const d=new Date(exp.date);

return(

d.getMonth()===selectedMonth &&

d.getFullYear()===selectedYear

);

});

},[expenses,selectedMonth,selectedYear]);

const totalExpense=filteredExpenses.reduce(

(sum,item)=>sum+Number(item.amount),0);

const currentGoal = goal || {
    monthly_income: 0,
    monthly_saving: 0,
    yearly_income: 0,
    yearly_saving: 0,
};

const remainingMoney=currentGoal.monthly_income-totalExpense;

const actualSaving=remainingMoney>0?remainingMoney:0;

let health=100;

if(currentGoal.monthly_income>0){

    const ratio=(totalExpense/currentGoal.monthly_income)*100;
    health=Math.max(0,100-ratio);

}

const savingTarget = Number(currentGoal.monthly_saving_goal || 0);

const savingPercentage =
savingTarget === 0
    ? 0
    : Math.min(100, (actualSaving / savingTarget) * 100);

const categoryTotals={};

filteredExpenses.forEach(item=>{

if(!categoryTotals[item.category]){

    categoryTotals[item.category]=0;

}

categoryTotals[item.category]+=Number(item.amount);

});

const pieData=Object.keys(categoryTotals).map(key=>({name:key,value:categoryTotals[key]}));
const monthlyData=[];
for(let i=0;i<12;i++){
const total=expenses.filter(exp=>{ const d=new Date(exp.date);

return(

d.getMonth()===i &&

d.getFullYear()===selectedYear

);

})

.reduce(

(sum,e)=>sum+Number(e.amount),

0

);

monthlyData.push({

month:months[i].substring(0,3),

expense:total

});

}


const budgetProgress=

budgets.map(b=>{

const spent=filteredExpenses.filter(e=>e.category===b.category).reduce((sum,e)=>sum+Number(e.amount),0);

return{

...b,

spent,

remaining:

b.budget-spent,

percentage:

Math.min(100,(spent/b.budget)*100)

};

});


let highestCategory="-";

let highestAmount=0;

Object.entries(categoryTotals).forEach(([cat,amt])=>{

    if(amt>highestAmount){
        highestAmount=amt;
        highestCategory=cat;
        }
});


const incomeChart=[

{

name:"Income",

amount:currentGoal.monthly_income

},

{

name:"Expense",

amount:totalExpense

},

{

name:"Saving",

amount:currentGoal.monthly_income-totalExpense

}

];

let healthText="Excellent";

let healthColor="text-green-600";

if(health<80){

healthText="Good";

healthColor="text-yellow-600";

}

if(health<60){

healthText="Average";

healthColor="text-orange-600";

}

if(health<40){

healthText="Poor";

healthColor="text-red-600";

}

const badges=[];

if(health>=90){

badges.push("🏆 Excellent Planner");

}

if(actualSaving>=currentGoal.monthly_saving){

badges.push("💰 Saving Goal Achieved");

}

if(budgetProgress.every(x=>x.percentage<=100)){

badges.push("🎯 Budget Master");

}

if(Object.keys(categoryTotals).length>=5){

badges.push("📊 Diverse Tracking");

}
const insights=[];

if(health>80){

insights.push("Excellent financial health.");

}

if(actualSaving>=currentGoal.monthly_saving){

insights.push("Monthly saving goal achieved.");

}

if(actualSaving<currentGoal.monthly_saving){

insights.push("You need to save more this month.");

}

budgetProgress.forEach(item=>{

if(item.percentage>100){

insights.push(`${item.category} exceeded its budget.`);

}

else if(item.percentage>80){

insights.push(`${item.category} budget is almost full.`);

}

});

if(highestCategory!=="-"){

insights.push(

`${highestCategory} is your highest spending category.`

);

}

return(

<>

<Navbar/>

<div className="min-h-screen bg-[#F8F4EF]">

<div className="max-w-7xl mx-auto p-8">

<div className="flex justify-between items-center">

<div>

<h1 className="text-4xl font-bold text-[#4A2C2A]">

Expense Analysis

</h1>

<p className="text-gray-500 mt-2">

Complete financial insights

</p>

</div>

<div className="flex justify-end mt-4">

<motion.button
    whileHover={{
        scale: 1.05,
        y: -3,
    }}
    whileTap={{
        scale: 0.95,
    }}
    onClick={() => {
        console.log("Button Clicked");
        setShowGoalModal(true);
    }}
    className="bg-[#6F4E37] hover:bg-[#4A2C2A] text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
>
    ⚙️ Set Financial Goal
</motion.button>

</div>

</div>
<div className="flex overflow-x-auto gap-3 mt-8 pb-2">

{months.map((month,index)=>(

<button

key={month}

onClick={()=>setSelectedMonth(index)}

className={`

px-5

py-2

rounded-full

whitespace-nowrap

transition

${

selectedMonth===index

?

"bg-[#6F4E37] text-white"

:

"bg-white"

}

`}

>

{month}

</button>

))}

</div>
<div className="mt-5">

<select

value={selectedYear}

onChange={(e)=>

setSelectedYear(

Number(e.target.value)

)

}

className="border rounded-lg p-3"

>

<option>

2025

</option>

<option>

2026

</option>

<option>

2027

</option>

</select>

</div>
<div className="grid md:grid-cols-4 gap-6 mt-8">

<motion.div

whileHover={{y:-5}}

className="bg-white rounded-2xl p-6 shadow"

>

<FaWallet

className="text-3xl text-[#6F4E37]"

/>

<p className="mt-3 text-gray-500">

Expense

</p>

<h1 className="text-3xl font-bold">

₹{totalExpense.toFixed(2)}

</h1>

</motion.div>
<motion.div

whileHover={{y:-5}}

className="bg-white rounded-2xl p-6 shadow"

>

<FaArrowTrendUp

className="text-3xl text-green-600"

/>

<p className="mt-3">

Income

</p>

<h1 className="text-3xl font-bold">

₹{currentGoal.monthly_income}

</h1>

</motion.div>

<motion.div

whileHover={{y:-5}}

className="bg-white rounded-2xl p-6 shadow"

>

<FaBullseye

className="text-3xl text-blue-600"

/>

<p>

Remaining

</p>

<h1 className="text-3xl font-bold">

₹{remainingMoney}

</h1>

</motion.div>
<motion.div

whileHover={{y:-5}}

className="bg-white rounded-2xl p-6 shadow"

>

<FaMedal

className="text-3xl text-yellow-500"

/>

<p>

Health Score

</p>

<h1 className={`

text-4xl

font-bold

${healthColor}

`}>

{health.toFixed(0)}

</h1>

<p>

{healthText}

</p>

</motion.div>

</div>
<div className="grid lg:grid-cols-2 gap-8 mt-10">

<motion.div

initial={{opacity:0,y:40}}

animate={{opacity:1,y:0}}

className="bg-white rounded-3xl shadow-xl p-6"

>

<h2 className="text-2xl font-bold text-[#4A2C2A] mb-6">

Expense Distribution

</h2>

<div className="h-96">

<ResponsiveContainer>

<PieChart>

<Pie

data={pieData}

dataKey="value"

nameKey="name"

outerRadius={130}

innerRadius={70}

animationDuration={1800}

label

>

{

pieData.map((entry,index)=>(

<Cell

key={index}

fill={COLORS[index%COLORS.length]}

/>

))

}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

</motion.div>
<motion.div

initial={{opacity:0,y:40}}

animate={{opacity:1,y:0}}

transition={{delay:.2}}

className="bg-white rounded-3xl shadow-xl p-6"

>

<h2 className="text-2xl font-bold text-[#4A2C2A] mb-6">

Monthly Spending

</h2>

<div className="h-96">

<ResponsiveContainer>

<BarChart

data={monthlyData}

>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Legend/>

<Bar

dataKey="expense"

radius={[10,10,0,0]}

animationDuration={2000}

fill="#6F4E37"

/>

</BarChart>

</ResponsiveContainer>

</div>

</motion.div>

</div>
<motion.div

initial={{opacity:0,y:40}}

animate={{opacity:1,y:0}}

transition={{delay:.4}}

className="bg-white rounded-3xl shadow-xl p-8 mt-10"

>

<h2 className="text-2xl font-bold text-[#4A2C2A] mb-6">

Expense Trend

</h2>

<div className="h-96">

<ResponsiveContainer>

<LineChart

data={monthlyData}

>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Legend/>

<Line

type="monotone"

dataKey="expense"

stroke="#4A2C2A"

strokeWidth={4}

dot={{r:6}}

animationDuration={2200}

/>

</LineChart>

</ResponsiveContainer>

</div>

</motion.div>
<motion.div

initial={{opacity:0}}

animate={{opacity:1}}

className="bg-white rounded-3xl shadow-xl p-8 mt-10"

>

<h2 className="text-2xl font-bold text-[#4A2C2A] mb-6">

Income vs Expense

</h2>

<div className="h-96">

<ResponsiveContainer>

<BarChart

data={incomeChart}

>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar

dataKey="amount"

radius={[10,10,0,0]}

fill="#8B5E3C"

/>

</BarChart>

</ResponsiveContainer>

</div>

</motion.div>
<motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-3xl shadow-xl p-8 mt-10"
>
    <h2 className="text-2xl font-bold text-[#4A2C2A] mb-8">
        Budget Utilization
    </h2>

    <div className="space-y-6">

        {budgetProgress.map((item,index)=>(

            <div key={index}>

                <div className="flex justify-between mb-2">

                    <div>

                        <h3 className="font-semibold text-lg">
                            {item.category}
                        </h3>

                        <p className="text-sm text-gray-500">
                            ₹{item.spent.toFixed(2)} / ₹{item.budget}
                        </p>

                    </div>

                    <span className="font-bold">
                        {item.percentage.toFixed(0)}%
                    </span>

                </div>

                <div className="w-full h-5 rounded-full bg-[#EEE3D7] overflow-hidden">

                    <motion.div
                        initial={{ width:0 }}
                        animate={{ width:`${item.percentage}%` }}
                        transition={{ duration:1.2 }}
                        className={`h-full rounded-full ${
                            item.percentage>100
                            ? "bg-red-500"
                            : item.percentage>80
                            ? "bg-yellow-500"
                            : "bg-[#6F4E37]"
                        }`}
                    />

                </div>

            </div>

        ))}

    </div>

</motion.div>
<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="bg-white rounded-3xl shadow-xl p-8 mt-10"
>

<h2 className="text-2xl font-bold text-[#4A2C2A] mb-8">

Top Spending Categories

</h2>

<div className="space-y-5">

{Object.entries(categoryTotals)

.sort((a,b)=>b[1]-a[1])

.slice(0,5)

.map(([cat,amt],index)=>(

<div
key={cat}
className="flex justify-between items-center border-b pb-3"
>

<div className="flex gap-4 items-center">

<div className="w-10 h-10 rounded-full bg-[#6F4E37] text-white flex items-center justify-center">

#{index+1}

</div>

<div>

<h3 className="font-semibold">

{cat}

</h3>

</div>

</div>

<div className="font-bold">

₹{amt.toFixed(2)}

</div>

</div>

))}

</div>

</motion.div>
<motion.div
className="bg-white rounded-3xl shadow-xl p-8 mt-10"
>

<h2 className="text-2xl font-bold text-[#4A2C2A] mb-6">

Smart Insights

</h2>

<div className="space-y-4">

{insights.map((item,index)=>(

<motion.div

key={index}

initial={{opacity:0,x:-30}}

animate={{opacity:1,x:0}}

transition={{delay:index*.15}}

className="p-4 rounded-xl bg-[#F8F4EF] border-l-4 border-[#6F4E37]"

>

{item}

</motion.div>

))}

</div>

</motion.div>
<motion.div
className="bg-white rounded-3xl shadow-xl p-8 mt-10"
>

<h2 className="text-2xl font-bold mb-6">

Savings Goal

</h2>

<div className="flex justify-between">

<span>

Target

₹{currentGoal.monthly_saving_goal}

</span>

<span>

Saved

₹{actualSaving}

</span>

</div>

<div className="mt-4 h-6 rounded-full bg-[#EEE3D7] overflow-hidden">

<motion.div

initial={{width:0}}

animate={{width:`${savingPercentage}%`}}

transition={{duration:1}}

className="h-full bg-green-600"

>

</motion.div>

</div>

<p className="mt-3 font-semibold">

{savingPercentage.toFixed(0)}%

Completed

</p>

</motion.div>
<motion.div
className="bg-white rounded-3xl shadow-xl p-8 mt-10 mb-16"
>

<h2 className="text-2xl font-bold mb-6">

Achievements

</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

{badges.map((b,index)=>(

<motion.div

key={index}

whileHover={{

scale:1.08,

rotate:-2

}}

className="rounded-2xl bg-gradient-to-r from-[#6F4E37] to-[#4A2C2A] text-white p-6 text-center shadow-lg"

>

<div className="text-4xl">

{b.split(" ")[0]}

</div>

<div className="mt-3">

{b.substring(2)}

</div>

</motion.div>

))}

</div>

</motion.div>


<FinancialGoalModal
    open={showGoalModal}
    onClose={() => setShowGoalModal(false)}
/>


</div>

</div>

</>

);

}

export default Analysis;