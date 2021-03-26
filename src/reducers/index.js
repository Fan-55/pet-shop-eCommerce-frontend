import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import {
  productsReducer,
  productDetailsReducer
} from './productReducers'

import {
  cartItemsReducer
} from './cartReducers'

import {
  userLoginReducer,
  userRegisterReducer
} from './userReducers'

import {
  createOrderReducer,
  orderDetailsReducer,
} from './orderReducers'

const reducers = combineReducers({
  form: formReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  cartItems: cartItemsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  createOrder: createOrderReducer,
  orderDetails: orderDetailsReducer,
})

export default reducers