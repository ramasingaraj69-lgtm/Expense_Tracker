import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaWallet,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaMoneyBillWave,
  FaPiggyBank,
  FaChartPie,
  FaClipboardList,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { logout } from "../redux/authSlice";
import { FaChartLine } from "react-icons/fa";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const active ="relative font-semibold text-[#4A2C2A] after:absolute after:left-0 after:-bottom-1 after:h-[3px] after:w-full after:rounded-full after:bg-[#C89B5E]";

  const normal ="relative text-[#5E4636] font-medium transition-all duration-300 hover:text-[#6F4E37] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#C89B5E] after:transition-all after:duration-300 hover:after:w-full";

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6F4E37",
      cancelButtonColor: "#9CA3AF",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());

        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been logged out successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8C5AE]/50 bg-[#FFF9F2]/80 backdrop-blur-2xl shadow-[0_8px_30px_rgba(74,44,42,.08)]">

      <div className="max-w-[1400px] mx-auto h-20 px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}

        <motion.div
          whileHover={{scale: 1.05,rotate: -2,}}
          className="flex items-center gap-4"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#C89B5E] via-[#8B5E3C] to-[#4A2C2A] text-2xl text-white shadow-xl">
            <FaWallet />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#2D1B14]">
              Expense Tracker
            </h1>

            <p className="text-xs text-[#8B6B56] tracking-wide">
              Smart Finance
            </p>
          </div>
        </motion.div>

        {/* Navigation */}

        <nav className="hidden md:flex items-center gap-10 font-medium">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? active : normal
            }
          >
            <span className="flex items-center gap-2">
    <FaHome />
    Home
</span>
          </NavLink>

          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              isActive ? active : normal
            }
          >
            <span className="flex items-center gap-2">
    <FaMoneyBillWave />
    Expenses
</span>
          </NavLink>
          <NavLink
    to="/budget"
    className={({ isActive }) =>
        isActive ? active : normal
    }
>
    <span className="flex items-center gap-2">
    <FaPiggyBank />
    Budget
</span>
</NavLink>
<NavLink
    to="/analysis"
    className={({ isActive }) =>
        isActive ? active : normal
    }
>
    <span className="flex items-center gap-2">
    <FaChartPie />
    Analysis
</span>
</NavLink>
       <NavLink
    to="/summary"
    className={({ isActive }) =>
        isActive ? active : normal
    }
>
    <span className="flex items-center gap-2">
    <FaClipboardList />
    Summary
</span>
</NavLink>


        </nav>
        <div className="md:hidden">

  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="text-[#4A2C2A] text-2xl"
  >
    {menuOpen ? <FaTimes /> : <FaBars />}
  </button>

</div>

        {/* User + Logout */}

       <div className="hidden md:flex items-center gap-5">

          <motion.div
            whileHover={{ scale: 1.04 }}
            className="flex items-center gap-4"
          >

            <div className="hidden md:block text-right">

              <p className="font-semibold text-[#2D1B14]">
                {user ? user.name : "Guest"}
              </p>

              <p className="text-xs text-[#8B6B56]">
                Welcome Back 👋
              </p>

            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#F5E7D0] bg-gradient-to-br from-[#C89B5E] to-[#6F4E37] text-lg font-bold text-white shadow-xl">
              {user
                ? user.name.charAt(0).toUpperCase()
                : "G"}
            </div>

          </motion.div>

          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-[#6F4E37] to-[#4A2C2A] text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition">
                   <FaSignOutAlt />
            <span className="hidden lg:block">
              Logout
            </span>
          </motion.button>

        </div>

      </div>
{menuOpen && (

<motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="md:hidden bg-white border-t border-[#D8C3A5] shadow-lg"
>

    <NavLink
        to="/home"
        onClick={() => setMenuOpen(false)}
        className="block px-6 py-4 hover:bg-[#F7F3EF]"
    >
        Home
    </NavLink>

    <NavLink
        to="/expenses"
        onClick={() => setMenuOpen(false)}
        className="block px-6 py-4 hover:bg-[#F7F3EF]"
    >
        Expenses
    </NavLink>
<NavLink
    to="/budget"
    onClick={() => setMenuOpen(false)}
    className="block px-6 py-4 hover:bg-[#F7F3EF]"
>
    Budget
</NavLink>
<NavLink to='/analysis' onClick={()=> setMenuOpen(false)} className="block px-6 py-4 hover:bg-[#F7F3EF]">Financial Analysis</NavLink>

    <NavLink
        to="/summary"
        onClick={() => setMenuOpen(false)}
        className="block px-6 py-4 hover:bg-[#F7F3EF]"
    >
        Summary
    </NavLink>
   

    <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></div>

    <div className="px-6 py-4">

        <p className="font-semibold text-[#4A2C2A]">
            {user?.name}
        </p>

        <p className="text-sm text-gray-500">
            Welcome Back 👋
        </p>

    </div>

    <button
        onClick={() => {
            setMenuOpen(false);
            handleLogout();
        }}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#8B5E3C] via-[#6F4E37] to-[#4A2C2A] px-6 py-3 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
        Logout
    </button>

</motion.div>

)}
    </header>
  );
}

export default Navbar;