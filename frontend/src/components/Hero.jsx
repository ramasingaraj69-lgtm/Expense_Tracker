import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaWallet,
  FaChartPie,
  FaMoneyBillWave,
} from "react-icons/fa";

function Hero() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#2D1B14]/70"></div>

      {/* Blur Circle */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-[#B08968]/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span className="inline-flex items-center rounded-full bg-[#D8C3A5]/20 border border-[#D8C3A5]/40 px-5 py-2 text-[#F8F4EF] font-medium backdrop-blur-md">
            ☕ Smart Expense Management
          </span>

          <h1 className="mt-8 text-5xl lg:text-7xl font-bold leading-tight text-white">

            Manage Your

            <span className="block text-[#D8C3A5]">

              Money Smartly

            </span>

          </h1>

          <p className="mt-8 text-lg text-[#EFE5DA] leading-9 max-w-xl">

            Track every expense, monitor your budget, analyze your
            spending habits, and build a healthier financial future
            with a beautifully designed Expense Tracker.

          </p>

          <div className="flex flex-wrap gap-5 mt-12">

            <Link to="/expenses">

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="flex items-center gap-3 rounded-2xl bg-[#6F4E37] px-8 py-4 text-white font-semibold shadow-xl hover:bg-[#5A3E2B]"
              >

                Open Dashboard

                <FaArrowRight />

              </motion.button>

            </Link>

            <button className="rounded-2xl border border-[#D8C3A5] bg-white/10 backdrop-blur-md px-8 py-4 text-white hover:bg-white/20 transition">

              Learn More

            </button>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >

          {/* Wallet Card */}

          <div className="glass-card w-[390px] p-8">

            <div className="flex justify-between items-center">

              <h2 className="text-white text-2xl font-bold">

                Expense Wallet

              </h2>

              <div className="w-14 h-14 rounded-2xl bg-[#6F4E37] flex justify-center items-center">

                <FaWallet className="text-white text-xl" />

              </div>

            </div>

            <div className="mt-10">

              <p className="text-[#E9DDCF]">

                Total Balance

              </p>

              <h1 className="text-5xl font-bold text-white mt-3">

                ₹42,560

              </h1>

            </div>

            <div className="grid grid-cols-2 gap-5 mt-10">

              <div className="rounded-2xl bg-[#F8F4EF] p-5">

                <FaMoneyBillWave className="text-green-600 text-2xl" />

                <p className="mt-4 text-[#6F4E37]">

                  Income

                </p>

                <h3 className="text-2xl font-bold text-[#2D1B14]">

                  ₹80,000

                </h3>

              </div>

              <div className="rounded-2xl bg-[#F8F4EF] p-5">

                <FaChartPie className="text-[#8B5E3C] text-2xl" />

                <p className="mt-4 text-[#6F4E37]">

                  Expense

                </p>

                <h3 className="text-2xl font-bold text-[#2D1B14]">

                  ₹37,440

                </h3>

              </div>

            </div>

          </div>

          {/* Floating Card */}

          <motion.div
            animate={{
              y: [-8, 8, -8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -left-10 top-16 glass-card px-6 py-5"
          >

            <p className="text-[#E9DDCF]">

              This Month

            </p>

            <h2 className="text-3xl font-bold text-white mt-2">

              ₹12,800

            </h2>

          </motion.div>

          <motion.div
            animate={{
              y: [8, -8, 8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute -right-10 bottom-16 glass-card px-6 py-5"
          >

            <p className="text-[#E9DDCF]">

              Savings

            </p>

            <h2 className="text-3xl font-bold text-[#D8C3A5] mt-2">

              ₹8,950

            </h2>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;