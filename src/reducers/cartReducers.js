import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartItemsReducer = (state = [], action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const existedItem = state.find(item => item.id === action.payload.id)
      if (existedItem) {
        return state.map(item => item.id === action.payload.id ? action.payload : item)
      } else {
        return [...state, action.payload]
      }
    case CART_REMOVE_ITEM:
      return state.filter(item => item.id !== action.payload)
    default:
      return state
  }
}