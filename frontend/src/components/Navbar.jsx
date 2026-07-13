import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaWallet, FaSignOutAlt,FaBars,
  FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { logout } from "../redux/authSlice";
import { FaChartLine } from "react-icons/fa";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const active =
    "text-[#6F4E37] font-semibold border-b-2 border-[#6F4E37] pb-1";

  const normal =
    "text-[#5E4636] hover:text-[#6F4E37] transition duration-300";

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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#F8F4EF]/80 border-b border-[#D8C3A5] shadow-md">

      <div className="max-w-7xl mx-auto h-20 px-6 lg:px-10 flex items-center justify-between">

        {/* Logo */}

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5E3C] to-[#4A2C2A] text-white flex items-center justify-center text-xl shadow-lg">
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
            Home
          </NavLink>

          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              isActive ? active : normal
            }
          >
            Expenses
          </NavLink>
          <NavLink
    to="/budget"
    className={({ isActive }) =>
        isActive ? active : normal
    }
>
    Budget
</NavLink>
<NavLink
    to="/analysis"
    className={({ isActive }) =>
        isActive ? active : normal
    }
>
    Analysis
</NavLink>
       <NavLink
    to="/summary"
    className={({ isActive }) =>
        isActive ? active : normal
    }
>
    Summary
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

            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5E3C] to-[#4A2C2A] flex items-center justify-center text-white text-lg font-bold shadow-lg border-2 border-[#D8C3A5]">
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
            className="flex items-center gap-2 bg-gradient-to-r from-[#6F4E37] to-[#4A2C2A] text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition"
          >
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
   

    <div className="border-t"></div>

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
        className="w-full text-left px-6 py-4 text-red-600 hover:bg-red-50"
    >
        Logout
    </button>

</motion.div>

)}
    </header>
  );
}

export default Navbar;