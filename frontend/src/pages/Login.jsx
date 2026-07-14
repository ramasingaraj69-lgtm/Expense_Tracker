import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState(false);
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
    "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80')",
}}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2D1B14]/70 via-[#4A2C2A]/45 to-[#6F4E37]/30"></div>

<div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-[#C89B5E]/20 blur-3xl animate-pulse"></div>

<div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-[#8B5E3C]/20 blur-3xl animate-pulse"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="glass-card rounded-[32px] border border-white/30 bg-white/15 px-10 py-10 shadow-2xl backdrop-blur-xl">
          <h1 className="text-center text-5xl font-bold text-white">
    Welcome Back 👋
</h1>

<p className="mt-2 text-center text-[#F5E9DA] text-lg">
    Track every rupee with elegance.
</p>
          <p className="text-center text-gray-200 mt-2 mb-8">
            Login to continue managing your expenses.</p>
          <form
            onSubmit={validate}
            className="space-y-6" transition={{
    duration: 0.8,
    ease: "easeOut",
}} >
            <div className="relative">
    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EADCC8]" />

    <input
        type="text"
        name="name"
        placeholder="Username"
        value={form.name}
        onChange={handleChange}
        className="w-full h-14 rounded-2xl border border-white/20 bg-white/15 pl-12 pr-4 text-black placeholder:text-[#EADCC8] focus:border-[#C89B5E] focus:ring-4 focus:ring-[#C89B5E]/20"
    />
</div>
           <div className="relative">

    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EADCC8]" />

    <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full h-14 rounded-2xl border border-white/20 bg-white/15 pl-12 pr-12 text-black placeholder:text-[#EADCC8] focus:border-[#C89B5E] focus:ring-4 focus:ring-[#C89B5E]/20"
    />

    <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#EADCC8]"
    >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>

</div>
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              disabled={loading}
              className="btn-brown w-full h-12 text-lg font-semibold">
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
              className="text-[#F8D49D] hover:text-white  font-semibold hover:text-white transition"
            > Register</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
export default Login;