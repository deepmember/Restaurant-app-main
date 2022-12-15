import React, { useState } from "react";
import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import {
  MdShoppingCart,
  MdAdd,
  MdLogout,
  MdOutlineRestaurantMenu,
  MdOutlineRoomService,
} from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { app } from "../firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const Header = () => {
  // login authentication
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    // const response = await signInWithPopup(firebaseAuth, provider);
    // console.log(response);

    if (!user) {
      const {
        user: { providerData, refreshToken },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  // user logout
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <div>
      <header className="fixed z-50 w-screen p-3 px-4 md:py-6 md:px-16 bg-primary">
        {/* desktop & tablet */}
        <div className="hidden md:flex w-full h-full items-center justify-between">
          {/* logo + brand */}
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="logo" className="w-8 object-cover" />
            <p className="text-xl text-headingColor font-bold">City</p>
          </Link>

          {/* menu items */}
          <div className="flex items-center gap-8">
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex items-center gap-8"
            >
              <li className="text-lg text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
                Home
              </li>
              <li className="text-lg text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
                Menu
              </li>
              <li className="text-lg text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
                About Us
              </li>
              <li className="text-lg text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
                Service
              </li>
            </motion.ul>

            {/* cart */}
            <div
              onClick={showCart}
              className="relative flex items-center justify-center "
            >
              <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
              {cartItems && cartItems.length > 0 && (
                <div className="absolute -top-2 -right-2 flex items-center justify-center rounded-full bg-cartNumBg w-4 h-4">
                  <p className="text-xs text-white font-semibold">
                    {cartItems.length}
                  </p>
                </div>
              )}
            </div>

            {/* avatar */}
            <div className="relative">
              {/* profile pic */}
              <motion.img
                onClick={login}
                whileTap={{ scale: 0.6 }}
                src={user ? user.photoURL : Avatar}
                referrerPolicy="no-referrer"
                alt="profile"
                className="w-10 min-w-[40px] h-10 min-h-[40px] rounded-full drop-shadow-xl cursor-pointer"
              />

              {/* dropdown */}
              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="w-36 absolute top-12 right-0 flex flex-col bg-gray-100 shadow-xl rounded-xl"
                >
                  {user && user.email === "abhipsha.patro63@gmail.com" && (
                    <Link to="/createItem">
                      <p
                        onClick={() => setIsMenu(false)}
                        className="px-4 py-2 flex items-center justify-between cursor-pointer text-base hover:bg-slate-200 rounded-t-xl transition-all duration-100 ease-in-out text-textColor"
                      >
                        New Item <MdAdd />
                      </p>
                    </Link>
                  )}

                  <p
                    onClick={logout}
                    className="px-4 py-2 flex items-center justify-between cursor-pointer text-base hover:bg-slate-200 rounded-b-xl transition-all duration-100 ease-in-out text-textColor"
                  >
                    Logout <MdLogout />
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="flex items-center justify-between md:hidden w-full h-full">
          {/* logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={Logo} alt="logo" className="w-8 object-cover" />
            <p className="text-xl text-headingColor font-bold">City</p>
          </Link>

          {/* avatar */}
          <div className="relative flex gap-8 items-center">
            {/* cart */}
            <div
              onClick={showCart}
              className="relative flex items-center justify-center "
            >
              <MdShoppingCart className="text-textColor text-xl cursor-pointer" />
              {cartItems && cartItems.length > 0 && (
                <div className="absolute -top-2 -right-2 flex items-center justify-center rounded-full bg-cartNumBg w-3 h-3">
                  <p className="text-[10px] text-white font-medium">2</p>
                </div>
              )}
            </div>
            {/* profile pic */}
            <motion.img
              onClick={login}
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              referrerPolicy="no-referrer"
              alt="profile"
              className="w-10 min-w-[40px] h-10 min-h-[40px] rounded-full drop-shadow-xl cursor-pointer"
            />

            {/* dropdown */}
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-36 absolute top-12 right-0 flex flex-col bg-gray-100 shadow-xl rounded-xl"
              >
                {user && user.email === "abhipsha.patro63@gmail.com" && (
                  <Link to="/createItem">
                    <p className="px-4 py-2 flex items-center justify-between cursor-pointer text-base hover:bg-slate-200 rounded-t-xl transition-all duration-100 ease-in-out text-textColor">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                {/* menu items */}
                <ul className="flex flex-col">
                  <li
                    onClick={() => setIsMenu(false)}
                    className="flex items-center justify-between text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2"
                  >
                    Home <AiOutlineHome />
                  </li>
                  <li
                    onClick={() => setIsMenu(false)}
                    className="flex items-center justify-between text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2"
                  >
                    Menu <MdOutlineRestaurantMenu />
                  </li>
                  <li
                    onClick={() => setIsMenu(false)}
                    className="flex items-center justify-between text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2"
                  >
                    About Us <HiOutlineUserGroup />
                  </li>
                  <li
                    onClick={() => setIsMenu(false)}
                    className="flex items-center justify-between text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2"
                  >
                    Service <MdOutlineRoomService />
                  </li>
                </ul>

                <p
                  onClick={logout}
                  className="m-2 p-2 flex items-center justify-between cursor-pointer text-base bg-gray-200 hover:bg-gray-300 rounded-md transition-all duration-100 ease-in-out text-textColor"
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
