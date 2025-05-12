import { motion } from "framer-motion";
import Login from "../pages/Login";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      style={{ position: "sticky", top: 0, zIndex: 50 }} 
      className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-400 shadow-md"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="text-2xl font-bold text-white tracking-wide cursor-pointer"
      >
        CRM Pro
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-white"
      >
        <Login />
      </motion.div>
    </motion.header>
  );
}
