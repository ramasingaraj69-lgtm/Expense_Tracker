import { motion } from "framer-motion";

function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[#E5D6C6]
        bg-[#FDFBF8]/90
        backdrop-blur-xl
        p-8
        shadow-lg
        hover:shadow-2xl
      "
    >
      {/* Decorative Blur */}
      <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-[#D8C3A5]/30 blur-3xl"></div>

      {/* Icon */}
      <div
        className="
          relative
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-3xl
          bg-gradient-to-br
          from-[#8B5E3C]
          to-[#4A2C2A]
          text-white
          text-4xl
          shadow-lg
        "
      >
        {icon}
      </div>

      {/* Title */}
      <h2 className="relative mt-8 text-2xl font-bold text-[#2D1B14]">
        {title}
      </h2>

      {/* Description */}
      <p className="relative mt-4 leading-7 text-[#7B5E4A]">
        {description}
      </p>
    </motion.div>
  );
}

export default FeatureCard;