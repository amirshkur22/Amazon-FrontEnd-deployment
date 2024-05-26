import { useReducer } from "react";
import { Type } from "./Action.type";

export const initialState = {
  cart: [],
  user: null,
};

export const reducerMethod = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_CART:
      // Check if the item already exists in the cart
      // console.log(action.item.id)
      const isItemExists = state.cart.find(
        (existingItem) => existingItem.id === action.item.id
      );
      // console.log("Existing item:", isItemExists);

      // If the item does not exist, add it to the cart with an initial quantity of 1
      if (!isItemExists) {
        return {
          ...state,
          cart: [...state.cart, { ...action.item, quantity: 1 }],
        };
      } else {
        // If the item exists, update its quantity
        const updatedCart = state.cart.map((item) => ({
          ...item,
          quantity:
            item.id === action.item.id ? item.quantity + 1 : item.quantity,
        }));

        // Return the new state with the updated cart
        return {
          ...state,
          cart: updatedCart,
        };
      }
    case Type.REMOVE_FROM_CART:
      // console.log(action.id)
      const newCart = [...state.cart];
      const indexOfRemovedItem = newCart.findIndex(
        (item) => item.id === action.id
      );
      if (indexOfRemovedItem !== -1) {
        if (newCart[indexOfRemovedItem].quantity > 1) {
          newCart[indexOfRemovedItem] = {
            ...newCart[indexOfRemovedItem],
            quantity: newCart[indexOfRemovedItem].quantity - 1,
          };
        } else {
          newCart.splice(indexOfRemovedItem, 1);
        }
      }
      return { ...state, cart: newCart };
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case Type.EMPTY_cart:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
