import { combineReducers } from 'redux'
import {
  productsReducer,
  productDetailsReducer
} from './productReducers'

import {
  cartItemsReducer
} from './cartReducers'


const reducers = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  cartItems: cartItemsReducer
})

export default reducers