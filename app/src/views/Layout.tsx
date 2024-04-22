import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import { motion } from "framer-motion";

export const Layout = () => {
  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <Outlet />
      <Navigation />
    </motion.div>
  );
};

export default Layout;
