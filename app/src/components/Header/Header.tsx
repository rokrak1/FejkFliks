import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "../../assets/icons/icons";
import { useEffect, useRef, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { pathname } = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    if (isHovered && inputRef?.current) {
      inputRef.current?.focus();
    }
  }, [isHovered]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchValue = e.target.value;
    setSearchValue(searchValue);

    if (searchValue === "") {
      if (pathname !== "/") {
        navigation("/");
      }
    } else if (searchValue.length > 0) {
      navigation(
        {
          search: createSearchParams({ q: searchValue }).toString(),
          pathname: "/search",
        },
        { replace: searchValue.length > 0 }
      );
    }
  };

  return (
    <motion.div className="flex justify-between p-3 items-center rounded-full">
      <img src="/rak.png" alt="rak" className="glass w-16 rounded-full" />

      <motion.div
        onClick={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="glass p-3 rounded-full flex cursor-pointer items-center gap-x-2"
      >
        <SearchIcon size={22} color={"white"} />

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ width: 0, opacity: 0 }}
            >
              <input
                value={searchValue}
                onChange={onChangeSearch}
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-white pl-2"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Header;
