import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function CTA() {
  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#6F4E37] via-[#8B5E3C] to-[#4A2C2A] py-20 px-8 text-white shadow-2xl">

      {/* Decorative Background */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#D8C3A5]/20 blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Take Control of
          <span className="block text-[#F6E7D8]">
            Your Finances
          </span>
        </h2>

        <p className="mt-6 text-lg text-[#F5E8DD] leading-8">
          Monitor every expense, discover spending patterns, and
          build smarter financial habits with your personal
          expense tracker.
        </p>

        <Link to="/expenses">
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-[#F8F4EF] px-8 py-4 text-lg font-semibold text-[#4A2C2A] shadow-xl transition hover:bg-white"
          >
            Open Dashboard
            <FaArrowRight />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

export default CTA;