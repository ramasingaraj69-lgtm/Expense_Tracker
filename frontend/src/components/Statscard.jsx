import { motion } from "framer-motion";
import { FaArrowTrendUp } from "react-icons/fa6";

function StatsCard({
  title,
  value,
  color = "text-[#6F4E37]",
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-[#FDFBF8]/90
        backdrop-blur-lg
        border
        border-[#E5D6C6]
        p-7
        shadow-lg
        hover:shadow-2xl
        transition-all
      "
    >
      {/* Decorative Circle */}
      <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-[#D8C3A5]/30 blur-2xl"></div>

      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-[#8B6B56] uppercase">
            {title}
          </p>

          <h2 className={`mt-3 text-4xl font-bold ${color}`}>
            {value}
          </h2>
        </div>

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-[#8B5E3C]
            to-[#4A2C2A]
            shadow-lg
          "
        >
          <FaArrowTrendUp className="text-2xl text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export default StatsCard;