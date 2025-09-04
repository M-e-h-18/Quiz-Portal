import { motion } from "framer-motion";

export default function RouteTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(12px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="route-transition"
    >
      {children}
    </motion.div>
  );
}
