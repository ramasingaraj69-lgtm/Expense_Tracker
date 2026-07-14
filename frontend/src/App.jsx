import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/Addexpense";
import EditExpense from "./pages/Editexpense";
import Summary from "./pages/Summary";
import Budget from "./pages/Budget";
import Analysis from "./pages/Analysis";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expenses/add" element={<AddExpense />} />
<Route path="/expenses/edit/:id" element={<EditExpense />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/budget" element={<Budget />} />
        <Route path='/analysis' element={<Analysis/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
