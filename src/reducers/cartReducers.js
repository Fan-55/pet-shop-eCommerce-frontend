import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_ADD_ITEM_RESET
} from '../constants/cartConstants'

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      let cartItems = state.cartItems
      const addedItem = action.payload
      const isExistInCart = state.cartItems.find(i => i.id === addedItem.id)
      if (isExistInCart) {
        cartItems = cartItems.map(i => i.id === addedItem.id ? addedItem : i)
        return { ...state, cartItems, addedItem }
      } else {
        cartItems = [...cartItems, addedItem]
        return { ...state, cartItems, addedItem }
      }
    case CART_REMOVE_ITEM:
      return state.filter(item => item.id !== action.payload)
    case CART_ADD_ITEM_RESET:
      return { ...state, addedItem: null }
    default:
      return state
  }
}