import { useEffect, useState } from "react";
import { useAuth } from "../store/AuthProvider";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    await signIn(email, password);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="glass p-5 rounded-xl flex flex-col w-full max-w-[500px] ">
          <img
            src="rak.png"
            alt="logo"
            className="w-20 h-20 mb-5 rounded-full self-center"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-5 rounded-xl text-white  border border-gray-500/50 outline-none focus:border-gray-500 focus:shadow-lg duration-300 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-5 rounded-xl text-white  border border-gray-500/50 outline-none focus:border-gray-500 focus:shadow-lg duration-300 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(0,0,0,0.1)",
              transition: { duration: 0.2, delay: 0 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="w-full p-2 bg-gray-500/50 text-white rounded-xl "
          >
            Login
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
