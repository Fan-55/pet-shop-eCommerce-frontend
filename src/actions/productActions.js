import axios from 'axios'
import { PRODUCT_FETCH_FAIL, PRODUCT_FETCH_REQUEST, PRODUCT_FETCH_SUCCESS } from '../constants/productConstants'

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_FETCH_REQUEST })
    try {
      const { data } = await axios.get('/api/products')
      dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: data })
    } catch (err) {
      const message = err.response && err.response.data.message ? err.response.data.message : err.message
      dispatch({ type: PRODUCT_FETCH_FAIL, payload: message })
    }
  }
}