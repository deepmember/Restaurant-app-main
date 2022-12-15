export const actionType = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEM: "SET_FOOD_ITEM",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CART_ITEM: "SET_CART_ITEM",
};

const reducer = (state, action) => {
  // console.log(action)

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_FOOD_ITEM:
      return {
        ...state,
        foodItem: action.foodItem,
      };
    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };
    case actionType.SET_CART_ITEM:
      return {
        ...state,
        cartItems: action.cartItems,
      };
    default:
      return state;
  }
};

export default reducer;
