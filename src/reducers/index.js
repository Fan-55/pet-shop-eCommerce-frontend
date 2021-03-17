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

const reducers = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  cartItems: cartItemsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  form: formReducer,
})

export default reducers