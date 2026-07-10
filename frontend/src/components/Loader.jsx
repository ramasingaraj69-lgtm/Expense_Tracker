import { motion } from "framer-motion";

function Loader() {
  const dots = [0, 1, 2];

  return (
    <div className="flex items-center justify-center gap-3 py-16">
      {dots.map((dot) => (
        <motion.div
          key={dot}
          className="h-4 w-4 rounded-full bg-[#6F4E37]"
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: dot * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export default Loader;