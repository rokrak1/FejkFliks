import { motion } from "framer-motion";
import { HomeIcon } from "../../assets/icons/icons";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.7 } }}
      className="fixed flex bottom-5 justify-around left-[calc(50%-100px)] p-1 glass w-[200px] rounded-xl"
    >
      <span onClick={() => navigate("/")}>
        <IconWrapper>
          <HomeIcon size={30} color={"white"} />
        </IconWrapper>
      </span>
    </motion.div>
  );
};

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    className="duration-200 cursor-pointer p-2 rounded-full hover:bg-gray-50/25 "
    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.9 }}
  >
    {children}
  </motion.div>
);

export default Navigation;
