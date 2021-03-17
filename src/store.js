import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers/index'

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  userLogin: {
    currentUser: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null,
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)))

export default store