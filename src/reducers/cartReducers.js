import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ACTION_RESET
} from '../constants/cartConstants'

export const cartReducer = (state = {}, action) => {
  let cartItems = state.cartItems
  switch (action.type) {
    case CART_ADD_ITEM:
      const addedItem = action.payload
      const isExistInCart = state.cartItems.find(i => i.id === addedItem.id)
      if (isExistInCart) {
        cartItems = cartItems.map(i => i.id === addedItem.id ? addedItem : i)
        return { ...state, cartItems, actionSuccess: true }
      } else {
        cartItems = [...cartItems, addedItem]
        return { ...state, cartItems, actionSuccess: true }
      }
    case CART_REMOVE_ITEM:
      const deletedItemId = action.payload
      cartItems = cartItems.filter(i => i.id !== deletedItemId)
      return { ...state, cartItems, actionSuccess: true }
    case CART_ACTION_RESET:
      return { ...state, actionSuccess: false }
    default:
      return state
  }
}