import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = async (e) => {
    e.preventDefault();

    if (form.name.trim() === "" || form.password.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    const result = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(result)) {
      alert("Registration Successful");
      navigate("/");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 py-8 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl px-10 py-10">
          <h1 className="text-5xl font-bold text-center text-white">
            Create Account
          </h1>

          <p className="text-center text-gray-200 mt-2 mb-8">
            Manage your expenses beautifully.
          </p>

          <form onSubmit={validate} className="space-y-8 m-2.5">
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={form.name}
              onChange={handleChange}
              className="w-full h-12 px-5 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-[#B08968] transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full  h-12 px-5 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-[#B08968] transition "
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-2xl bg-[#6F4E37] hover:bg-[#5A3E2B] text-white font-semibold tracking-wide transition duration-300"
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </form>

          {error && (
            <p className="text-red-300 text-center mt-5">
              {error.message}
            </p>
          )}

          <p className="text-center text-gray-200 mt-8">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-[#F5D7B2] font-semibold hover:text-white transition"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;