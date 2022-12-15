import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const MenuContainer = () => {
  const [filterValue, setFilterValue] = useState("chicken");
  const [{ foodItem }, dispatch] = useStateValue();

  return (
    <section className="w-full my-6" id="menu">
      {/* card */}
      <div className="w-full flex flex-col items-center justify-center">
        {/* heading */}
        <p className="relative text-2xl font-semibold capitalize text-headingColor before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Hot Dishes
        </p>

        {/* menu card */}
        <div
          className="w-full flex items-center justify-start lg:justify-center gap-8
           py-6  overflow-x-scroll scrollbar-none"
        >
          {categories &&
            categories.map((category) => (
              //menu card item
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filterValue === category.urlParamName
                    ? "bg-cartNumBg"
                    : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg`}
                onClick={() => setFilterValue(category.urlParamName)}
              >
                {/* inner circle */}
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filterValue === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  {/* food icon */}
                  <IoFastFood
                    className={`${
                      filterValue === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                {/* name */}
                <p
                  className={`text-sm ${
                    filterValue === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white `}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
          <RowContainer
            flag={true}
            data={foodItem?.filter((n) => n.category === filterValue)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
