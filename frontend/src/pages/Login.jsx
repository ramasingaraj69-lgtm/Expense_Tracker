import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector(
    (state) => state.auth
  );

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

  const validate = (e) => {
    e.preventDefault();

    if (
      form.name.trim() === "" ||
      form.password.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-6 py-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="glass-card px-10 py-10">

          <h1 className="text-5xl text-center text-white font-bold">
            Welcome Back
          </h1>

          <p className="text-center text-gray-200 mt-2 mb-8">
            Login to continue managing your expenses.
          </p>

          <form
            onSubmit={validate}
            className="space-y-6"
          >
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={form.name}
              onChange={handleChange}
              className="w-full h-12 px-5 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B08968]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full h-12 px-5 rounded-2xl bg-white/20 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B08968]"
            />

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              disabled={loading}
              className="btn-brown w-full h-12 text-lg font-semibold"
            >
              {loading ? "Logging In..." : "Login"}
            </motion.button>
          </form>

          {error && (
            <p className="text-red-300 text-center mt-5">
              {error.message}
            </p>
          )}

          <p className="text-center text-gray-200 mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#F5D7B2] font-semibold hover:text-white transition"
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;