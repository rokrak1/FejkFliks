import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ErrorIcon } from "../../assets/icons/icons";

export const ErrorToast: React.FC<{ message: string; t: any }> = ({
  message,
  t,
}) => {
  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExitAnimation(true);
      setTimeout(() => toast.dismiss(t.id), 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [t.id]);

  const handleClick = () => {
    setExitAnimation(true);
    setTimeout(() => toast.dismiss(t.id), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={
        exitAnimation
          ? {
              opacity: 0,
              y: -50,
              transition: { type: "spring", stiffness: 100 },
            }
          : { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
      }
      transition={{ duration: 0.2 }}
      className="flex items-start gap-y-1 flex-col bg-[#353540] shadow-xl p-2 rounded-xl"
      onClick={handleClick}
    >
      <div className="flex gap-x-2 items-center">
        <ErrorIcon size={22} color="red" />
        <div className="text-xl">Error</div>
      </div>
      <div className="text-sm p-1">{message}</div>
    </motion.div>
  );
};
