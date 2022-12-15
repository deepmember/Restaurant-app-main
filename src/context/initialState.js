import { fetchCartItems, fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCartItems();

export const initialState = {
  user: userInfo,
  foodItem: null,
  cartShow: false,
  cartItems: cartInfo,
};
