import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

  const [total, setTotal] = useState(0);
  const [flag, setFlag] = useState(1);

  // toggle the cart
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  // calculating total value
  useEffect(() => {
    // inital value of accumulator = 0
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price; //gets added to accumulator
    }, 0);

    setTotal(totalPrice);
    console.log(total);
  }, [total, flag]);

  // clear the cart
  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEM,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      {/* back option */}
      <div
        className="w-full flex items-center justify-between p-4 cursor-pointer
        "
      >
        {/* back icon */}
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        {/* cart heading */}
        <p className="text-lg text-textColor font-semibold">Cart</p>

        {/* cart button */}
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2   rounded-md bg-gray-100 hover:shadow-md cursor-pointer text-base text-textColor"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />{" "}
        </motion.p>
      </div>

      {/*  bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 gap-3 flex flex-col overflow-y-scroll scrollbar-none">
            {/* cart item */}
            {cartItems &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  flag={flag}
                  setFlag={setFlag}
                />
              ))}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            {/* sub total amount section */}
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {total}</p>
            </div>
            {/* delivery amount section */}
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>

            {/* divider */}
            <div className="w-full border-b  border-gray-600 my-2"></div>

            {/* total amount */}
            <div className="w-full flex items-center justify-between">
              <p className="text-xl text-gray-200 font-semibold">Total</p>
              <p className="text-xl text-gray-200 font-semibold">
                ${total + 2.5}
              </p>
            </div>

            {/* button */}
            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-200 text-lg my-2 hover:shadow-lg "
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-200 text-lg my-2 hover:shadow-lg "
              >
                Login to Check Out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} alt="empty cart svg" className="w-360 p-4" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
