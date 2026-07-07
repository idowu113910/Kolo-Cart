import { motion } from "framer-motion";

const KineticText = ({
  text,
  baseClass = "font-light text-[24px] text-gray-400 leading-[38px] special-heading w-[761.5px]",
}) => {
  const words = text.split(" ").filter(Boolean);

  const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.08 * i,
      },
    }),
  };

  const word = {
    hidden: { opacity: 0, y: 12, rotate: -6, skewY: "3deg", scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      skewY: "0deg",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
      },
    },
    hover: {
      scale: 1.04,
      y: -3,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    tap: { scale: 0.98, transition: { duration: 0.08 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`overflow-hidden ${baseClass}`}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={word}
          whileHover="hover"
          whileTap="tap"
          className="inline-block mr-2"
        >
          {w}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default KineticText;
