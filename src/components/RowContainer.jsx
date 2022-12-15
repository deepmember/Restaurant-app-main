import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  // console.log(data);
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = () => {
    // console.log(item);

    dispatch({
      type: actionType.SET_CART_ITEM,
      cartItems: items,
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div
      ref={rowContainer}
      className={` w-full my-12 flex items-center gap-3 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none overflow-y-hidden"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          //food card
          <div
            key={item.id}
            className="w-300 md:w-340 min-w-[300px] md:min-w-[340px] h-auto my-12 bg-cardOverlay rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between"
          >
            {/* left side */}
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-44 h-44 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className=" w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={() => setItems([...cartItems, item])}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            {/* right side */}
            <div className="w-full flex flex-col items-end justify-end">
              {/* name of the dish */}
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              {/* calories */}
              <p className="mt-1 text-sm text-gray-500"> {item?.calories}</p>
              {/* price */}
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor ">
                  <span>$</span> {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex items-center justify-center">
          <img src={NotFound} alt="not found svg" className="h-340" />
          <p className=" text-xl text-headingColor font-semibold my-2 ">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
