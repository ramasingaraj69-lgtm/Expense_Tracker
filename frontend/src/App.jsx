import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/Addexpense";
import EditExpense from "./pages/Editexpense";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
