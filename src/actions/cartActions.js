import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (item) => {
  return (dispatch, getState) => {
    dispatch({ type: CART_ADD_ITEM, payload: item })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
}

export const removeFromCart = (itemId) => {
  return (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: itemId })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  }
}