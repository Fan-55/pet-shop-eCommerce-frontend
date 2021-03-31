import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import {
  productsReducer,
  productDetailsReducer
} from './productReducers'

import {
  cartReducer
} from './cartReducers'

import {
  userLoginReducer,
  userRegisterReducer
} from './userReducers'

import {
  createOrderReducer,
  orderDetailsReducer,
  ordersReducer,
  deleteOrderReducer,
} from './orderReducers'

const reducers = combineReducers({
  form: formReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  createOrder: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orders: ordersReducer,
  deleteOrder: deleteOrderReducer,
})

export default reducers